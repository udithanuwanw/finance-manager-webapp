import { addDoc, collection, serverTimestamp,Timestamp } from "firebase/firestore";

import { useGetUserInfo } from "./useGetUserInfo";
import { db } from "../config/firebase-config";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
    createdAt
  }) => {
    const timestamp = createdAt instanceof Date ? Timestamp.fromDate(createdAt) : serverTimestamp();
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: timestamp,
    });
  };
  return { addTransaction };
};