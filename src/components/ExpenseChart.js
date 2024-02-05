// ExpenseChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { useGetExpenses } from "../hooks/useGetExpenses";

const ExpenseChart = () => {
  const { expenses, totalExpenses } = useGetExpenses();

  const chartData = {
    labels: expenses.map((expense) => expense.description),
    datasets: [
      {
        data: expenses.map((expense) => Number(expense.transactionAmount)),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 205, 86, 0.7)",
          // Add more colors as needed
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Expense Chart</h2>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpenseChart;
