import React from "react";
import { Routes } from "components/Routes/Routes";
import { Root } from "./styles";

export interface IHomeProps {}

const Home: React.FC<IHomeProps> = ({}) => {
  return (
    <Root>
      <Routes />
    </Root>
  );
};

export { Home };
