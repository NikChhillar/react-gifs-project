import { useState } from "react";
import styled from "styled-components";
import Button from "./components/Button";
import Favourites from "./components/Favourites";
import Header from "./components/Header";
import Random from "./components/Random";
import Search from "./components/Search";
import Trending from "./components/Trending";
import { useGlobal } from "./context/global";
import { useTheme } from "./context/themeContext";

function App() {
  const theme = useTheme();

  const { getRandomGif } = useGlobal();

  // console.log(theme);

  const [rendered, setRendered] = useState("trending");

  const content = () => {
    switch (rendered) {
      case "trending":
        return <Trending />;
      case "favourites":
        return <Favourites rendered={rendered} />;
      case "random":
        return <Random />;
      case "search":
        return <Search />;

      default:
        return <Trending />;
    }
  };

  return (
    <AppStyled theme={theme}>
      <Header setRendered={setRendered} />
      <div className="btns">
        <Button
          name={"Favourites"}
          icon={<i className="fa-solid fa-heart"></i>}
          onClick={() => {
            setRendered("favourites");
          }}
        />
        <Button
          name={"Trending"}
          icon={<i className="fa-solid fa-arrow-trend-up"></i>}
          onClick={() => {
            setRendered("trending");
          }}
        />
        <Button
          name={"Random"}
          icon={<i className="fa-solid fa-shuffle"></i>}
          onClick={() => {
            setRendered("random");
            getRandomGif();
          }}
        />
      </div>
      <main>{content()}</main>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colorBg1};

  .btns {
    display: flex;
    justify-content: center;
    gap: 4rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
    @media screen and (max-width: 750px) {
      gap: 2rem;
    }
    @media screen and (max-width: 650px) {
      flex-direction: column;
      gap: 2rem;
      align-items: center;
    }
  }

  main {
    padding: 2rem 8rem;
    @media screen and (max-width: 1300px) {
      padding: 2rem 4rem;
    }
  }
`;

export default App;
