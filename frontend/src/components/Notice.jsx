import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import axios from "axios";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Notice = () => {
  const router = useLocation();
  const [notice, setNotice] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState({ title: "", description: "", type: "student", link: "" });

  const getNoticeHandler = () => {
    let requestData = router.pathname === "/student" 
      ? { type: ["student", "both"] } 
      : { type: ["student", "both", "faculty"] };

    axios
      .get(`${baseApiURL()}/notice/getNotice`, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        if (response.data.success) {
          setNotice(response.data.notice);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => toast.error(error.response?.data?.message || "Error fetching notices"));
  };

  useEffect(getNoticeHandler, [router.pathname]);

  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    const endpoint = edit ? `/notice/updateNotice/${id}` : "/notice/addNotice";
    const method = edit ? axios.put : axios.post;

    toast.loading(edit ? "Updating Notice" : "Adding Notice");
    method(`${baseApiURL()}${endpoint}`, data, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getNoticeHandler();
          setOpen(false);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => toast.error(error.response?.data?.message || "Error processing request"));
  };

  const handleDeleteNotice = (id) => {
    toast.loading("Deleting Notice");
    axios
      .delete(`${baseApiURL()}/notice/deleteNotice/${id}`, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getNoticeHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => toast.error(error.response?.data?.message || "Error deleting notice"));
  };

  const handleEdit = (index) => {
    setEdit(true);
    setOpen(true);
    setId(notice[index]._id);
    setData({
      title: notice[index].title,
      description: notice[index].description,
      type: notice[index].type,
      link: notice[index].link,
    });
  };

  const handleOpenClose = () => {
    setOpen(!open);
    setEdit(false);
    setData({ title: "", description: "", type: "student", link: "" });
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-4">
        <Heading title="Notices & Announcements" />
        {(router.pathname === "/faculty" || router.pathname === "/admin") && (
          <button
            className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg flex items-center"
            onClick={handleOpenClose}
          >
            {open ? (
              <>
                <BiArrowBack className="mr-2" /> Close
              </>
            ) : (
              <>
                Add Notice <IoAddOutline className="ml-2 text-xl" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Notices List */}
      {!open && (
        <div className="mt-8 w-full max-w-4xl">
          {notice.length > 0 ? (
            notice.map((item, index) => (
              <div key={item._id} className="p-6 mb-6 bg-white shadow-md rounded-lg relative">
                {/* Notice Content */}
                <p
                  className={`text-xl font-semibold flex items-center cursor-pointer group ${
                    item.link && "hover:text-blue-500"
                  }`}
                  onClick={() => item.link && window.open(item.link)}
                >
                  {item.title}
                  {item.link && <IoMdLink className="ml-2 text-2xl group-hover:text-blue-500" />}
                </p>
                <p className="text-gray-700 mt-2">{item.description}</p>

                {/* Date */}
                <p className="absolute top-4 right-4 text-sm flex items-center text-gray-500">
                  <HiOutlineCalendar className="mr-1 text-base" />
                  {item.createdAt.split("T")[0].split("-").reverse().join("/")}{" "}
                  {item.createdAt.split("T")[1].split(".")[0]}
                </p>

                {/* Admin/Faculty Actions */}
                {(router.pathname === "/faculty" || router.pathname === "/admin") && (
                  <div className="absolute right-4 bottom-4 flex items-center">
                    <span className="px-4 py-1 text-white bg-blue-500 rounded-full text-sm">{item.type}</span>
                    <MdDeleteOutline
                      className="ml-3 text-2xl text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleDeleteNotice(item._id)}
                    />
                    <MdEditNote
                      className="ml-3 text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
                      onClick={() => handleEdit(index)}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No notices available.</p>
          )}
        </div>
      )}

      {/* Add/Edit Notice Form */}
      {open && (
        <form onSubmit={handleNoticeSubmit} className="mt-8 w-full max-w-2xl bg-white p-8 shadow-md rounded-lg">
          <div className="mb-4">
            <label className="block font-semibold">Notice Title</label>
            <input
              type="text"
              className="w-full p-3 mt-1 border rounded-lg"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Notice Description</label>
            <textarea
              rows="4"
              className="w-full p-3 mt-1 border rounded-lg resize-none"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Notice Link (Optional)</label>
            <input
              type="text"
              className="w-full p-3 mt-1 border rounded-lg"
              value={data.link}
              onChange={(e) => setData({ ...data, link: e.target.value })}
            />
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {edit ? "Update Notice" : "Add Notice"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Notice;
