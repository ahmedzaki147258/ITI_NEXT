import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export function Dashboard() {
    const { data: session } = useSession();
    const [expenses, setExpenses] = useState<Expense[]>([]); 
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    type Expense = {
      id: string;
      title: string;
      amount: number;
      description?: string;
      date: Date;
    };
    
    const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
  
    useEffect(() => {
      const fetchExpenses = async () => {
        try {
          setIsLoading(true);
          const response = await fetch('/api/expenses');
          
          if (!response.ok) throw new Error('Failed to fetch expenses');        
          const data = await response.json();
          setExpenses(data);
        } catch (err) {
          setError('Error loading expenses. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchExpenses();
    }, []);
  
    const handleAddExpense = async () => {
      try {
        if (!title || !amount) {
          setError('Title and amount are required');
          return;
        }
        
        const expenseData = {
          title,
          amount: parseFloat(amount),
          description,
        };
        
        let response;
        
        if (currentExpense) {
          response = await fetch(`/api/expenses/${currentExpense.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData),
          });
        } else {
          response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData),
          });
        }
        
        if (!response.ok) throw new Error('Failed to save expense');      
        const savedExpense = await response.json();
  
        if (currentExpense) {
          setExpenses(expenses.map(exp => 
            exp.id === currentExpense.id ? savedExpense : exp
          ));
        } else {
          setExpenses([savedExpense, ...expenses]);
        }
        
        setShowForm(false);
        setTitle("");
        setAmount("");
        setDescription("");
        setCurrentExpense(null);
        setError(null);
      } catch (err) {
        setError('Error saving expense. Please try again.');
      }
    };
  
    const handleEditExpense = (expense: Expense) => {
      setCurrentExpense(expense);
      setTitle(expense.title);
      setAmount(expense.amount.toString());
      setDescription(expense.description || "");
      setShowForm(true);
    };
  
    const handleDeleteExpense = async (id: string) => {
      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete expense');
        }
        
        setExpenses(expenses.filter(exp => exp.id !== id));
      } catch (err) {
        setError('Error deleting expense. Please try again.');
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">ExpenseTracker</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {session?.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-xs">
                      {session?.user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
                <span className="text-gray-700">{session?.user?.name}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition-colors duration-200"
              >
                Sign out
              </button>
            </div>
          </div>
        </header>
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Expenses</h2>
            <button
              onClick={() => {
                setCurrentExpense(null);
                setTitle("");
                setAmount("");
                setDescription("");
                setShowForm(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Expense
            </button>
          </div>
  
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-medium mb-4">{currentExpense ? "Edit Expense" : "Add New Expense"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Grocery shopping"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="49.99"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Weekly groceries from Walmart"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddExpense}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  {currentExpense ? "Update" : "Save"}
                </button>
              </div>
            </div>
          )}
  
          {expenses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No expenses yet</h3>
              <p className="text-gray-600 mb-4">Start tracking your expenses by adding your first entry.</p>
              <button
                onClick={() => {
                  setCurrentExpense(null);
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Your First Expense
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {isLoading ? (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading expenses...</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${expense.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{expense.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleEditExpense(expense)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {error && (
                <div className="p-4 bg-red-50 border-t border-red-200">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    );
}
  