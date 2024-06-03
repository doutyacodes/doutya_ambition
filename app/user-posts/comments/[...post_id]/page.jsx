"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { baseImgURL, baseURL } from "@/lib/baseData";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { BsThreeDots } from "react-icons/bs";
import UserCommentStructure from "./(components)/UserCommentStructure";
import { IoSend } from "react-icons/io5";
import UserReplyStructure from "./(components)/UserReplyStructure";
import { useAppSelector } from "@/lib/hooks";

const CommentsPage = ({ params }) => {
  const user = useAppSelector((state) => state.auth.user);

  const post_id = params.post_id[0];
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [parentComment, setParentComment] = useState(0);
  const [subParent, setSubParent] = useState(0);
  const [commentData, setCommentData] = useState([]); // Initialize to null
  const [showReplies, setShowReplies] = useState({});
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [showOptions, setShowOptions] = useState(0);
  const fetchComments = async () => {
    if (post_id) {
      try {
        const response = await axios.get(
          `${baseURL}/getUserComment.php?post_id=${post_id}&userId=${user?.id}`
        );

        if (response.status === 200) {
          console.log(response.data);
          setCommentData(response.data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error while fetching comments:", error.message);
      }
    }
  };
  useEffect(() => {
    fetchComments();
  }, [post_id]);
  const handleComment = async () => {
    try {
      // const data = {
      //   parent_comment_id: parentComment,
      //   comment_text: commentText ? commentText : replyText,
      //   post_id: post_id,
      //   user_id: user?.id,
      //   sub_parent: subParent,
      //   page_id: page_id,
      // };
      // console.log(data);return;
      const response = await axios.post(
          `${baseURL}/add-user-comment.php`,
          {
            parent_comment_id: parentComment,
            comment_text: commentText ? commentText : replyText,
            post_id: post_id,
            user_id: user?.id,
            sub_parent: subParent,
          },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200 && response.data.success) {
        toast({
          description: "Comment added successfully.",
        });

        setCommentText("");
        fetchComments();
      } else {
        toast({
          description: "Oops. Something went wrong..try again!!",
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast({
        description: "Oops. Something went wrong!!",
      });
    }
  };
  const textInputRef = useRef(null);
  const textInputRefs = useRef({});
  const toggleReplies = (commentId) => {
    setShowReplyBox(0);
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
  const handleReply = (parentId) => {
    console.log("handle reply called with parent id ", parentId);
    setReplyText("");
    setCommentText("");
    setParentComment(parentId);
    if (textInputRefs.current[parentId]) {
      textInputRefs.current[parentId].focus();
    }
  };
  const handleReply2 = (parentId, sub) => {
    console.log("handle reply called with parent id ", parentId);
    setReplyText("");
    setCommentText("");
    // Focus on the text input
    setParentComment(parentId);
    setSubParent(sub);
    // if (textInputRef.current) {
    //   textInputRef.current.focus();
    // }
  };
  return (
    <div className="max-w-[600px]  min-h-screen overflow-y-scroll w-full mx-auto bg-white border p-3 relative flex flex-col gap-4">
     <div className="flex-1">
     {commentData?.length > 0 &&
        commentData?.map((item, index) => {
          return (
            <div className="w-full" key={index}>
              <div className="flex gap-3 ">
                <div
                  className={cn(
                    " relative  h-16 w-16 ",
                    item?.user_image
                      ? ""
                      : " bg-[#ff8f8e] rounded-full flex justify-center items-center"
                  )}
                >
                  {item?.user_image ? (
                    <Image
                      src={baseImgURL + item?.user_image}
                      fill
                      alt="Profile Image"
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <p className="text-3xl text-white font-bold">
                      {item?.first_character}
                    </p>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <p className="font-bold"> {item.name}</p>
                  <UserCommentStructure
                    comment_text={item.comment_text}
                      commentId={item.id}
                      handleReply={handleReply}
                      handleReply2={handleReply2}
                      showReplyBox={showReplyBox}
                      setShowReplyBox={setShowReplyBox}
                      parentId={item.id}
                      fetchComments={fetchComments}
                      setShowOptions={setShowOptions}
                      showOptions={showOptions}
                      user_id={user?.id}
                      item={item}
                  />
                </div>
                <div className="ml-auto">
                  <BsThreeDots
                    onClick={() => {
                      showOptions == item.id
                        ? setShowOptions(0)
                        : setShowOptions(item.id);
                    }}
                  />
                </div>
              </div>
              <div className="pl-20">
                {item.replies && item.replies.length > 0 && (
                  <div className="mt-4">
                    <button
                      className="mt-3"
                      onClick={() => toggleReplies(item.id)}
                    >
                      <p>
                        {showReplies[item.id] ? "Hide Replies" : "Show Replies"}
                      </p>
                    </button>
                    {/* Replies */}
                    <div className="gap-4">
                      {item.replies.map((reply, replyIndex) => (
                        <UserReplyStructure
                          key={reply.id}
                          item={reply}
                          isVisible={showReplies[item.id]}
                          handleReply={handleReply}
                          handleReply2={handleReply2}
                          showReplyBox={showReplyBox}
                          setShowReplyBox={setShowReplyBox}
                          reply={false}
                          parentId={item.id}
                          fetchComments={fetchComments}
                          setShowOptions={setShowOptions}
                          showOptions={showOptions}
                          user_id={user?.id}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {item.replies &&
                  item.replies.length > 0 &&
                  showReplies[item.id] && (
                    <div className="absolute h-full border border-[#e5e5e5] top-0 left-32 -z-10" />
                  )}
                {showReplyBox === item.id && (
                  <div className="mt-4 flex gap-3">
                    <div className="">
                      <input
                        type="text"
                        onChange={(e) => setReplyText(e.target.value)}
                        className="bg-[#e5e5e5] rounded-md flex-1 p-3 "
                        placeholder="Write your reply"
                      />
                    </div>
                    <button
                      className="p-3 px-4 rounded-md"
                      onClick={handleComment}
                    >
                      <IoSend color="#8B42FC" size={22} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
     </div>
      <div
       
        className="pb-3 px-5 py-4 w-full bg-white"
      >
        <div
         
          className={cn("flex gap-2 ",commentText.length > 2 ? " items-end" : " items-center")}
        >
          <textarea
            className="flex-1 bg-gray-200 px-4 py-1 rounded-full"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            ref={textInputRef}
          />

          {commentText.trim().length > 0 && (
            <button
              style={{
                padding: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
              }}
              onClick={handleComment}
            >
              <IoSend color="#8B42FC" size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
