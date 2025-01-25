import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useDeleteTransaction = () => {

  const deleteTransaction = async (transactionId) => {
    try {
      const transactionRef = doc(db, "transactions", transactionId);

      // Delete the transaction document
      await deleteDoc(transactionRef);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return { deleteTransaction };
};
