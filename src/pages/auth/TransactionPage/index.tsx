import React, { useEffect, useState } from "react";
import useTransactionStore from "../../../store/transactionStore";
import "./index.css";
import RatingModal from "./RatingModal";
import { ConfirmationSweetAlert } from "~/components/SweetAlert2";

const TransactionPage: React.FC = () => {
  const { transactions, fetchTransactions } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year} `;
    return formattedDate;
  };

  const [isOpenModal, setOpenModal] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState<
    string | null
  >(null);

  const openModal = (transactionId: string) => {
    setCurrentTransactionId(transactionId);
    setOpenModal(true);
  };

  const closeModal = () => {
    setCurrentTransactionId(null);
    setOpenModal(false);
  };

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {transactions
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .sort((a, b) => {
            return a.isCompleted ? 1 : b.isCompleted ? -1 : 0;
          })
          .map((transaction) => (
            <div
              key={transaction._id}
              className={`card h-96 w-96 bg-base-100 shadow-md p-6 ${transaction.isCompleted ? "opacity-70 bg-neutral-200" : ""
                }`}
            >
              <h3 className="text-lg font-semibold mb-4">
                Transaction ID: {transaction._id}
              </h3>
              <p>Tanggal Transaksi : {formatDate(transaction.createdAt)}</p>
              <p>
                Jumlah Harus Dibayar :{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(transaction.totalAmount)}
              </p>

              <p>
                Status Transaksi :{" "}
                {transaction.isCompleted ? "Lunas" : "Belum Bayar"}
              </p>

              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">Items:</h4>
                <ul className="list-disc ml-6">
                  {transaction.items.map((item) => (
                    <li key={item._id}>
                      {item.quantity} x {item.makanan} -{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(item.subtotal)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-8 items-center justify-center mt-12">
                {!transaction.isCompleted ? (
                  <>
                    <button
                      onClick={async () => {
                        const result = await ConfirmationSweetAlert({
                          title:
                            "Are you sure you want to proceed with the transaction?",
                          text: "This action cannot be undone.",
                          icon: "question",
                        });

                        if (result.isConfirmed) {
                          // Open the modal and pass the transactionId
                          openModal(transaction._id);
                        } else {
                          // Add any logic you want to execute if the checkout is canceled
                        }
                      }}
                      className="btn btn-primary normal-case text-lg rounded-xl text-white"
                    >
                      Bayar
                    </button>
                  </>
                ) : (
                  <>
                    <p>Lunas</p>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
      <RatingModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        transactionId={currentTransactionId || undefined}
      />
    </div>
  );
};

export default TransactionPage;
