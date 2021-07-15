import React, { ComponentType, useState, useCallback } from "react";
import { ListChildComponentProps, FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import BTree from "sorted-btree";

import { range } from "../../utils";

export type Data<T> = BTree<number, T | undefined>;

interface IProps<T> {
  itemCount: number;
  loadItems: (startIndex: number, stopIndex: number) => Promise<T[]>;
  itemRenderer: ComponentType<ListChildComponentProps<Data<T>>>;
  minimumBatchSize?: number;
  threshold?: number;
  height?: number;
  width?: number;
  itemSize?: number;
}

export default function VirtualScroller<T>({
  itemCount,
  loadItems,
  itemRenderer,
  minimumBatchSize = 100,
  threshold = 100,
  height = 150,
  width = 300,
  itemSize = 30,
}: IProps<T>): React.ReactElement {
  // Items are stored in a sorted B-tree. The key is item index.
  // The value is either the item data or `undefined`, which means the item
  // has been loaded (i.e. rendered on screen), but its data has not arrived
  // from the API yet.
  const [data] = useState<Data<T>>(() => new BTree<number, T | undefined>());

  const isRowLoaded = useCallback(
    (index: number): boolean => data.has(index),
    []
  );

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

      contents.forEach((content, index) => {
        data.set(index + startIndex, content);
      });
    },
    []
  );

  return (
    <InfiniteLoader
      isItemLoaded={isRowLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
      minimumBatchSize={minimumBatchSize}
      threshold={threshold}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemCount={itemCount}
          itemSize={itemSize}
          itemData={data}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {itemRenderer}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}
