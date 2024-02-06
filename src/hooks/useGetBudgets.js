// useGetBudgets.js
import { useEffect, useState } from 'react';
import { collection, where, getDocs } from 'firebase/firestore';
import { useGetUserInfo } from './useGetUserInfo';
import { db } from '../config/firebase-config';

export const useGetBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const { userID } = useGetUserInfo();

  const fetchBudgets = async () => {
    try {
      // Query budgets collection for the current user
      const querySnapshot = await getDocs(
        collection(db, 'budgets'),
        where('userID', '==', userID)
      );

      // Map documents to an array
      const budgetData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBudgets(budgetData);
    } catch (error) {
      console.error('Error fetching budgets', error);
    }
  };

  useEffect(() => {
    // Fetch budgets when userID changes
    fetchBudgets();
  }, [fetchBudgets, userID]);

  return { budgets, fetchBudgets };
};
