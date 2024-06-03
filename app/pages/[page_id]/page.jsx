"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { baseImgURL, baseURL } from "@/lib/baseData";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaEdit } from "react-icons/fa";
import Posts from "@/app/(Innerpage)/(components)/Posts";
import CertificateList from "@/app/(Innerpage)/(components)/CertificateList";
import moment from "moment";
import ChallengeHomeCard from "@/app/(Innerpage)/(components)/ChallengeHomeCard";
import { Tally3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/hooks";

const PageDetails = () => {
  const user = useAppSelector((state) => state.auth.user);

  const page_id = 1;
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [completeOne, setCompleteOne] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [postData, setPostData] = useState([]);
  const [textDataBottom, setTextDataBottom] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [filterChallenges, setFilterChallenges] = useState([]);
  const [bootcamp, setBootcamp] = useState([]);
  const [challengeState, setChallengeState] = useState([]);
  const [streakState, setStreakState] = useState([]);
  const [quizState, setQuizState] = useState([]);
  const [quizStateLive, setQuizStateLive] = useState([]);
  const [treasureState, setTreasureState] = useState([]);
  const [challengesNormal, setChallengesNormal] = useState([]);
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState(null);
  const [contestData, setContestData] = useState([]);
  const [items, setItems] = useState([]);
  
  const [totalPoints, setTotalPoints] = useState(0);
  const [activeRouteIndex, setActiveRouteIndex] = useState("fourth");

  const fetchData = useCallback(async () => {
    try {
      if (!user || !user.id) {
        // If user or user.id doesn't exist, skip the fetch
        return;
      }
      setIsLoading(true);
      const [
        peopleResponse,
        completedResponse,
        postsResponse,
        fullResponse,
        challengeResponse,
        challengesResponse,
        streakResponse,
        quizResponse,
        quizResponseLive,
        treasureResponse,
        bootcampResponse,
        contestResponse,
        totalPointsResponse,
        movieResponse,
      ] = await Promise.all([
        axios.get(
          `${baseURL}/getPeoplePage.php?page_id=${page_id}&userId=${user.id}`
        ),
        axios.get(
          `${baseURL}/getEachCompleted.php?userId=${user.id}&page_id=${page_id}`
        ),
        axios.get(
          `${baseURL}/getPagePosts.php?page_id=${page_id}&userId=${user.id}`
        ),
        axios.get(
          `${baseURL}/getEachPageVisit.php?userId=${user.id}&page_id=${page_id}`
        ),
        axios.get(
          `${baseURL}/getTrendingPageVisit.php?userId=${user.id}&page_id=${page_id}`
        ),
        axios.get(
          `${baseURL}/getEachTrendingState.php?userId=${user.id}&page_id=${page_id}`
        ),
        axios.get(
          `${baseURL}/getEachStreakState.php?userId=${user.id}&page_id=${page_id}`
        ),
        axios.get(
          `${baseURL}/getEachQuiz.php?userId=${user.id}&page_id=${page_id}`
        ),
        axios.get(
          `${baseURL}/getEachLiveQuiz.php?userId=${user.id}&page_id=${page_id}`
        ),
        axios.get(
          `${baseURL}/getEachTreasureState.php?userId=${user.id}&page_id=${page_id}`
        ),
        axios.get(
          `${baseURL}/getEachBootcampVisit.php?userId=${user.id}&page_id=${page_id}`
        ),
        axios.get(
          `${baseURL}/getEachContestState.php?userId=${user.id}&page_id=${page_id}`
        ),
        axios.get(
          `${baseURL}/totalPoints.php?page_id=${page_id}&user_id=${user.id}`
        ),
        axios.get(
          `${baseURL}/getDetailsInnerpage.php?id=${page_id}&userId=${user.id}`
        ),
      ]);
      // console.log(challengesResponse.data)
      // Update state in batch
      setPeopleData(peopleResponse.data);
      setCompleteOne(completedResponse.data);
      setPostData(postsResponse.data);
      setAllStates(fullResponse.data);
      setFilterChallenges(challengeResponse.data.data);
      setChallengesNormal(challengesResponse.data);
      setStreakState(streakResponse.data);
      setQuizState(quizResponse.data);
      setQuizStateLive(quizResponseLive.data);
      setTreasureState(treasureResponse.data);
      setBootcamp(bootcampResponse.data);
      setContestData(contestResponse.data);
      setTotalPoints(totalPointsResponse.data.total_points);
      setSelectedMovie(movieResponse.data);
    } catch (error) {
      console.error("Error while fetching data:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [user, page_id]);

  useEffect(() => {
    fetchData();
  }, []);

  const toggleFollow = async () => {
    if (user) {
      // Toggle the follow status optimistically
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);

      try {
        // Make the API request to follow/unfollow
        const response = await axios.get(
          `${baseURL}/event-Follow.php?page_id=${page_id}&userId=${user.id}`
        );

        // Handle the response data
        console.log("Data:", response.data);
      } catch (error) {
        // Revert the follow status if an error occurs
        setIsFollowing((prevIsFollowing) => !prevIsFollowing);

        // Handle errors
        console.error("Error while following:", error);
        throw error; // Throw the error to handle it outside this function if needed
      }
    }
  };

  const [routes] = useState([
    { key: "third", title: "Challenges" },
    { key: "fourth", title: "Contest" },
    { key: "sixth", title: "Posts" },
  ]);

  
  const ThirdRoute = () => {
    return (
      <div className="w-full bg-[#e5e5e5] h-full  p-1 flex-col flex gap-2">
        {bootcamp?.challenges && bootcamp?.challenges?.length > 0 && (
          <div className="bg-white w-full p-2">
            <p className="font-bold mb-2">Bootcamp</p>
            <div className="flex gap-2 w-full overflow-x-scroll">
              {bootcamp?.challenges &&
                bootcamp?.challenges?.length > 0 &&
                bootcamp?.challenges.map((item, index) => {
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
                      key={index}
                      item={item}
                      formattedDate={formattedDate}
                      formattedEndDate={formattedEndDate}
                      inPage={true}
                    />
                  );
                })}
            </div>
          </div>
        )}
        {streakState?.challenges && streakState?.challenges?.length > 0 && (
          <div className="bg-white w-full p-2">
            <p className="font-bold mb-2">Streaks</p>
            <div className="flex gap-2 w-full  overflow-x-scroll">
              {streakState?.challenges &&
                streakState?.challenges?.length > 0 &&
                streakState?.challenges.map((item, index) => {
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
                      key={index}
                      item={item}
                      formattedDate={formattedDate}
                      formattedEndDate={formattedEndDate}
                      inPage={true}
                    />
                  );
                })}
            </div>
          </div>
        )}
        {treasureState?.challenges && treasureState?.challenges?.length > 0 && (
          <div className="bg-white w-full p-2">
            <p className="font-bold mb-2">Treasure Hunt</p>
            <div className="flex gap-2 w-full  overflow-x-scroll">
              {treasureState?.challenges &&
                treasureState?.challenges?.length > 0 &&
                treasureState?.challenges.map((item, index) => {
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
                      key={index}
                      item={item}
                      formattedDate={formattedDate}
                      formattedEndDate={formattedEndDate}
                      inPage={true}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  };
  const FourthRoute = () => {
    return (
      <div className="w-full bg-[#e5e5e5] h-full  p-1 flex-col flex gap-2">
        {contestData?.challenges && contestData?.challenges?.length > 0 && (
          <div className="bg-white w-full p-2">
            <p className="font-bold mb-2">Contest</p>
            <div className="flex gap-2 w-full  overflow-x-scroll">
              {contestData?.challenges &&
                contestData?.challenges?.length > 0 &&
                contestData?.challenges.map((item, index) => {
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
                      key={index}
                      item={item}
                      formattedDate={formattedDate}
                      formattedEndDate={formattedEndDate}
                      inPage={true}
                    />
                  );
                })}
            </div>
          </div>
        )}
        {quizState?.challenges && quizState?.challenges?.length > 0 && (
          <div className="bg-white w-full p-2">
            <p className="font-bold mb-2">Quiz</p>
            <div className="flex gap-2 w-full  overflow-x-scroll">
              {quizState?.challenges &&
                quizState?.challenges?.length > 0 &&
                quizState?.challenges.map((item, index) => {
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
                      key={index}
                      item={item}
                      formattedDate={formattedDate}
                      formattedEndDate={formattedEndDate}
                      inPage={true}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const SixthRoute = () => {
    return (
      <div className="w-full h-full grid grid-cols-12 gap-3 p-3">
        {postData?.length > 0 &&
          postData?.map((item, index) => {
            return <Posts key={index} item={item} user_id={user?.id} />;
          })}
      </div>
    );
  };
  const renderContent = () => {
    switch (activeRouteIndex) {
      case "third":
        return <ThirdRoute />;
      case "fourth":
        return <FourthRoute />;

      case "sixth":
        return <SixthRoute />;

      default:
        return <ThirdRoute />;
    }
  };
  return (
    <div className="max-w-[600px]  min-h-screen overflow-x-scroll  w-full mx-auto ">
      {isLoading ? (
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
      ) : (
        <>
          <div className=" relative  ">
            <Image
              src={"/assets/images/kerala.jpg"}
              fill
              className=" -z-[10] absolute "
            />
            <div className=" -z-[10] absolute w-full h-full bg-black/60 " />
            <div className="flex justify-between w-full p-3">
              <div className="flex gap-3">
                <div
                  className={cn(
                    " relative  h-24 rounded-full w-24 border-[3.5px] border-[#66bad6]"
                  )}
                >
                  {selectedMovie?.image?.length > 0 && (
                    <Image
                      src={baseImgURL + selectedMovie?.image}
                      fill
                      alt="Profile Image"
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center gap-2 py-3 font-bold text-white">
                  <p>{selectedMovie?.title}</p>
                  <p className="text-sm">
                    {" "}
                    {selectedMovie?.type.charAt(0).toUpperCase() +
                      selectedMovie?.type.slice(1)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col py-3 justify-between">
                <div className="relative h-6 w-6 ">
                  <Image src={"/assets/images/vip.png"} fill />
                </div>

                <div>
                  <Dialog>
                    <DialogTrigger>
                      <Tally3 size={22} color="white" className="rotate-90" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className={"pt-5 flex flex-col gap-4"}>
                        <Link
                          href={`/feedback/${page_id}`}
                          className="bg-green-600 w-full text-white font-bold p-4 rounded-md"
                        >
                          Feedback
                        </Link>
                        <Link
                          href={`/complaint/${page_id}`}
                          className="bg-red-600 w-full text-white font-bold p-4 rounded-md"
                        >
                          Complaint
                        </Link>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="flex justify-around items-center mt-3 px-3">
              <div className=" flex flex-col text-center text-sm font-semibold text-white">
                <p>{selectedMovie?.followers}</p>
                <p>Followers</p>
              </div>
              <div className="">
                <div className=" h-8 w-0 border border-white" />
              </div>
              <div className=" flex flex-col text-center text-sm font-semibold text-white">
                <p>{totalPoints}</p>
                <p>Points</p>
              </div>
            </div>
            {isFollowing && (
              <>
                <div className=" justify-around items-center mt-3 flex gap-2 px-3">
                  <p className=" text-white font-bold text-sm">
                    {selectedMovie?.this_level_xp}{" "}
                    <span className="text-lg">Xp</span>
                  </p>
                  <p className="flex-1 h-[0.3px] bg-slate-400" />
                  <p className=" text-white font-bold text-sm">
                    {selectedMovie?.total_xp}{" "}
                    <span className="text-lg">Xp</span>
                  </p>
                  <p className="flex-1 h-[0.3px] bg-slate-400" />
                  <p className=" text-white font-bold text-sm">
                    {selectedMovie?.next_level_xp}{" "}
                    <span className="text-lg">Xp</span>
                  </p>
                </div>
                <div className=" w-full p-3 mt-2 px-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${selectedMovie?.progress * 100}` }}
                    />
                  </div>
                </div>
                <div className=" justify-around items-center mt-3 flex gap-2 px-3">
                  <p className=" text-white font-bold text-sm">
                    Level {selectedMovie?.level}
                  </p>
                  <p className="flex-1 h-[0.3px] bg-slate-400" />

                  <p className=" text-white font-bold text-sm">
                    Level {selectedMovie?.next_level}
                  </p>
                </div>
              </>
            )}

            <div
              className="flex justify-center items-center py-4"
              onClick={toggleFollow}
            >
              <Button className="bg-[#0195f7] py-0 px-10">
                {isFollowing
                  ? "Following"
                  : totalPoints > 0
                  ? "Follow Again"
                  : "Follow"}
              </Button>
            </div>

            <div className=" w-full  flex overflow-scroll p-3 bg-black/30 items-center mt-3">
              {routes.map((route, index) => {
                return (
                  <div
                    onClick={() => setActiveRouteIndex(route.key)}
                    key={index}
                    className={cn(
                      " cursor-pointer min-w-36 text-white whitespace-nowrap",
                      activeRouteIndex === route.key ? "font-bold" : ""
                    )}
                  >
                    {route.title}
                  </div>
                );
              })}
            </div>
          </div>
          {renderContent()}
        </>
      )}
    </div>
  );
};

export default PageDetails;
