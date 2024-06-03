import { Button } from "@/components/ui/button";
import React from "react";
import { FaChevronUp } from "react-icons/fa6";
import Image from "next/image";

const Home = () => {
  return (
    <div className="  w-full h-full">
      <div className="mt-44 md:mt-52 space-y-5">
        <h2 className="text-center text-white md:text-3xl text-2xl">
          Download Wowfy
        </h2>
        <p className=" text-center text-white px-8">
          Download Wowfy today and embark on a journey of thrilling challenges,
          captivating quizzes, and endless discoveries. Connect with like-minded
          individuals, share your thoughts through engaging posts, and forge new
          friendships in a vibrant community. Experience the excitement
          firsthand and unlock a world of possibilities with Wowfy!
        </p>
      </div>
      <div className="mt-5 flex justify-center items-center gap-5">
        <div className="relative h-12 w-32">
          <Image src={"/assets/images/gplay.png"} alt="google playstore" fill />
        </div>
        <div className="relative h-12 w-32">
          <Image src={"/assets/images/astore.png"} alt="appstore" fill />
        </div>
      </div>
      <div className="mt-20 text-center text-white w-full space-y-2">
        <div className="flex items-center justify-center w-full">
          <p className="animate-bounce">
            <FaChevronUp />
          </p>
        </div>
        <p className=" text-lg">Discover Wowfy</p>
      </div>
      <div className=" mt-12">
        <h3 className=" text-center text-3xl font-bold text-white">
          Open your Wowfy.
        </h3>
      </div>
      <div className=" mt-10 flex justify-center">
        <Button className=" rounded-full">Download</Button>
      </div>
      <div className=" mt-10 text-center space-y-5">
        <p className="text-white text-xl text-clip font-bold">Advertise</p>
        <p className="text-white text-xl text-clip font-bold">Creators</p>
        <p className="text-white text-xl text-clip font-bold">Developers</p>
      </div>
    </div>
  );
};

export default Home;
