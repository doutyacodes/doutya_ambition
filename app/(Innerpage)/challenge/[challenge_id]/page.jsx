"use client";
import { baseImgURL, baseURL } from "@/lib/baseData";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tally3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import UserEligibility from "../../(components)/UserEligibility";

const PageDetails = ({ params }) => {
  const user = useAppSelector((state) => state.auth.user);
  // const user = { id: 24 };
  const [toggleNav, setToggleNav] = useState("Description");
  const [challenge, setChallenge] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const challenge_id = params.challenge_id;
  useEffect(() => {
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
          // console.log(response.data);
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
    fetchData();
    // console.log(challenge.task_id)
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
  const DescriptionRoute = () => {
    return (
      <div className="mt-2 bg-white rounded-md w-full flex-1  h-full overflow-scroll min-h-[70vh]">
        <div className="w-full h-full  space-y-5 mt-3">
          <div className="mt-4 justify-center flex flex-col gap-3 items-center w-full p-3">
            <div className=" w-24 h-24  rounded-md relative">
              <Image
                src={baseImgURL + challenge.image}
                fill
                objectFit="cover"
              />
            </div>
            <h3 className="font-bold text-center text-lg">{challenge.title}</h3>
            <p className="text-base text-slate-500 italic">
              {challenge.description}
            </p>
            <div className="flex-1 w-full justify-end h-full">
              <Button className="bg-[#0d988c] px-3 w-full">
                <Link
                  href={user ? `/rounds/${challenge.challenge_id}` : "/signup"}
                  className="w-full"
                >
                  Apply this job
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const RulesRoute = () => {
    return (
      <div className="mt-2 bg-white rounded-md w-full flex-1  h-full overflow-scroll min-h-[70vh] p-4">
        {challenge?.salary_desc ? (
          <div className="mt-4">
            <p className="text-base text-slate-500 italic">
              {challenge.salary_desc}
            </p>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-3">
            No rules found
          </div>
        )}
      </div>
    );
  };
  const SalaryRoute = () => {
    return (
      <div className="mt-2 bg-white rounded-md w-full flex-1  h-full overflow-scroll min-h-[70vh] p-4">
        <div className="flex gap-4 items-center">
          <h6 className="text-lg"> Salary :</h6>
          <h3 className="text-2xl md:text-4xl font-bold">
            ₹{" "}
            {challenge?.salary ? challenge.salary.toLocaleString("en-IN") : ""}
          </h3>
        </div>
        {challenge?.salary_desc && (
          <div className="mt-4">
            <p className="text-base text-slate-500 italic">
              {challenge.salary_desc}
            </p>
          </div>
        )}
      </div>
    );
  };
  const EligibilityRoute = () => {
    return (
      <div className="mt-2 bg-white rounded-md w-full flex-1  h-full overflow-scroll min-h-[70vh] p-4">
        <div className=" w-full">
          {challenge?.eligibility?.length > 0 &&
            challenge?.eligibility.map((item, index) => {
              return <UserEligibility key={index} item={item} />;
            })}
        </div>
      </div>
    );
  };
  const RenderData = () => {
    switch (toggleNav) {
      case "Description":
        return <DescriptionRoute />;
      case "Rules":
        return <RulesRoute />;
      case "Salary":
        return <SalaryRoute />;
      case "Eligibility":
        return <EligibilityRoute />;
      default:
        return <DescriptionRoute />;
    }
  };
  const handleToggle = (value) => {
    setToggleNav(value);
  };
  return (
    <>
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
        <div className="mt-3 px-3 py-2 h-full relative ">
          <div className="w-full bg-white shadow-lg border border-muted p-3 rounded-md flex justify-between items-center">
            <div className="w-fit border rounded-full">
              <div className=" w-20 h-20  rounded-md relative">
                <Image
                  src={baseImgURL + selectedMovie.image}
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold">{selectedMovie.title}</p>
            </div>
            <div></div>
          </div>
          <div className="flex justify-between items-center shadow rounded-md">
            <p
              className={cn(
                "flex-1 text-center py-3 bg-white font-bold duration-200 ease-in-out transition-all ",
                toggleNav == "Description" && "border-b border-black"
              )}
              onClick={() => handleToggle("Description")}
            >
              Description
            </p>
            {user && (
              <>
                <p
                  className={cn(
                    "flex-1 text-center py-3 bg-white font-bold duration-200 ease-in-out transition-all ",
                    toggleNav == "Rules" && "border-b border-black"
                  )}
                  onClick={() => handleToggle("Rules")}
                >
                  Rules
                </p>
                <p
                  className={cn(
                    "flex-1 text-center py-3 bg-white font-bold duration-200 ease-in-out transition-all ",
                    toggleNav == "Salary" && "border-b border-black"
                  )}
                  onClick={() => handleToggle("Salary")}
                >
                  Salary
                </p>
                <p
                  className={cn(
                    "flex-1 text-center py-3 bg-white font-bold duration-200 ease-in-out transition-all ",
                    toggleNav == "Eligibility" && "border-b border-black"
                  )}
                  onClick={() => handleToggle("Eligibility")}
                >
                  Eligibility
                </p>
              </>
            )}
          </div>
          {RenderData()}
        </div>
      )}
    </>
  );
};

export default PageDetails;
