import React from 'react';
import {useRecoilValue} from 'recoil';
import {expensesState} from '../state/expenses';
import {Table} from 'react-bootstrap';

export const ExpenseTable = () => {
    const expenses = useRecoilValue(expensesState)

    return (
        <Table
            data-testid="expenseList"
            borderless
            hover
            responseive
        >
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>내용</th>
                    <th>결제자</th>
                    <th>금액</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map(({date, desc, payer, amount}) => {
                    return (
                        <tr>
                            <td>{date}</td>
                            <td>{desc}</td>
                            <td>{payer}</td>
                            <td>{amount}</td>
                        </tr>
                    )
                })}
            </tbody>

        </Table>
    );
};
