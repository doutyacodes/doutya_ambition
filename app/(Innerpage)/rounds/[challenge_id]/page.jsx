"use client";
import { baseImgURL, baseURL } from "@/lib/baseData";
import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const RoundScreen = ({ params }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [taskArray, setTaskArray] = useState([]);
  const [challenge, setChallenge] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);

  const challenge_id = params.challenge_id;
  useEffect(() => {
    if (!user && !user?.id) {
      return redirect("/signup");
    }
  }, [user]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (taskArray && taskArray[0] && taskArray[0].rounds) {
      const today = new Date();
      const startDate = new Date(today.setDate(today.getDate() + 7));
      const rounds = taskArray[0].rounds - 1;
      const calculatedDates = [];

      for (let i = 0; i < rounds; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i * 7);
        calculatedDates.push(newDate.toLocaleDateString("en-GB")); // Format: DD-MM-YYYY
      }

      setDates(calculatedDates);
    }
  }, [taskArray]);
  useEffect(() => {
    const fetchChallengeList = async () => {
      try {
        if (!user || !user.id) {
          // If user or user.id doesn't exist, skip the fetch
          return;
        }
        setIsLoading(true);

        const response = await axios.get(
          `${baseURL}/getAllTasks.php?challenge_id=${challenge_id}&user_id=${user.id}`
        );

        if (response.status === 200) {
          //   console.log(response.data);
          setTaskArray(response.data.tasks);
        } else {
          console.error("Failed to fetch challenges");
        }
      } catch (error) {
        console.error("Error while fetching challenges:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallengeList();
    const fetchChallenge = async () => {
      let urlData = "getChallengeOne";

      try {
        setIsLoading(true);

        const response = await axios.get(
          `${baseURL}/${urlData}.php?challenge_id=${challenge_id}&user_id=${
            user ? user.id : null
          }`
        );

        if (response.status === 200) {
          setChallenge(response.data);
          // console.log(response.data);
          console.log(response.data);
        } else {
          console.error("Failed to fetch challenges");
        }
      } catch (error) {
        console.error("Error while fetching challenges:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenge();
  }, []);
  const fetchData = async () => {
    try {
      setIsLoading(true); // Set isLoading to true before fetching data
      // console.log(challenge)
      const response = await axios.get(
        `${baseURL}/getDetailsInnerpage.php?challenge_id=${challenge_id}`
      );

      // console.log(response.data);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error.message);
    } finally {
      setIsLoading(false); // Set isLoading to false if an error occurs
    }
  };
  const titles = ["Analysis", "Coding", "Interview"];

  return (
    <div className=" px-4 mb-3">
      <div className="mt-3 flex flex-col gap-3">
      <div className="w-full bg-white shadow-lg border border-muted p-3 rounded-md flex justify-between items-center">
            <div className="w-fit">
              <div className=" w-20 h-20  rounded-full relative">
                <Image
                  src={baseImgURL + challenge.image}
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold">{challenge.title}</p>
            </div>
            <div></div>
          </div>
        {taskArray &&
          taskArray.length > 0 &&
          taskArray.map((item, index) => {
            const sliceddescription = item?.description
              ? item.description.length > 100
                ? item.description.slice(0, 100) + "..."
                : item.description
              : "";
            return (
              <Link
                href={
                  item.completed == "yes" ? "#" : `/quiz-lobby/${item.task_id}`
                }
                className={cn(
                  "w-full shadow-lg border border-white/40 bg-white rounded-md p-3",
                  item.completed == "yes" && "opacity-70"
                )}
              >
                <div className="w-full flex items-center gap-3">
                  <div className="w-24 h-24 relative  border rounded-md">
                    <Image
                      fill
                      src={baseImgURL + item.image}
                      className="rounded-md object-cover "
                    />
                  </div>
                  <div className="w-full gap-2 flex flex-col">
                    <div className="flex w-full justify-between">
                      <p className="text-base font-bold">{item.task_name}</p>
                      {item?.success && (
                        <div
                          className={cn(
                            " rounded-full ",
                            item.success == "yes"
                              ? "bg-[#0b6ebf]"
                              : "bg-red-600"
                          )}
                        >
                          <p className="text-white text-sm font-bold px-7 py-1 text-center flex">
                            {item.success == "yes" ? "Success" : "Failed"}
                          </p>
                        </div>
                      )}
                    </div>
                    <hr className="w-full" />
                    <p className="text-sm italic text-gray-400">
                      {sliceddescription}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        {taskArray &&
          taskArray[0] &&
          taskArray[0].rounds &&
          [...Array(taskArray[0].rounds - 1)].map((_, index) => (
            <div
              key={index}
              className="w-full shadow-lg border border-white/40 bg-white rounded-md p-3"
            >
              <div className="w-full flex items-center gap-3">
                <div className="w-24 h-24 relative border rounded-md">
                  <Image
                    fill
                    src={baseImgURL + "coming.jpg"}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="w-full gap-2 flex flex-col">
                  <p className="text-base font-bold">
                    {titles[index % titles.length]}
                  </p>
                  <hr className="w-full" />
                  <p className="text-sm italic text-gray-400">{dates[index]}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoundScreen;
