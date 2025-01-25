// useDeleteBudget.js
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useDeleteBudget = () => {
  const deleteBudget = async (budgetId) => {
    try {
      await deleteDoc(doc(db, "budgets", budgetId));
    } catch (error) {
      console.error("Error deleting budget", error);
    }
  };

  return { deleteBudget };
};
