import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetExpensesFull = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const expenseCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const getExpenses = async () => {
      if (!userID) {
        console.warn("userID is not available.");
        return;
      }

      try {
        const queryExpenses = query(
          expenseCollectionRef,
          where("userID", "==", userID),
          where("transactionType", "==", "expense"),
          orderBy("date")
        );

        const unsubscribe = onSnapshot(queryExpenses, (snapshot) => {
          let expenseList = [];
          let totalExpensesAmount = 0;

          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            expenseList.push({ ...data, id });
            totalExpensesAmount += Number(data.transactionAmount);
          });

          setExpenses(expenseList);
          setTotalExpenses(totalExpensesAmount);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    getExpenses();
  }, [userID]);

  return { expenses, totalExpenses };
};