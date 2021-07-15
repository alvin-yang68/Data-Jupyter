import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { FixedSizeList, FixedSizeListProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import BTree from "sorted-btree";

import { range } from "../../utils";

type VirtualTableState = {
  top: number;
  header: React.ReactNode;
  footer: React.ReactNode;
};

/** Context for cross component communication */
const VirtualTableContext = React.createContext<VirtualTableState>({
  top: 0,
  header: <></>,
  footer: <></>,
});

/**
 * The `Inner` component of the virtual list. This is the "Magic".
 * Capture what would have been the top elements position and apply it to the table.
 * In other words, it vertically translates the table instead of scrolling over the table.
 * Other than that, render an optional header and footer.
 * */
const Inner = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ children, ...rest }: React.ComponentProps<"div">, ref) => {
    const { header, footer, top } = useContext(VirtualTableContext);
    return (
      <div {...rest} ref={ref}>
        <table style={{ top, position: "absolute", width: "100%" }}>
          {header}
          <tbody>{children}</tbody>
          {footer}
        </table>
      </div>
    );
  }
);

export type Data<T> = BTree<number, T | undefined>;

interface IProps<T> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loadItems: (startIndex: number, stopIndex: number) => Promise<T[]>;
  row: FixedSizeListProps["children"];
  minimumBatchSize?: number;
  threshold?: number;
}

/**
 * The virtual table. It basically accepts all of the same params as the original `FixedSizeList`.
 */
export default function VirtualTable<T>({
  row,
  header,
  footer,
  loadItems,
  threshold = 15,
  ...rest
}: IProps<T> &
  Omit<
    FixedSizeListProps,
    "children" | "innerElementType" | "onItemsRendered" | "ref"
  >): React.ReactElement {
  const listRef = useRef<FixedSizeList | null>();
  const [top, setTop] = useState(0);

  // Items are stored in a sorted B-tree. The key is item index.
  // The value is either the item data or `undefined`, which means the item
  // has been loaded (i.e. rendered on screen), but its data has not arrived
  // from the API yet.
  const data = useMemo<Data<T>>(() => new BTree<number, T | undefined>(), []);

  const isItemLoaded = (index: number): boolean => data.has(index);

  const loadMoreItems = useCallback(
    async (startIndex: number, stopIndex: number): Promise<void> => {
      // Clear any items where their indexes are below `threshold` from the
      // loaded items (visible on screen) to save space.
      if (startIndex - threshold > 0)
        data.deleteRange(0, startIndex - threshold, false);

      // Clear any items where their indexes are above `threshold` from the
      // loaded items (visible on screen) to save space.
      const maxKey = data.maxKey() || 0;
      if (stopIndex + threshold < maxKey)
        data.deleteRange(stopIndex + threshold, maxKey, true);

      // Temporarily set the values of loaded items to `undefined` (waiting for API to populate).
      range(startIndex, stopIndex + 1).forEach((index) => {
        data.set(index, undefined);
      });

      // Request the contents of items between `startIndex` and `stopIndex` from the API.
      const contents = await loadItems(startIndex, stopIndex);

      // Replace `undefined` values with contents.
      contents.forEach((content, index) => {
        data.set(index + startIndex, content);
      });
    },
    []
  );

  return (
    <VirtualTableContext.Provider value={{ top, header, footer }}>
      <InfiniteLoader
        {...rest}
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            {...rest}
            itemData={data}
            innerElementType={Inner}
            onItemsRendered={(props) => {
              const style =
                listRef.current &&
                // @ts-ignore private method access
                // eslint-disable-next-line no-underscore-dangle
                listRef.current._getItemStyle(props.overscanStartIndex);
              setTop((style && style.top) || 0);

              // Call the callback provided by `InfiniteLoader`
              onItemsRendered(props);
            }}
            ref={(el) => {
              listRef.current = el;

              // Pass in `ref` to the callback provided by `InfiniteLoader`
              if (typeof ref === "function") ref(el);
            }}
          >
            {row}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </VirtualTableContext.Provider>
  );
}
