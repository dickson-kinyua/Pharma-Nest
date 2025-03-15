"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const Reviews = ({ product }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [openReview, setOpenReview] = useState(false);

  async function handleReviewSubmit() {
    const data = { productID: product._id, rating, review };
    console.log(data);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          cache: "no-store",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        return;
      }
      const json = await response.json();
      toast.success(`${json.message}`, { autoClose: 1000 });
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchReviews(productID) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?id=${productID}`,
          {
            method: "GET",
            cache: "no-store",
            credentials: "include",
          }
        );
        if (!response.ok) {
          const errorMessage = await response.json();
          console.log(errorMessage);
          return;
        }

        const json = await response.json();
        // console.log(json);
        setReviews(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviews(product._id);
  }, [product]);

  function toggleOpenReview() {
    setOpenReview((curr) => !curr);
  }

  return (
    <>
      <button onClick={toggleOpenReview}>Leave us a review</button>
      {openReview && (
        <div>
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setRating(star)}
                className={
                  star <= rating
                    ? "text-yellow-500 cursor-pointer"
                    : "text-gray-300 cursor-pointer"
                }
              />
            ))}
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            className="border p-2 w-full mt-2"
          />
          <button
            onClick={handleReviewSubmit}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </div>
      )}

      <p>Customer reviews({reviews?.length})</p>

      <ul className="mt-10">
        {reviews?.map((rev) => (
          <li key={rev._id} className="flex gap-5">
            <div className="bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full">
              {rev.userID?.userName
                ? rev.userID.userName.charAt(0).toUpperCase()
                : "?"}
            </div>

            <div>
              <p className="capitalize font-semibold">
                {rev?.userID?.userName}
              </p>
              <p className="text-[12px]">
                {new Date(rev.createdAt).toDateString()} at{" "}
                {new Date(rev.createdAt).toLocaleTimeString()}
              </p>
              <p>{rev?.review}</p>
              <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <FaStar
                    key={index}
                    className={
                      star <= rev.rating
                        ? "text-yellow-500 cursor-pointer"
                        : "text-gray-300 cursor-pointer"
                    }
                  />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Reviews;
