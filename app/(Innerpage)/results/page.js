"use client";
import { baseImgURL, baseURL } from "@/lib/baseData";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChallengeHomeCard from "../(components)/ChallengeHomeCard";
import moment from "moment";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const Results = () => {
  const [todoData, setTodoData] = useState([]);
  

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user && !user?.id) {
      return redirect("/signup");
    }
  }, [user]);
  useEffect(() => {
    const fetchTodo = async () => {
      if (user) {
        try {
          // Only fetch rewards if user data is available
          const response = await axios.get(
            `${baseURL}/getAlltodoTasks.php?user_id=${user.id}`
          );
          // console.log(response.data);
          if (response.status === 200) {
            setTodoData(response.data.tasks);
            // console.log(response.data);
          } else {
            console.error("Failed to fetch progress");
          }
        } catch (error) {
          console.error("Error while fetching progress:", error.message);
        }
      }
    };

    fetchTodo();
    
  }, []);
 
  
 
  return (
    <div className="w-full p-3">
      
      <div className="flex flex-col gap-2 bg-white px-1">
        {todoData &&
          todoData?.length > 0 &&
          todoData.map((item, itemIndex) => {
            console.log(item)
            let formattedEndDate;
            let formattedDate;
            formattedDate = moment(item.start_date).fromNow();
            const endDate = moment(item.end_date);
            const now = moment();

            const duration = moment.duration(endDate.diff(now));

            if (duration.asDays() >= 1) {
              formattedEndDate = Math.round(duration.asDays()) + " days";
            } else if (duration.asHours() >= 1) {
              formattedEndDate =
                Math.floor(duration.asHours()) +
                ":" +
                (duration.minutes() < 10 ? "0" : "") +
                duration.minutes() +
                " hrs";
            } else {
              formattedEndDate = duration.minutes() + " minutes";
            }

            return (
              <ChallengeHomeCard
                key={itemIndex}
                item={item}
                formattedDate={formattedDate}
                formattedEndDate={formattedEndDate}
                inPage={true}
                inTodo={true}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Results;
