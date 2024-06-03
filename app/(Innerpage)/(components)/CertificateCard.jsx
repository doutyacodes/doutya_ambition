import Image from "next/image";
import React from "react";

const CertificateCard = ({ item }) => {
  return (
    <div className="flex flex-col w-full min-h-72 min-w-80 bg-yellow-400 p-2">
      <div className="flex flex-col bg-indigo-900 px-3 py-3 ">
        <h1 className="text-red-500  italic font-bold text-center text-nowrap flex-nowrap">
          Challenge Completed Certificate
        </h1>
        <p className="text-white  font-bold text-center my-5 text-nowrap flex-nowrap">
          THIS IS PRESENTED TO
        </p>
        <p className="text-red-500  font-bold text-center mb-5 text-nowrap flex-nowrap">
          {item.name}
        </p>
        <p className="text-white  font-bold text-center mb-5 text-wrap">
          for completing the challenge {item.challenge_title} organized by {item.page_title} on {item.end_date}
        </p>
        <div className="flex justify-between relative items-center p-2">
          <div className="p-2 bg-white rounded-lg relative w-10 h-10">
            <Image
              src="/assets/images/signature.png"
              alt="signature"
              fill
              className=" object-cover"
            />
          </div>
         <div className="p-2  relative w-10 h-10">
             <Image
            src="/assets/images/badge2.png"
            alt="badge"
            fill
            className=" object-cover"
          />
         </div>
          <div className="p-2 bg-white rounded-lg relative w-10 h-10">
            <Image
              src="/assets/images/signature.png"
              alt="signature"
              fill
              className=" object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
