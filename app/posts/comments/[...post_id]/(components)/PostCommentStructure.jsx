"use client";
import { toast } from "@/components/ui/use-toast";
import { baseURL } from "@/lib/baseData";
import axios from "axios";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa6";

const PostCommentStructure = ({
  comment_text,
  commentId,
  handleReply,
  handleReply2,
  fetchComments,
  setShowReplyBox,
  reply,
  parentId,
  showOptions,
  user_id,
  item,
}) => {
  const [heartActive, setHeartActive] = useState(
    item.already_liked ? item.already_liked : false
  );
  const [count, setCount] = useState(
    parseInt(item.post_comment_likes_count ? item.post_comment_likes_count : 0)
  );
  const handleHeart = async () => {
    // Alert.alert(item.post_id)
    try {
      const response = await axios.get(
        `${baseURL}/toggle-post-comments.php?post_id=${item.post_id}&page_id=${item.page_id}&comment_author=${item.user_id}&comment_id=${item.id}&user_id=${user_id}`
      );
      console.log(response.data);

      if (response.status === 200) {
        if (!heartActive) {
          setCount((prevCount) => prevCount + 1);
        } else {
          setCount((prevCount) => prevCount - 1);
        }
        setHeartActive((prevHeart) => !prevHeart);
        console.log(response.data);
      } else {
        console.error("Failed to toggle likes comment");
      }
    } catch (error) {
      alert(item.post_id);
      console.error("Error while toggling likes comment:", error.message);
    }
  };
  const HandleReplyCheck = () => {
    if (reply) {
      handleReply2(parentId, commentId); // Invoke handleReply2 directly
    } else {
      handleReply(parentId); // Invoke handleReply directly
    }
    setShowReplyBox(parentId);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.get(
        `${baseURL}/delete-post-comment.php?id=${id}`
      );
      console.log(response.data);
      if (response.status === 200) {
        toast({description:"Comment deleted successfully"});

        fetchComments();
      } else {
        toast({description:"Something went wrong!!"});
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast({description:"Something went wrong!!"});
    }
  };
  const showAlertFunction2 = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      handleDelete(commentId);
    }
  };
  const handleReport = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/report-post-comment.php?comment_id=${item.id}&post_id=${item.post_id}&user_id=${item.user_id}&reported_user=${user_id}`
      );

      console.log(response.data);
      if (response.status === 200) {
        toast({description:`Comment reported successfully`});

        fetchComments();
      } else {
        console.error("Failed to report media");
      }
    } catch (error) {
      console.error("Error while report media:", error.message);
    }
  };
  const showAlertFunction = () => {
    const result = window.confirm("Are you sure you want to report this comment?");
    if (result) {
      handleReport();
    }
  };
  return (
    <div className="relative">
      <p className="text-base text-gray-600 font-normal">
        {item.reported === "no" ? (
          <span>{comment_text}</span>
        ) : (
          <span className="italic">This comment is reported by you.</span>
        )}
      </p>
      <div className="flex flex-row gap-3 mt-2 items-center">
        <button
          onClick={handleHeart}
          className="flex gap-1 items-center p-1 border border-transparent hover:border-gray-300 rounded"
        >
          {heartActive ? (
            <FaHeart size={20} color="red" />
          ) : (
            <FaRegHeart size={20} color="black" />
          )}
          <span>{count} likes</span>
        </button>
        <button onClick={HandleReplyCheck} className="font-semibold text-sm">
          Reply
        </button>
      </div>

      {
      showOptions === commentId && 
      (
        <div className="absolute right-0 -top-7 shadow-md rounded-md">
          {/* item.user_id == user_id && */}
          <div>
            <button
              
              className="flex gap-2 px-3 items-center py-2"
              onClick={showAlertFunction2}
            >
              <FaTrash color="red"/>
              <span>Delete</span>
            </button>
            <hr />
          </div>
          <button
            onClick={showAlertFunction}
            className="flex gap-2 px-3 items-center py-2"
          >
           <FaInfoCircle color="red" />
            <span>Report</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCommentStructure;
