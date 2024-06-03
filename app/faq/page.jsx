import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const PageFaq = () => {
  const faqData = [
    {
      id: 1,
      question: "How do I join a challenge?",
      answer:
        "To join a challenge, simply navigate to the challenges section of the app, browse through the available challenges, and click on the 'Join' button next to the challenge you're interested in.",
    },
    {
      id: 2,
      question: "Can I participate in multiple challenges at the same time?",
      answer:
        "Yes, you can participate in multiple challenges simultaneously. However, make sure you can commit enough time and effort to each challenge to make meaningful progress.",
    },
    {
      id: 3,
      question: "What happens if I miss a day of the challenge?",
      answer:
        "Missing a day won't disqualify you from the challenge, but it might affect your progress. Try to stay consistent, but if you miss a day, you can always continue with the challenge from where you left off.",
    },
    {
      id: 4,
      question: "How do I track my progress?",
      answer:
        "You can track your progress within each challenge by accessing the challenge details. Most challenges come with built-in progress tracking features that allow you to log your activities, view your achievements, and see how you compare to other participants.",
    },
    {
      id: 5,
      question: "What if I encounter technical issues during the challenge?",
      answer:
        "If you encounter any technical issues, such as app crashes or glitches, please reach out to our support team immediately. We're here to help you resolve any issues so you can continue enjoying the challenge.",
    },
  ];
  return (
    <div className="max-w-[600px]  min-h-screen overflow-x-scroll  w-full mx-auto bg-[#e5e5e5] p-3">
      <div className="flex items-center">
        <Link href="/home">
        <FaChevronLeft /></Link>
        <div className="flex-1 text-center font-bold">FAQ</div>
      </div>
      <div className="mt-2 w-full">
        <Accordion type="single" collapsible>
          {faqData?.length > 0 &&
            faqData?.map((item, index) => {
              return (
                <AccordionItem value={`item-${index}`} key={index} className="bg-white mt-2 p-2">
                  <AccordionTrigger><p className="font-bold">{item.question}</p></AccordionTrigger>
                  <AccordionContent>
                    <p className="font-semibold text-gray-500">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
      </div>
    </div>
  );
};

export default PageFaq;
