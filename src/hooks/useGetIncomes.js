// useGetIncome.js
import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetIncome = () => {
  const [incomes, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const incomeCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const getIncome = async () => {
      if (!userID) {
        console.warn("userID is not available.");
        return;
      }

      try {
        const queryIncome = query(
            incomeCollectionRef,
          where("userID", "==", userID),
          where("transactionType", "==", "income"),
          orderBy("createdAt")
        );

        const unsubscribe = onSnapshot(queryIncome, (snapshot) => {
          let incomeList = [];
          let totalIncomeAmount = 0;

          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            incomeList.push({ ...data, id });
            totalIncomeAmount += Number(data.transactionAmount);
          });

          setIncome(incomeList);
          setTotalIncome(totalIncomeAmount);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error("Error fetching income:", err);
      }
    };

    getIncome();
  }, [userID]);

  return { incomes, totalIncome };
};
