import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // calculate income
    const addIncome = async(income) => {
        await axios.post(`${BASE_URL}addIncome`, income)
        .catch((err) => {
            setError(err.response.data.message);
        })
        getIncome();
    }

    const getIncome = async () => {
        const response = await axios.get(`${BASE_URL}getIncomes`)
        setIncomes(response.data)
    }

    const deleteIncome = async(id) => {
        await axios.delete(`${BASE_URL}deleteIncome/${id}`);
        toast.success('Income deleted successfully');
        getIncome();
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount;
        })

        return totalIncome;
    }

    // calculate expense
    const addExpense = async(expense) => {
        await axios.post(`${BASE_URL}addExpense`, expense)
        .catch((err) => {
            setError(err.response.data.message);
        })
        getExpense();
    }

    const getExpense = async () => {
        const response = await axios.get(`${BASE_URL}getExpense`)
        setExpenses(response.data)
    }

    const deleteExpense = async(id) => {
        await axios.delete(`${BASE_URL}deleteExpense/${id}`);
        toast.success('Expense deleted successfully');
        getExpense();
    }

    const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
            totalExpense += expense.amount;
        })

        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpense();
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })

        return history.slice(0, 3);
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncome,
            deleteIncome,
            totalIncome,
            incomes,
            addExpense,
            getExpense,
            deleteExpense,
            totalExpense,
            expenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}