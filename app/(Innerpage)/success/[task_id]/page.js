"use client";
import { Button } from "@/components/ui/button";
import { baseURL } from "@/lib/baseData";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const Success = ({ params }) => {
  const task_id = params.task_id;
  const user = useAppSelector((state) => state.auth.user);
  const [starsDetails, setStarsDetails] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/home");
    }
  }, []); // Added task_id to dependency array

  useEffect(() => {
    const getStars = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/get-user-stars.php?user_id=${user.id}&task_id=${task_id}`
        );
        console.log(response.data)
        if (response.data.stars);
        {
          console.log(response.data.stars);
          setStarsDetails(response.data.stars); // Assuming you want to set the data here

        }
        setStarsDetails(response.data); // Assuming you want to set the data here
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      getStars();
    }
  }, [user, task_id]); // Added task_id to dependency array

  return (
    <div className="w-full p-3 h-full">
      <div className="w-full h-full bg-white flex flex-col min-h-[60vh] md:min-h-[80vh] rounded-md justify-center items-center">
        <IoIosCheckmarkCircle size={90} color="#0b6ebf" />
        <p className="text-3xl font-bold text-[#0b6ebf]">Success</p>
        {
            starsDetails && (
                <div>
                    <p className="text-lg text-center my-5 space-y-5 font-bold">Star Achieved</p>
                    <div className="flex gap-3 w-full justify-center my-4">
                    {Array(starsDetails).fill(0).map((_, index) => (
                    <FaStar key={index} color="gold" size={20} />
                  ))}
                    </div>
                </div>
            )
        }
        <p className="text-sm text-black/40 p-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <Link href="/home">
          <Button className="bg-[#0b6ebf] text-lg">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
