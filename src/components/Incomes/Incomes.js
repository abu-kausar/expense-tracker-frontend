import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

const Incomes = () => {
    const {addIncome, getIncome, incomes} = useGlobalContext();

    useEffect(() => {
        getIncome()
    }, [])
    
    return (
        <IncomesStyeled>
            <InnerLayout>
                <h2>Income</h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form/>
                    </div>
                    <div className="incomes">
                        {
                            incomes.map((income)=> {
                                const {_id, title, amount, date, category, description} = income;
                                return <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    category={category}
                                    indicatorColor="var(--color-green)"
                                />
                            })
                        }
                    </div>
                </div>
            </InnerLayout>
        </IncomesStyeled>
    );
};

const IncomesStyeled = styled.div`
    display: flex;
    overflow: auto;
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1
        }
    }
`

export default Incomes;