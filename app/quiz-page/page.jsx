"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseImgURL, baseURL, baseVidUrl } from "@/lib/baseData";
import { useAppSelector } from "@/lib/hooks";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const QuizPage = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [marks, setMarks] = useState(0);
  const [optionSend, setOptionSend] = useState("");
  const [isSelected, setIsSelected] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [answer_id, setAnswer_id] = useState(0);
  const [question_id, setQuestion_id] = useState(0);
  const [timer, setTimer] = useState(0);
  const [dataQuestion, setDataQuestion] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [sound, setSound] = useState(null);
  const [count_question, setCount_question] = useState(null);
  const [quizDatas, setQuizDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state) => state.auth.user);

  const fetchCompleted = async (task_id) => {
    try {
      const response = await axios.get(
        `${baseURL}/get-quiz-completed.php?user_id=${user?.id}&task_id=${task_id}`
      );
      if (response.data.success) {
        router.replace("/home");
      } else {
        console.error("Failed to fetch quiz");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchQuizCompleted = async () => {
      setIsLoading(true);
      const serializedQuizDatas = localStorage.getItem("quizDatas");
      const quizDatas2 = JSON.parse(serializedQuizDatas);
      if (!quizDatas2 || !user) {
        router.replace("/home");
      } else {
        await fetchCompleted(quizDatas2.dataQuiz[0].task_id);
      }
      setIsLoading(false);
    };

    fetchQuizCompleted();
  }, [user, router]);

  useEffect(() => {
    const initializeQuizData = async () => {
      setIsLoading(true);
      const serializedQuizDatas = localStorage.getItem("quizDatas");
      const quizDatas2 = JSON.parse(serializedQuizDatas);
      if (!quizDatas2 || !user) {
        router.replace("/home");
      } else {
        const questions = Object.values(quizDatas2?.dataQuiz).filter(
          (item) => typeof item === "object"
        );
        setQuizDatas(quizDatas2);
        const newDataQuestion = questions[currentIndex];
        setDataQuestion(newDataQuestion);
        setCount_question(quizDatas2.dataQuiz.count_question);
        if (newDataQuestion.quiz_type !== "psychological") {
          setTimer(newDataQuestion.timer);
        }
      }
      setIsLoading(false);
    };

    initializeQuizData();
  }, [currentIndex, user, router]);

  useEffect(() => {
    if (!dataQuestion) return;

    if (dataQuestion.type === "video" && videoRef.current) {
      videoRef.current.src = `${baseVidUrl}${dataQuestion.video}`;
      videoRef.current.play();
    } else if (dataQuestion.type === "audio") {
      if (sound) sound.pause();

      const audio = new Audio(`${baseVidUrl}${dataQuestion.audio}`);
      setSound(audio);
      audio.play();
    }
  }, [dataQuestion]);

  useEffect(() => {
    if (!timer) return;

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          handleTimeOut();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    if (!dataQuestion) return;

    const correctItem = dataQuestion.options.find(
      (item) => item.answer === "yes"
    );
    if (correctItem) {
      setCorrectAnswer(correctItem.answer_text);
    }

    setShuffledOptions(shuffleArray(dataQuestion.options));
  }, [dataQuestion]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswer = async (data, answer_id, question_id) => {
    if (isSelected) return;
    setOptionSend(data);
    setQuestion_id(question_id);
    setAnswer_id(answer_id);
    setIsSelected(data);
    let earnedMarks = 0;

    if (data === correctAnswer) {
      const maxMarks = 1000;
      const marks = (maxMarks / (dataQuestion.timer * 1000)) * (timer * 1000);
      earnedMarks = Math.max(0, marks.toFixed(2));
      setMarks(earnedMarks);
    }

    await submitMarks(earnedMarks);
  };

  const handleTimeOut = async () => {
    await submitMarks(0);
  };

  const submitMarks = async (earnedMarks) => {
    try {
      const formData = new URLSearchParams();
      formData.append("user_id", quizDatas?.user.id);
      formData.append("challenge_id", dataQuestion.challenge_id);
      formData.append("task_id", dataQuestion.task_id);
      formData.append("marks", earnedMarks);
      formData.append("optionSend", optionSend);
      formData.append("question_id", question_id);
      formData.append("answer_id", answer_id);
      const response = await axios.post(
        `${baseURL}/add-quiz-progress.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // console.log(response.data);
      if (response.status === 200) {
        if (currentIndex < quizDatas?.dataQuiz[0].count_question - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setIsSelected("");
        } else {
          router.replace(`/success/${dataQuestion.task_id}`);
        }
      }
    } catch (error) {
      console.error("Error adding marks:", error);
    }
  };
  return (
    <div
      className="max-w-[800px]  min-h-screen overflow-x-scroll  w-full mx-auto bg-blue-400 p-4"
      style={{ padding: "45px 20px" }}
    >
      {
        isLoading ? (
          <div className=" w-full h-full flex flex-1 justify-center items-center ">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        ):(
          <>
          {quizDatas && (
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <h2>{quizDatas.title}</h2>
          <p>{quizDatas.description}</p>
          <p>
            {currentIndex + 1}/{quizDatas?.dataQuiz[0].count_question}
          </p>
        </div>
      )}
      <div style={{ margin: "0 auto", width: "80%", textAlign: "center" }}>
        <div className="w-full justify-center items-center flex">
          {dataQuestion?.quiz_type !== "psychological" && (
            <div
              style={{ position: "relative", marginBottom: "20px" }}
              className="w-16 h-16"
            >
              <CircularProgressbar
                styles={buildStyles({
                  textSize: "20px",
                  pathColor: "#0b6ebf",
                  textColor: "#ffffff",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
                value={timer}
                maxValue={dataQuestion?.timer}
                circleRatio={1}
                text={`${timer}s`}
              />
            </div>
          )}
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>{dataQuestion?.question}</h3>
          {dataQuestion?.type === "image" && (
            <img
              src={`${baseImgURL}${dataQuestion.image}`}
              alt="Question related"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          {dataQuestion?.type === "video" && (
            <video
              ref={videoRef}
              controls
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {shuffledOptions.map((item, index) => (
          <button
            key={index}
            style={{
              backgroundColor:
                isSelected === item.answer_text ? "orange" : "white",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "10px",
              width: "100%",
              textAlign: "left",
            }}
            className="bg-white border shadow-lg"
            onClick={() =>
              handleAnswer(item.answer_text, item.answer_id, item.question_id)
            }
          >
            {item.answer_text}
          </button>
        ))}
      </div>
          </>
        )
      }
    </div>
  );
};

export default QuizPage;
