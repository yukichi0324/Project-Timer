import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  background-color: #f0f4f8; /* 背景色を変更 */
  padding: 20px;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 15px 25px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 6px 6px 12px #cfcfcf, -6px -6px 12px #ffffff;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 4px 4px 10px #cfcfcf, -4px -4px 10px #ffffff;
  }

  &:active {
    box-shadow: inset 4px 4px 10px #cfcfcf, inset -4px -4px 10px #ffffff;
  }
`;

const CircleContainer = styled.div`
  width: 150px;
  height: 150px;
  margin-top: 20px;
`;

//FC:Functional Component
const App: React.FC = () => {
  //percentage: 現在の進捗
  //setPercentage: 進捗更新
  //useState: Reactのフック、状態管理で使用
  const [percentage, setPercentage] = useState(0);
  console.log('percentage',percentage);
  console.log('UseState',useState)

  //useEffect: Reactのフック、コンポーネントが表示された時や更新された時に実行したい処理を定義
  //コンポーネントが表示された後にタイマーを設定し、一定間隔でpercentageを更新
  useEffect(() => {
    //setInterval: 一定の時間ごとに特定の処理を繰り返し実行
    const interval = setInterval(() => {
      //prev: 前回のパーセンテージの値
      setPercentage((prev) => (prev < 100 ? prev + 1 : 0));
      //100ミリ秒ごとに上記のsetPercentageの処理を実行
    }, 100); // 10秒で一周するように調整（100msごとに1%増加）
    //}, 600);  //TODO：60秒。任意の数字に変えられるようにしたい

    //ンポーネントが消えるときに、setIntervalで設定したタイマーを解除するための関数を返す
    return () => clearInterval(interval);
  }, []);

  //JSX記法
  return (
    <Container>
      <div>Hello World</div>
      <CircleContainer>
        {/* 
        CircularProgressbar: react-circular-progressbarライブラリからのコンポーネントで、円形プログレスバーを表示。
        value={percentage}: プログレスバーの進捗をpercentageで設定。
        text={${(10 - percentage / 10).toFixed(0)}s}: 残り秒数をテキストとして表示。
        styles: プログレスバーの見た目をカスタマイズ。
        */}
        <CircularProgressbar
          value={percentage}
          text={`${(10 - percentage / 10).toFixed(0)}s`}
          styles={buildStyles({
            pathTransitionDuration: 0.15,
            textColor: "#000",
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            trailColor: "#d6d6d6",
          })}
        />
      </CircleContainer>
      <ButtonArea>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonArea>
    </Container>
  );
};

export default App;
