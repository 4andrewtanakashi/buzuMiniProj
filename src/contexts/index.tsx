import React from "react";

import { DataItemsContextProvider } from "./DataItems";

interface Props {
    children?: React.ReactNode;
};

export function  GlobalContext ({ children } : Props) : JSX.Element {
  return (
    <>
      <DataItemsContextProvider>{children}</DataItemsContextProvider>;
    </>
  );
};