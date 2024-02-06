import React, { useState, useEffect } from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import moment from 'moment';
import { useGetIncome } from '../hooks/useGetIncomes';
import { useGetExpenses } from '../hooks/useGetExpenses';
import { useGetTransactions } from '../hooks/useGetTransactions';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function IncomeExpenseLineGraph() {
    const { incomes } = useGetIncome();
    const { expenses } = useGetExpenses();
    const { transactions } = useGetTransactions();
    const [chartData, setChartData] = useState(getInitialChartData());

    useEffect(() => {
        // Update chart data whenever transactions, incomes, or expenses change
        setChartData(getUpdatedChartData());
    }, [transactions, incomes, expenses]);

    function getInitialChartData() {
        return {
            labels: [],
            datasets: [
                {
                    label: 'Income',
                    data: [],
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 2,
                    tension: 0.2,
                },
                {
                    label: 'Expenses',
                    data: [],
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 2,
                    tension: 0.2,
                },
            ],
        };
    }

    function getUpdatedChartData() {
        return {
            labels: transactions.map((transaction) => {
                const { createdAt } = transaction;
                const createdAtSeconds = createdAt ? createdAt.seconds : null;
                return createdAtSeconds ? moment(createdAtSeconds * 1000).format('DD MMM') : null;
            }),
            datasets: [
                {
                    label: 'Income',
                    data: incomes.map((income) => income.transactionAmount),
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 2,
                    tension: 0.2,
                },
                {
                    label: 'Expenses',
                    data: expenses.map((expense) => expense.transactionAmount),
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 2,
                    tension: 0.2,
                },
            ],
        };
    }

    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Income vs. Expenses',
                font: {
                    size: 20,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    callback: (value) => `$${value.toFixed(2)}`, // Format y-axis ticks as currency
                },
            },
        },
    };

    return (
        <ChartStyled>
            <Line data={chartData} options={chartOptions} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FFFFFF;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 40vh;
    margin-top: 10px;
`;

export default IncomeExpenseLineGraph;
