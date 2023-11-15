import React, { useEffect } from "react";
import useTransactionStore from "../../../store/transactionStore";
import "./index.css";

const TransactionPage: React.FC = () => {
  const { transactions, fetchTransactions, handlePaymentComplete } =
    useTransactionStore();

  useEffect(() => {
    // Fetch transaction data when the component mounts
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-16">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className={`card h-96 w-96 bg-base-100 shadow-md p-6 ${transaction.isCompleted ? "opacity-70 bg-slate-400" : ""
              }`}
          >
            <h3 className="text-lg font-semibold mb-4">
              Transaction ID: {transaction._id}
            </h3>
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
                    {item.quantity} x {item.foodId} -{" "}
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
            <div className="flex gap-8 items-center mt-12">
              {!transaction.isCompleted ? (
                <>
                  <p>Bayar Sekarang</p>
                  <button
                    onClick={() => {
                      handlePaymentComplete(transaction._id);
                    }}
                    className="bg-primary w-16 h-8 rounded-xl text-white"
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
    </div>
  );
};

export default TransactionPage;
