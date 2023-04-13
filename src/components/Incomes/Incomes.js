import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/globalContext';

const Incomes = () => {
    const {addIncome} = useGlobalContext();
    
    return (
        <IncomesStyeled>
            <InnerLayout>
                <h2>Income</h2>
                <div className="income-content">
                    <div className="form-container"></div>
                    <div className="incomes">

                    </div>
                </div>
            </InnerLayout>
        </IncomesStyeled>
    );
};

const IncomesStyeled = styled.div`
`

export default Incomes;