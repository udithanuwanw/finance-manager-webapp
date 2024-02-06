// ExpenseChart.js
import React from "react";
import { Pie ,Doughnut} from "react-chartjs-2";
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
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Expense by Category',
        font: {
          size: 20,
        },
      },
    }
  };

  return (
    <div >

      <div style={{width: '100%', height: '100%', marginTop:"5px", paddingBottom:"10%",paddingLeft:"10%",paddingRight:"10%",background:"#FFFFFF",border:"2px solid #FFFFFF",boxShadow:"0px 1px 15px rgba(0, 0, 0, 0.06)",borderRadius:"20px"}}>
      <h1>sdsa</h1>
      <Doughnut data={chartData} options={chartOptions}/>
      </div>
      
  

    </div>
  );
};

export default ExpenseChart;
