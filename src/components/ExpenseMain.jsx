import React from 'react';
import {AddExpenseForm} from './AddExpenseForm';
import {ExpenseTable} from './ExpenseTable';
import {Col, Container, Row} from 'react-bootstrap';
import styled from 'styled-components';

export const ExpenseMain = () => {
    // const groupName = useRecoilValue(groupNameState)
    const groupName = "TESTST"

    return (
        <StyledExpensesMainWrapper>
            <LeftPane xs={12} sm={6} md={5}>
                <StyledTitle>Split Bill</StyledTitle>
                <AddExpenseForm />
                {/* TODO: 정산 결과 폼 렌더링 */}
            </LeftPane>
            <RightPane>
                <StyledGroupName>{groupName}</StyledGroupName>
                <ExpenseTable />
            </RightPane>
        </StyledExpensesMainWrapper>
);
};

const StyledExpensesMainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;

  background: #E5E3E6;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const LeftPane = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 100px 60px;
  gap: 75px;
  
  align-content: stretch;
`

const RightPane = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 100px 30px;
  gap: 75px;
`

const StyledTitle = styled.h1`
  font-weight: 700;
  font-size: 48px;
  line-height: 1;

  letter-spacing: 0.25px;

  color: #8C68CD;
  text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.3);
`

const StyledGroupName = styled.h1`
  font-size: 48px;
  line-height: 1;

  letter-spacing: 0.25px;
  color: #212121;
`
