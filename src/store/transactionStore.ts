// transactionStore.ts
import create from "zustand";
import Cookies from "js-cookie";
import axios from "axios";

interface TransactionItem {
  _id: string;
  foodId: string;
  quantity: number;
  subtotal: number;
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
  handlePaymentComplete: (transactionId: string) => Promise<void>;
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
      // Handle error fetching transactions
    }
  },
  handlePaymentComplete: async (transactionId: string) => {
    try {
      const auth_token = Cookies.get("auth_token");
      const headers = {
        Authorization: `Bearer ${auth_token}`,
      };

      // Make a request to update the payment status to completed
      const response = await axios.put(
        `https://sdg-12-b-backend-production.up.railway.app/api/transaction/update/${transactionId}`,
        null,
        { headers }
      );

      if (response.status === 200) {
        // Trigger a fetch to get the updated data
        await useTransactionStore.getState().fetchTransactions();
        console.log("Payment status updated successfully");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      // Handle error updating payment status
    }
  },
}));

export default useTransactionStore;
