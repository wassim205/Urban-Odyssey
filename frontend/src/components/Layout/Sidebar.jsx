import React, { useState } from "react";
import {
  X,
  Building,
  MapPin,
  Info,
  Bookmark,
  ArrowLeftCircle,
  Navigation,
  MessageSquare,
  Send,
} from "lucide-react";
import axiosInstance from "../../config/axiosConfig";
import { useMapContext } from "../Context/MapContext";

function Sidebar({
  sidebarOpen,
  handleCloseSidebar,
  selectedPlace,
  sidebarVisible,
  saveToFavorites,
}) {
  const { submitReview } = useMapContext();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setSubmitting(true);

    try {
      await submitReview({
        facilityId: selectedPlace?.facility_id,
        rating,
        comment: reviewText,
      });

      setReviewText("");
      setSubmitMessage("Review submitted successfully!");

      setTimeout(() => setSubmitMessage(""), 3000);
    } catch (error) {
      setSubmitMessage("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`w-80 bg-[#4B4B4D] text-gray-100 shadow-xl h-full z-20 absolute left-0 transition-transform duration-300 ease-in-out transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ display: sidebarVisible || sidebarOpen ? "block" : "none" }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-[#3A3A3C] text-[#D8C292] px-6 py-4 flex justify-between items-center border-b border-[#5C5C5E]">
          <h2 className="font-righteous text-2xl">LOCATION DETAILS</h2>
          <button
            onClick={handleCloseSidebar}
            className="text-[#D8C292] hover:text-white transition p-1"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        {selectedPlace && (
          <div className="flex-grow overflow-y-auto px-6 py-4 space-y-6">
            {/* Pic Section */}
            {/* Pics here will be displayed after by checking the database first */}
            {selectedPlace?.place?.image && (
              <img
                src={selectedPlace.place.image || "/placeholder.svg"}
                alt={selectedPlace.place.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}

            {/* Title Section */}
            <div className="animate-fadeIn bg-[#5C5C5E] p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin size={20} className="text-[#D8C292]" />
                <h3 className="font-bebas text-xl text-[#D8C292]">NAME</h3>
              </div>
              <p className="text-white text-lg pl-7">
                {selectedPlace.place?.title || "Unknown Location"}
              </p>
            </div>

            {/* Category Section */}
            {selectedPlace.place?.category && (
              <div className="animate-fadeIn animation-delay-100 bg-[#5C5C5E] p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Building size={20} className="text-[#D8C292]" />
                  <h3 className="font-bebas text-xl text-[#D8C292]">
                    CATEGORY
                  </h3>
                </div>
                <p className="text-white text-lg pl-7">
                  {selectedPlace.place.category}
                </p>
              </div>
            )}

            {/* Address Section */}
            {selectedPlace.place?.address && (
              <div className="animate-fadeIn animation-delay-200 bg-[#5C5C5E] p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Info size={20} className="text-[#D8C292]" />
                  <h3 className="font-bebas text-xl text-[#D8C292]">ADDRESS</h3>
                </div>
                <p className="text-white text-lg pl-7">
                  {selectedPlace.place.address}
                </p>
              </div>
            )}

            {/* Coordinates Section */}
            <div className="animate-fadeIn animation-delay-300 bg-[#5C5C5E] p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-2">
                <Navigation size={20} className="text-[#D8C292]" />
                <h3 className="font-bebas text-xl text-[#D8C292]">
                  COORDINATES
                </h3>
              </div>
              <p className="text-white text-lg pl-7">
                {typeof selectedPlace.lat === "number" &&
                typeof selectedPlace.lng === "number"
                  ? `${selectedPlace.lat.toFixed(
                      6
                    )}, ${selectedPlace.lng.toFixed(6)}`
                  : typeof selectedPlace.lat === "string" &&
                    typeof selectedPlace.lng === "string"
                  ? `${parseFloat(selectedPlace.lat).toFixed(6)}, ${parseFloat(
                      selectedPlace.lng
                    ).toFixed(6)}`
                  : "Coordinates not available"}
              </p>
            </div>

            {/* Reviews Section */}

            <div className="animate-fadeIn animation-delay-400 bg-[#5C5C5E] p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-3">
                <MessageSquare size={20} className="text-[#D8C292]" />
                <h3 className="font-bebas text-xl text-[#D8C292]">REVIEWS</h3>
              </div>

              <div className="pl-7 space-y-3">
                {Array.isArray(selectedPlace.reviews) &&
                selectedPlace.reviews.length > 0 ? (
                  selectedPlace.reviews.map((review, index) => (
                    <div key={index} className="bg-[#444446] p-3 rounded-md">
                      <p className="text-white">{review.comment}</p>
                      {review.author && (
                        <p className="text-sm text-gray-300 mt-1">
                          - {review.author}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300 italic">No reviews available</p>
                )}
              </div>

              {/* Review Form */}
              {selectedPlace?.facility_id && (
                <form onSubmit={handleReviewSubmit} className="mt-4 pl-7">
                  <div className="space-y-3">
                    <label
                      htmlFor="review"
                      className="block text-sm font-medium text-gray-200"
                    >
                      Share your experience
                    </label>
                    <textarea
                      id="review"
                      rows="3"
                      className="w-full px-3 py-2 bg-[#333335] text-white rounded-md border border-[#6E6E70] focus:outline-none focus:ring-1 focus:ring-[#D8C292] focus:border-[#D8C292]"
                      placeholder="Write your review here..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                    ></textarea>

                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm ${
                          submitMessage.includes("success")
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {submitMessage}
                      </span>
                      <button
                        type="submit"
                        disabled={submitting || !reviewText.trim()}
                        className={`flex items-center justify-center bg-[#D8C292] hover:bg-[#E8D2A2] text-[#3A3A3C] px-4 py-2 rounded-md transition duration-200 ${
                          submitting || !reviewText.trim()
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <Send size={16} className="mr-1" />
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#3A3A3C] border-t border-[#5C5C5E] space-y-3">
          <button
            className="w-full bg-[#D8C292] hover:bg-[#E8D2A2] text-[#3A3A3C] font-bebas text-xl py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center shadow-md"
            onClick={saveToFavorites}
          >
            <Bookmark size={20} className="mr-2" />
            SAVE TO FAVORITES
          </button>

          <button
            className="w-full bg-[#5C5C5E] hover:bg-[#6E6E70] text-white font-bebas text-xl py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center shadow-md"
            onClick={handleCloseSidebar}
          >
            <ArrowLeftCircle size={20} className="mr-2" />
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
