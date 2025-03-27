"use client";

import ReviewsFetchingSkeleton from "@/app/skeletons/reviewsFetchingSkeleton";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const Reviews = ({ product }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [openReview, setOpenReview] = useState(false);

  async function handleReviewSubmit() {
    const data = { productID: product._id, rating, review };
    // console.log(data);
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
        toast.warn(`${errorMessage.error}`, { autoClose: 1000 });
        console.log(errorMessage);
        return;
      }
      const json = await response.json();
      toast.success(`${json.message}`, { autoClose: 1000 });
      // Reset review input fields
      setReview("");
      setRating(0);
      setOpenReview(false);

      // Fetch latest reviews after successful submission
      fetchReviews(product._id);
      // console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchReviews(productID) {
    setLoadingReviews(true);
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
      setLoadingReviews(false);
      // console.log(json);
      setReviews(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingReviews(false);
    }
  }

  useEffect(() => {
    fetchReviews(product._id);
  }, [product]);

  function toggleOpenReview() {
    setOpenReview((curr) => !curr);
  }

  if (loadingReviews) return <ReviewsFetchingSkeleton />;

  return (
    <>
      <button onClick={toggleOpenReview} className="border-b-2 my-1">
        Leave us a review ↗
      </button>

      {/* Overlay */}
      {openReview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={toggleOpenReview} // Clicking outside closes the modal
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg z-50 w-[90%] sm:w-[400px] text-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-xl font-bold">Write a Review</h2>

            {/* Star Rating */}
            <div className="flex justify-center space-x-2 mt-2">
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

            {/* Review Input */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="border p-2 w-full mt-4 bg-gray-100 rounded-md"
            />

            {/* Submit Button */}
            <button
              onClick={handleReviewSubmit}
              className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
            >
              Submit
            </button>

            {/* Close Button */}
            <button
              onClick={toggleOpenReview}
              className="mt-2 text-gray-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <p>Customer reviews ({reviews?.length})</p>
      {reviews.length > 0 ? (
        <ul className="mt-2">
          {reviews?.map((rev) => (
            <li key={rev._id} className="flex gap-5">
              <div className="bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full">
                {rev.userID?.fullName
                  ? rev.userID.fullName.charAt(0).toUpperCase()
                  : "?"}
              </div>

              <div>
                <p className="capitalize font-semibold">
                  {rev?.userID?.fullName}
                </p>
                <p className="text-[12px]">
                  {new Date(rev.createdAt).toDateString()} at{" "}
                  {new Date(rev.createdAt).toLocaleTimeString()}
                </p>
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
                <p className="mt-3">{rev?.review}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10">No reviews yet!</div>
      )}
    </>
  );
};

export default Reviews;
