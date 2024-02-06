// useAddBudget.js
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";
import { db } from "../config/firebase-config";

export const useAddBudget = () => {
  const budgetCollectionRef = collection(db, "budgets");
  const { userID } = useGetUserInfo();

  const addBudget = async ({ category, amount }) => {
    try {
      // Add budget to the "budgets" collection in Firestore
      await addDoc(budgetCollectionRef, {
        userID,
        category,
        amount: parseFloat(amount),
        createdAt: serverTimestamp(),
      });

      console.log('Budget added successfully!');
    } catch (error) {
      console.error('Error adding budget', error);
    }
  };

  return { addBudget };
};
