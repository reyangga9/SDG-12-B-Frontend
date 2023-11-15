import React, { useState } from "react";
import useTransactionStore from "../../../store/transactionStore";

interface RatingModalProps {
  isOpenModal: boolean;
  closeModal: () => void;
  transactionId?: string; // Make the transaction ID prop optional
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpenModal,
  closeModal,
  transactionId, // Receive the transaction ID as a prop
}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0); // Assuming a 5-star rating system
  const transactionStore = useTransactionStore();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const handleSendMessage = async () => {
    if (transactionId !== undefined) {
      // Call the handlePaymentComplete function with rating and comment
      await transactionStore.handlePaymentComplete(
        transactionId,
        rating,
        comment
      );
    }
    closeModal(); // Close the modal after handling the payment
  };

  return (
    <>
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" />
          <dialog
            className="modal modal-bottom sm:modal-middle"
            open={isOpenModal}
            onClose={closeModal}
          >
            <div className="modal-box">
              <h3 className="font-bold text-2xl">Rate and Comment</h3>
              <div className="py-4">
                <div className="mb-4">
                  <label className="block font-bold text-lg mb-2">
                    Rating:
                  </label>
                  <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer ${
                          star <= rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                        onClick={() => handleRatingChange(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-lg mb-2">
                    Comment:
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </div>
              </div>
              <div className="modal-action">
                <div>
                  <button
                    className="btn btn-primary btn-block normal-case text-lg"
                    onClick={handleSendMessage}
                  >
                    Send Message
                  </button>
                </div>
                <button
                  className="btn normal-case text-lg"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default RatingModal;
