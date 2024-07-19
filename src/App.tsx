import React, { useState, useRef } from "react"; //useEffect
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  background-color: #f0f4f8; /* 背景色を変更 
  padding: 20px; */
  display: flex;
  height: 100vh;
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f4f8;
  padding: 20px;
`;

const Center = styled.div`
  background-color: #f0f4f8;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f4f8;
  padding: 20px;
`;

const TextInput = styled.textarea`
  width: 80%;
  height: 30px; /* 1行分のサイズ */
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #333;
  background-color: #f0f0f0;
  color: #333;
  margin-bottom: 20px;
  resize: none;
  box-shadow: none; /* ボックスシャドウを削除 */
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

const TimeDisplay = styled.div`
  font-size: 24px;
  margin-top: 20px;
`;

const TimestampDisplay = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 18px;
  color: #333;
`;

const TaskListItem = styled.li`
  margin: 10px 0;
  box-shadow: 5px 5px 10px #cbced1, -5px -5px 10px #fff;
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
`;

const Label = styled.label`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 5px;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 25px; /* Rounded corners */
  background-color: #f0f0f0;
  box-shadow: inset 5px 5px 10px #cbced1, inset -5px -5px 10px #fff;
  color: #333;
  margin-bottom: 20px;
`;

const DatePickerContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 9px 9px 16px #bebebe, -9px -9px 16px #ffffff;
  background: #f0f0f3;
`;

const StyledDatePicker = styled(DatePicker)`
  border: none;
  border-radius: 10px;
  padding: 10px;
  box-shadow: inset 6px 6px 10px #bebebe, inset -6px -6px 10px #ffffff;
  background: #f0f0f3;
  .react-datepicker__day--selected {
    background-color: #6a82fb !important;
    color: white !important;
  }
`;

//FC:Functional Component
const App: React.FC = () => {
  //percentage: 現在の進捗
  //setPercentage: 進捗更新
  //useState: Reactのフック、状態管理で使用
  const [percentage, setPercentage] = useState(0);
  // console.log("percentage", percentage);

  /*
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
  */

  //isRunning: ストップウォッチが動いているかどうか
  const [isRunning, setIsRunning] = useState(false);
  //elapsedTime: 経過時間(秒)
  const [elapsedTime, setElapsedTime] = useState(0);
  //timerRef: timerIDを保持
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [startTimestamp, setStartTimestamp] = useState<string | null>(null);
  const [stopTimestamp, setStopTimestamp] = useState<string | null>(null);
  const [isStopped, setIsStopped] = useState(false);

  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const [inputDuration, setInputDuration] = useState("");
  const [duration, setDuration] = useState(10); // 初期設定を10秒に設定

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDurationChange = () => {
    const newDuration = parseInt(inputDuration);
    if (!isNaN(newDuration) && newDuration > 0) {
      setDuration(newDuration);
      resetTimer(); // 新しいdurationを設定後にタイマーをリセット
    }
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsStopped(false);
      setStartTimestamp(new Date().toLocaleTimeString());
      timerRef.current = setInterval(() => {
        console.log("timerRef");
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      progressRef.current = setInterval(() => {
        setPercentage((prev) => {
          console.log(1);
          if (prev < 100) {
            console.log(2);

            return prev + 1;
          } else {
            console.log(3);

            clearInterval(progressRef.current as NodeJS.Timeout);
            return prev;
          }
        });
      }, duration * 10);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsStopped(true);
      setStopTimestamp(new Date().toLocaleTimeString());
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
        progressRef.current = null;
      }
    }
  };

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setPercentage(0);
    setStartTimestamp(null);
    setStopTimestamp(null);
    setIsStopped(false);
  };

  const Checkbox = styled.input.attrs({ type: "checkbox" })`
    margin-right: 10px;
  `;
  const [headerToken, setHeaderToken] = useState("");
  const [headerContentType, setHeaderContentType] = useState("");

  const handleAPIPost = async () => {
    try {
      const headers: Record<string, string> = {};
      if (headerToken) headers["X-Cybozu-API-Token"] = headerToken;
      if (headerContentType) headers["Content-Type"] = headerContentType;

      const response = await fetch("https://example.com/api", {
        method: "POST",
        headers,
        body: JSON.stringify({
          elapsedTime,
          startTimestamp,
          stopTimestamp,
        }),
      });
      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleViewKintone = () => {
    window.open("https://kintone.cybozu.co.jp/", "_blank");
  };

  //JSX記法
  return (
    <Container>
      <LeftSide>
        
        <h2>Text Input Area</h2>
        <TextInput placeholder="Type something here..." />
        <TaskList>
          <TaskListItem>
            {" "}
            <Checkbox />
            仕様書を書く
          </TaskListItem>
          <TaskListItem>
            {" "}
            <Checkbox />
            ミーティング
          </TaskListItem>
          <TaskListItem>
            {" "}
            <Checkbox />
            不具合No.10修正
          </TaskListItem>
          <TaskListItem>
            {" "}
            <Checkbox />
            テスト環境構築
          </TaskListItem>
        </TaskList>
        <DatePickerContainer>
        <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => {
              if (date) setStartDate(date);
            }}
            inline
          />
        </DatePickerContainer>
      </LeftSide>
      <Center>
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
            text={`${(duration - (duration * percentage) / 100).toFixed(0)}s`}
            styles={buildStyles({
              pathTransitionDuration: 0.15,
              textColor: "#000",
              pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
              trailColor: "#d6d6d6",
            })}
          />
        </CircleContainer>
        <ButtonArea>
          <Button onClick={startTimer}>Start</Button>
          <Button onClick={isStopped ? resetTimer : stopTimer}>
            {isStopped ? "Reset" : "Stop"}
          </Button>
        </ButtonArea>
        <TimeDisplay>{formatTime(elapsedTime)}</TimeDisplay>
        <TimestampDisplay>
          Start Time: {startTimestamp || "Not started yet"}
        </TimestampDisplay>
        <TimestampDisplay>
          Stop Time: {stopTimestamp || "Not stopped yet"}
        </TimestampDisplay>
        <div>
          <input
            type="number"
            value={inputDuration}
            onChange={(e) => setInputDuration(e.target.value)}
            placeholder="Set duration (seconds)"
          />
          <Button onClick={handleDurationChange}>Set Duration</Button>
        </div>
      </Center>
      <RightSide>
        {/* <h2>Project Details</h2> */}
        <Label>API Headers</Label>
        <InputField
          placeholder="X-Cybozu-API-Token"
          value={headerToken}
          onChange={(e) => setHeaderToken(e.target.value)}
        />
        <InputField
          placeholder="Content-Type"
          value={headerContentType}
          onChange={(e) => setHeaderContentType(e.target.value)}
        />
        <Label>プロジェクトNo.</Label>
        <InputField placeholder="Enter project number..." />
        <Label>プロジェクト名</Label>
        <InputField placeholder="Enter project name..." />
        <Label>作業内容</Label>
        <InputField placeholder="Enter task description..." />
        <Label>備考</Label>
        <InputField placeholder="Enter additional notes..." />
        <div>
          <Button onClick={handleAPIPost}>POST API</Button>
          <Button onClick={handleViewKintone}>View kintone</Button>
        </div>
      </RightSide>
    </Container>
  );
};

export default App;
