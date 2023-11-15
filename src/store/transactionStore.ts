import create from "zustand";
import Cookies from "js-cookie";
import axios from "axios";

interface TransactionItem {
  _id: string;
  foodId: string;
  quantity: number;
  subtotal: number;
  makanan: string;
}

interface Transaction {
  _id: string;
  userId: string;
  items: TransactionItem[];
  totalAmount: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TransactionStore {
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
  handlePaymentComplete: (
    transactionId: string,
    rating: number,
    comment: string
  ) => Promise<void>;
}

const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  fetchTransactions: async () => {
    try {
      const auth_token = Cookies.get("auth_token");
      const headers = {
        Authorization: `Bearer ${auth_token}`,
      };

      const response = await axios.get<{ transactions: Transaction[] }>(
        "https://sdg-12-b-backend-production.up.railway.app/api/transaction/transactions",
        { headers }
      );

      if (response.data && response.data.transactions) {
        set({ transactions: response.data.transactions });
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  },
  handlePaymentComplete: async (transactionId: string, rating: number, comment: string) => {
    try {
      const auth_token = Cookies.get("auth_token");
      const headers = {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": "application/json",
      };

      const requestBody = {
        rating,
        comment,
      };

      const response = await axios.put(
        `https://sdg-12-b-backend-production.up.railway.app/api/transaction/update/${transactionId}`,
        requestBody,
        { headers }
      );

      if (response.status === 200) {
        await useTransactionStore.getState().fetchTransactions();
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  },
}));

export default useTransactionStore;
