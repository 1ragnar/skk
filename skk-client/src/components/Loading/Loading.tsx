import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingText, Root } from "./styles";

export type ILoadingProps = {
  text: string;
};

const Loading: React.FC<ILoadingProps> = ({ text }) => {
  return (
    <Root>
      <CircularProgress />
      <LoadingText>{text}</LoadingText>
    </Root>
  );
};

export { Loading };
