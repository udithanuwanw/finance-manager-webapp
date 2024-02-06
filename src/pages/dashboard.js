// Dashboard.js

import React from 'react';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { useGetTransactions } from '../hooks/useGetTransactions';
import ExpenseChart from '../components/ExpenseChart';
import IncomeExpenseLineGraph from '../components/IncomeExpenseLineGraph';
import moment from 'moment';
import _ from 'lodash';

const Dashboard = () => {
  const { transactions, transactionTotals } = useGetTransactions();
  const { balance, income, expenses } = transactionTotals;

  return (
    <Layout>
      <div className='container mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-semibold text-gray-800'>DASHBOARD</h1>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <div className='bg-cyan-600 rounded-lg p-6 text-white'>
            <h3 className='text-lg font-semibold mb-4'>BALANCE</h3>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faWallet} size='2x' />
              <h1 className='text-2xl ml-2'>${balance}</h1>
            </div>
          </div>
          <div className='bg-teal-500 rounded-lg p-6 text-white'>
            <h3 className='text-lg font-semibold mb-4'>INCOME</h3>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faArrowUp} size='2x' />
              <h1 className='text-2xl ml-2'>${income}</h1>
            </div>
          </div>
          <div className='bg-pink-500 rounded-lg p-6 text-white'>
            <h3 className='text-lg font-semibold mb-4'>EXPENSE</h3>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faArrowDown} size='2x' />
              <h1 className='text-2xl ml-2'>${expenses}</h1>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
          <div className='bg-white rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Expense Chart</h2>
            <ExpenseChart />
          </div>
          <div className='bg-white rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Income vs Expense</h2>
            <IncomeExpenseLineGraph />
          </div>
        </div>

        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-4'>Recent Transactions</h2>
          <div className="flex items-center justify-center h-screen">
  <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden">
    <thead className="bg-gray-200 bg-gray-50 dark:bg-gray-700">
      <tr>
        <th className="py-3 px-4 text-left">DATE</th>
        <th className="py-3 px-4 text-left">CATEGORY</th>
        <th className="py-3 px-4 text-left">AMOUNT</th>
        <th className="py-3 px-4 text-center">TRANSACTION TYPE</th>
      </tr>
    </thead>
    <tbody className="text-gray-700">
      {transactions.map((transaction, index) => (
        <tr key={index} className="hover:bg-gray-100 transition-all  border-b  border-gray-300">
          <td className="py-3 px-4 font-medium">{moment(transaction.createdAt * 1000).format('DD MMM')}</td>
          <td className="py-3 px-4 ">{transaction.description}</td>
          
          <td className='py-3 px-4'>
            ${transaction.transactionAmount}
          </td>
          <td className={`py-3 px-4 text-center ${transaction.transactionType === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
            {_.capitalize(transaction.transactionType)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
