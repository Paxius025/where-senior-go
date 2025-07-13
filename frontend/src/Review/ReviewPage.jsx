// import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import  ReviewList  from "./ReviewList.jsx";
const ReviewPage = () => {

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Review Page</h1>
        <ReviewList />
      </div>
    </>
  );
};

export default ReviewPage;