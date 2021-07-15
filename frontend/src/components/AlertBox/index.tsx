import React from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../store";
import Error from "./Error";
import Success from "./Success";
import Loading from "./Loading";

export default function AlertBox(): React.ReactElement {
  const error = useSelector<
    AppState,
    { timestamp: number; message: string } | null
  >((state) => state.status.error);

  const success = useSelector<
    AppState,
    { timestamp: number; message: string } | null
  >((state) => state.status.success);

  const loading = useSelector<AppState, boolean>(
    (state) => state.status.loading
  );

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-10">
      <div
        className={`transition duration-200 ease-in-out ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {!!error && <Error message={error.message} />}
      </div>
      <div
        className={`transition duration-200 ease-in-out ${
          success ? "opacity-100" : "opacity-0"
        }`}
      >
        {!!success && <Success message={success.message} />}
      </div>
      <div
        className={`transition duration-200 ease-in-out ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        {loading && <Loading />}
      </div>
    </div>
  );
}
