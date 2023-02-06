import React from 'react';
import AddExpenseForm from './AddExpenseForm';

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
            {/* TODO: 비용 리스트 컴포넌트 렌더링 */}
            </div>
        </div>
    );
};

export default ExpenseMain;
