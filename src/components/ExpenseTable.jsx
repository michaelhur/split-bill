import React from 'react';
import {useRecoilValue} from 'recoil';
import {expensesState} from '../state/expenses';
import {Table} from 'react-bootstrap';
import {OverlayWrapper} from './Shared/OverlayWrapper';
import styled from 'styled-components';

export const ExpenseTable = () => {
    const expenses = useRecoilValue(expensesState)

    return (
        <OverlayWrapper minHeight={"75vh"}>
            <StyledTable
                data-testid="expenseList"
                borderless
                hover
                responsive
            >
                <StyledTableHeader>
                    <tr>
                        <th>날짜</th>
                        <th>내용</th>
                        <th>결제자</th>
                        <th>금액</th>
                    </tr>
                </StyledTableHeader>
                <StyledTableBody>
                {expenses.map(({date, desc, payer, amount}) => {
                    return (
                        <tr key={Math.random()}>
                            <td>{date}</td>
                            <td>{desc}</td>
                            <td>{payer}</td>
                            <td>{amount}</td>
                        </tr>
                    )
                })}
                </StyledTableBody>
            </StyledTable>
        </OverlayWrapper>
    );
};

const StyledTable = styled(Table)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  margin: 0 auto;

  align-content: stretch;

  min-width: 450px;
  @media screen and (max-width: 600px) {
    min-width: 300px;
  }
`

const StyledTableHeader = styled.thead`
  color: #6B3DA6;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;

  width: 100%;
  background: rgba(250, 251, 255, 0.96);
  
  tr {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    width: 100%;
  }

  th {
    padding: 15px 8px;
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 10px;

    th {
      padding: 10px 4px;
    }
  }
`

const StyledTableBody = styled.tbody`
  width: 100%;

  tr {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
  }
  
  td {
    font-weight: 400;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    
    width: 100%;

    @media screen and (max-width: 600px) {
      font-size: 12px;
      line-height: 20px;
    }
  }
`
