import React from "react";
import styled from "styled-components";
import { useGlobal } from "../context/global";
import { useTheme } from "../context/themeContext";
import GiphyItem from "./GiphyItem";
import Loader from "./Loader";

const Random = () => {
  const theme = useTheme();

  const { loading, random } = useGlobal();

  return (
    <RandomStyled theme={theme}>
      {loading ? <Loader /> : <GiphyItem {...random} />}
    </RandomStyled>
  );
};

const RandomStyled = styled.article`
  padding: 2rem;
  background-color: ${(props) => props.theme.colorBg2};
  border-radius: 1rem;
  width: 95%;
  margin: 0 auto;
  @media screen and (max-width: 690px) {
    padding: 1rem;
    width: 95%;
  }
`;

export default Random;
