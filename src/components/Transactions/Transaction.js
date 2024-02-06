// src/components/Transaction.js
import React from 'react';
import moment from 'moment';
import _ from 'lodash';

const Transaction = ({ transaction}) => (
  <tr className='hover:bg-gray-100 transition-all  border-b  border-gray-300'>
    <td className='font-medium py-2 px-2'>{moment(transaction.createdAt * 1000).format('DD MMM')}</td>
    <td>{transaction.description}</td>
    <td>${transaction.transactionAmount}</td>
    <td className={`text-center`}>{transaction.transactionType}</td>
  </tr>
);

export default Transaction;
