"use client";
import { baseImgURL, baseURL } from "@/lib/baseData";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChallengeHomeCard from "../(components)/ChallengeHomeCard";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
        {todoData?.length > 0 && (
          <Table>
            <TableCaption>Results.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]"></TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Round 1</TableHead>
                <TableHead className="text-center">Page Title</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todoData &&
                todoData?.length > 0 &&
                todoData.map((item, itemIndex) => {
                  // console.log(item);
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
                  const maxLength = 12;
                  const slicedTitle = item?.title
                    ? item.title.length > maxLength
                      ? item.title.slice(0, maxLength) + "..."
                      : item.title
                    : "";
                  return (
                    <TableRow key={itemIndex}>
                      <TableCell>
                        <div
                          className={
                            " relative md:h-24 md:w-32 w-20 h-16 border rounded-md"
                          }
                        >
                          <Image
                            src={baseImgURL + item.image}
                            fill
                            alt="Profile Image"
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>
                        {item?.success && (
                          <div
                            className={cn(
                              " rounded-full ",
                              item.success == "yes"
                                ? "bg-green-600"
                                : "bg-red-600"
                            )}
                          >
                            <p className="text-white text-sm font-bold px-7 py-1 text-center flex">
                              {item.success == "yes" ? "Success" : "Failed"}
                            </p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {
                          item.selectedMovie.title
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}

        
      </div>
    </div>
  );
};

export default Results;
