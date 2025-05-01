import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../config/axiosConfig";

function ReviewCard() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosInstance.get("reviews");
        setReviews(data.reviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  const calculateDaysAgo = (dateString) => {
    const diffMs = Date.now() - new Date(dateString).getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  };

  if (reviews.length === 0) {
    return <p className="p-4 text-gray-500">No reviews yet.</p>;
  }

  return (
    <>
      {reviews.map((review) => {
        const { review_id, rating, comment, created_at, user } = review;
        const days = calculateDaysAgo(created_at);
        const name = user?.username || "Anonymous";
        const avatar = "https://avatar.iran.liara.run/public/boy?username=Ash";
        const place = review.facility.name;

        return (
          <motion.div
            key={review_id}
            className="bg-[#D8C292] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="p-5">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <img
                    src={avatar}
                    width={60}
                    height={60}
                    alt={name}
                    className="rounded-full border-2 border-[#181818]/20"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-[#D8C292]"></div>
                </div>
                <div className="font-montaga text-sm text-[#434343] ml-4">
                  <h2 className="text-[#181818] text-xl md:text-2xl font-semibold">
                    {name}
                  </h2>
                  <div className="flex items-center">
                    <p className="opacity-75">
                      {days} {days === 1 ? "jour" : "jours"} ago
                    </p>
                    <span className="mx-2 text-[#434343]/50">•</span>
                    <p className="opacity-75 italic text-[#434343]">
                      {place}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-2">
                <div className="absolute -left-2 top-0 text-[#181818]/10 text-5xl font-serif">
                  "
                </div>
                <p className="text-[#313131] font-montaga text-sm md:text-base leading-relaxed pl-4 pr-2 relative z-10">
                  {comment}
                </p>
                <div className="absolute -right-2 bottom-0 text-[#181818]/10 text-5xl font-serif">
                  "
                </div>
              </div>

              <div className="flex mt-4 justify-end">
                {/** Render star rating **/}
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill={star <= rating ? "#293D36" : "none"}
                    stroke="#293D36"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

export default ReviewCard;