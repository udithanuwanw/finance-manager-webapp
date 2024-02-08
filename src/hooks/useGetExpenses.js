// useGetExpenses.js
import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetExpenses = () => {
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
          let expenseMap = new Map(); // Using Map to aggregate expenses by category name
          let totalExpensesAmount = 0;

          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            // Accessing category name from the selectedCategory object
            const categoryName = data.selectedCategory.name;
            const amount = Number(data.transactionAmount);
            totalExpensesAmount += amount;

            if (expenseMap.has(categoryName)) {
              expenseMap.set(categoryName, expenseMap.get(categoryName) + amount);
            } else {
              expenseMap.set(categoryName, amount);
            }
          });

          // Convert aggregated data into an array of objects
          const expenseList = Array.from(expenseMap, ([name, amount]) => ({ name, amount }));
          console.log(expenseList);

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
