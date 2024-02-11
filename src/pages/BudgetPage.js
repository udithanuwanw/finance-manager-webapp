import Layout from '../components/Layout';
import React, { useState,useEffect } from 'react';
import { useAddBudget } from '../hooks/useAddBudget';
import { useGetBudgets } from '../hooks/useGetBudgets';
import useGetSpentAmount from '../hooks/useGetSpentAmount'; // Import the new hook
import categories from '../components/Transactions/categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BudgetPage = () => {
  const { budgets,fetchBudgets } = useGetBudgets();
  const { addBudget } = useAddBudget();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const { spentAmounts } = useGetSpentAmount(); // Use the new hook to get spent amounts

  const handleAddBudget = () => {
    if (!category || !amount) return;
    addBudget({ category, amount });
    setCategory('');
    setAmount('');
  };
  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);
  

  return (
    <Layout>
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-start lg:items-center lg:justify-between">
        <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">BUDGET</h1>
          <div className="mb-4 text-gray-800">
            <div className="flex flex-col">
            <select
            className="border p-2 mb-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories
              .filter(cat => !budgets.some(budget => budget.category === cat.name) && cat.name !== 'Income') // Exclude categories already in budgets and 'Income'
              .map((cat, index) => (
                <option key={index} value={cat.name}>{cat.name}</option>
              ))}
          </select>


              {category && (
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon icon={categories.find(cat => cat.name === category).icon} className="mr-2 text-blue-500" />
                  <span>{category}</span>
                </div>
              )}
              <input
                type="number"
                placeholder="Amount"
                className="border p-2 mb-2"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={handleAddBudget}>
                Set Budget
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 px-4 lg:pl-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {budgets.map((budget) => (
              <div key={budget.id} className="border p-4">
                <h2 className="text-lg font-semibold text-gray-800">{budget.category}</h2>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Budget Amount</div>
                    <div className="text-sm font-semibold text-gray-800">${budget.transactionAmount}</div>
                  </div>
                  <div className="bg-gray-200 h-4 w-full rounded-full mb-2">

                    <div
                      className="h-full rounded-full"
                      style={{
                        width: spentAmounts[budget.category] ? `${(spentAmounts[budget.category] / budget.transactionAmount) * 100}%` : '0%',
                        backgroundColor: spentAmounts[budget.category] && spentAmounts[budget.category] > budget.transactionAmount ? 'red' : 'green', // Change color to red if budget exceeded
                        maxWidth: '100%',
                      }}
                    ></div>
                  </div>
                  {spentAmounts[budget.category] && spentAmounts[budget.category] > budget.transactionAmount && (
                    <div className="text-sm text-red-500">Exceeded by ${spentAmounts[budget.category] - budget.transactionAmount}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BudgetPage;
