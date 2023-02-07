import React from 'react';
import {AddExpenseForm} from './AddExpenseForm';
import {ExpenseTable} from './ExpenseTable';

const ExpenseMain = () => {
    return (
        <div>
            {/* Left Pane */}
            <div>
                <AddExpenseForm />
            {/* TODO: 정산 결과 폼 렌더링 */}
            </div>
            {/* Right Pane */}
            <div>
            {/* TODO: 그룹명 헤더 렌더링 */}
                <ExpenseTable />
            </div>
        </div>
    );
};

export default ExpenseMain;
