import { useState } from "react";
import { useAddTransaction } from "../hooks/useAddTransaction"

export default function Dashboard(){
    const { addTransaction } = useAddTransaction();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };
    return(
        <>
       <div className="expense-tracker">
        <div className="container">
          <h1>Expense Tracker</h1>
          <div className="balance">
            <h3> Your Balance</h3>
           <h2>$0.00</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4> Income</h4>
              <p>$0.00</p>
            </div>
            <div className="expenses">
              <h4> Expenses</h4>
              <p>$0.00</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
              
            />
            <div>
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}

              
            />
            <label htmlFor="expense"> Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income"> Income</label>
            </div>

            <button className="bg-transparent hover:bg-purple-600 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-600 hover:border-transparent rounded" type="submit"> Add Transaction</button>
          </form>
        </div>
        </div>

        <div className="transactions">
            <h3>Transactions</h3>

        </div>
    
            
        </>
    )
}