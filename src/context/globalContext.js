import { createContext, useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const addIncome = async(income) => {
        const response = await axios.post(`${BASE_URL}addIncome`, income)
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
        const response =  await axios.delete(`${BASE_URL}deleteIncome/${id}`);
        getIncome();
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncome,
            deleteIncome,
            incomes,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}