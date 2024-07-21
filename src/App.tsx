import React, { useState, useRef } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json } from "stream/consumers";

const Container = styled.div`
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

const TimestampDisplay = styled.div`
  font-size: 18px;
  text-align: center;
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

const SettingInputField = styled.input`
  width: 20%;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 25px; /* Rounded corners */
  background-color: #f0f0f0;
  box-shadow: inset 5px 5px 10px #cbced1, inset -5px -5px 10px #fff;
  color: #333;
  margin-bottom: 20px;

  //矢印を非表示
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CenterDisplay = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const App: React.FC = () => {
  const [percentage, setPercentage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [startTimestamp, setStartTimestamp] = useState<string | null>(null);
  const [stopTimestamp, setStopTimestamp] = useState<string | null>(null);
  const [isStopped, setIsStopped] = useState(false);

  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const [inputDuration, setInputDuration] = useState("1");
  const [duration, setDuration] = useState(60);

  const handleDurationChange = () => {
    const newDuration = parseInt(inputDuration);
    if (!isNaN(newDuration) && newDuration > 0) {
      setDuration(newDuration * 60);
      resetTimer(); // 新しいdurationを設定後にタイマーをリセット
    }
    else{
      setInputDuration("1");
    }
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsStopped(false);
      if (startTimestamp == null) {
        setStartTimestamp(new Date().toLocaleTimeString());
      }
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      progressRef.current = setInterval(() => {
        setPercentage((prev) => {
          if (prev < 100) {
            return prev + 1;
          } else {
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

  const [headerToken, setHeaderToken] = useState(
    "SAtdki3FM5f87zIUVNnd40S2wxrFYrgqaJ0uwu73"
  );
  const [headerContentType, setHeaderContentType] =
    useState("application/json");

  const [apiUrl, setApiUrl] = useState(
    "https://project-timer-backend.onrender.com/api/data"
  );
  const [appId, setAppId] = useState("3");

  const [createUserName, setCreateUserName] = useState("");
  const [createUserCode, setCreateUserCode] = useState("");

  const [workDescription, setWorkDescription] = useState("");

  const [notes, setNotes] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectNum, setProjectNum] = useState("");

  const extractErrorMessages = (errors: {
    [x: string]: { messages: any[] };
  }) => {
    const extractedMessages: { field: string; message: any }[] = [];

    for (const key in errors) {
      if (errors[key].messages && errors[key].messages.length > 0) {
        errors[key].messages.forEach((message) => {
          extractedMessages.push({ field: key, message: message });
        });
      }
    }

    return extractedMessages;
  };

  const handleAPIPost = async () => {
    try {
      const headers: Record<string, string> = {};
      if (headerToken) headers["X-Cybozu-API-Token"] = headerToken;
      if (headerContentType) headers["Content-Type"] = headerContentType;

      const body = {
        app: appId,
        record: {
          Table: {
            type: "SUBTABLE",
            value: [
              {
                value: {
                  備考: {
                    type: "SINGLE_LINE_TEXT",
                    value: notes,
                  },
                  開始時刻: {
                    type: "TIME",
                    value: startTimestamp,
                  },
                  作業時間: {
                    type: "CALC",
                    value: `${Math.floor(elapsedTime / 3600)
                      .toString()
                      .padStart(2, "0")}:${Math.floor((elapsedTime % 3600) / 60)
                      .toString()
                      .padStart(2, "0")}`,
                  },
                  作業内容: {
                    type: "SINGLE_LINE_TEXT",
                    value: workDescription,
                  },
                  終了時刻: {
                    type: "TIME",
                    value: stopTimestamp,
                  },
                },
              },
            ],
          },
          更新者: {
            type: "MODIFIER",
            value: {
              code: createUserCode,
              name: createUserName,
            },
          },
          作成者: {
            type: "CREATOR",
            value: {
              code: createUserCode,
              name: createUserName,
            },
          },
          プロジェクト名: {
            type: "SINGLE_LINE_TEXT",
            value: projectName,
          },
          プロジェクトNo: {
            type: "NUMBER",
            value: projectNum,
          },
          日付: {
            type: "DATE",
            value: new Date().toISOString().split("T")[0],
          },
        },
      };
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        mode: "cors",
      });

      const result = await response.json();

      if (response.ok) {
        // 成功の場合
        let sucessResult = JSON.parse(result);
        toast.success(
          `API Request Successful: ID:${sucessResult.id} のレコードが追加されました`
        );
      } else {
        // エラーの場合
        let details = JSON.parse(result.details);
        let messages = extractErrorMessages(details.errors);
        messages.forEach((msg) => {
          toast.error(`Field: ${msg.field}, Message: ${msg.message}`);
        });
      }
    } catch (error) {
      console.log("error", error);
      toast.error(`API Error: ${(error as Error).message || String(error)}`);
    }
  };

  const handleViewKintone = () => {
    window.open("https://kintone.cybozu.co.jp/", "_blank");
  };

  return (
    <Container>
      <LeftSide>
        <Label>API Url</Label>
        <InputField
          placeholder="url  *必須"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />
        <Label>APP Id</Label>
        <InputField
          placeholder="app  *必須"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
        />
        <Label>Create User</Label>
        <InputField
          placeholder="作成者.name"
          value={createUserName}
          onChange={(e) => setCreateUserName(e.target.value)}
        />
        <InputField
          placeholder="作成者.code  *必須"
          value={createUserCode}
          onChange={(e) => setCreateUserCode(e.target.value)}
        />
      </LeftSide>
      <Center>
        <div>enjoy your task</div>
        <CircleContainer>
          <CircularProgressbar
            value={percentage}
            text={formatTime(elapsedTime)}
            styles={buildStyles({
              pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
              textColor: "#000",
              trailColor: "#d6d6d6",
            })}
          />
        </CircleContainer>
        <ButtonArea>
          <Button onClick={startTimer} disabled={isRunning}>
            Start
          </Button>
          <Button
            onClick={isStopped ? resetTimer : stopTimer}
            disabled={!isRunning && !isStopped}
          >
            {isStopped ? "Reset" : "Stop"}
          </Button>
        </ButtonArea>
        <CenterDisplay>
          <TimestampDisplay>
            Start Time: {startTimestamp || "Not started yet"}
          </TimestampDisplay>
          <TimestampDisplay>
            Stop Time: {stopTimestamp || "Not stopped yet"}
          </TimestampDisplay>
          <div>
            <SettingInputField
              type="number"
              value={inputDuration}
              onChange={(e) => setInputDuration(e.target.value)}
              placeholder="分 単位"
            />
            <Button
              onClick={handleDurationChange}
              disabled={isRunning || isStopped}
            >
              設定
            </Button>
          </div>
        </CenterDisplay>
      </Center>
      <RightSide>
        <Label>API Headers</Label>
        <InputField
          placeholder="X-Cybozu-API-Token  *必須"
          value={headerToken}
          onChange={(e) => setHeaderToken(e.target.value)}
        />
        <Label>API Body</Label>
        <InputField
          placeholder="プロジェクトNo"
          value={projectNum}
          onChange={(e) => setProjectNum(e.target.value)}
        />
        <InputField
          placeholder="プロジェクト名"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <InputField
          placeholder="作業内容"
          value={workDescription}
          onChange={(e) => setWorkDescription(e.target.value)}
        />
        <InputField
          placeholder="備考"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div>
          <Button
            onClick={handleAPIPost}
            disabled={isRunning || !startTimestamp || !stopTimestamp}
          >
            POST API
          </Button>
          <Button onClick={handleViewKintone}>View kintone</Button>
        </div>
      </RightSide>
      <ToastContainer />
    </Container>
  );
};

export default App;
