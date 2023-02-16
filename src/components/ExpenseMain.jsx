import React from 'react';
import {AddExpenseForm} from './AddExpenseForm';
import {ExpenseTable} from './ExpenseTable';
import {Col} from 'react-bootstrap';
import styled from 'styled-components';
import {SettlementSummary} from './SettlementSummary';
import {ServiceLogo} from './Shared/ServiceLogo';
import {useGroupData} from '../hooks/useGroupData';

export const ExpenseMain = () => {
    const {groupName} = useGroupData()

    return (
        <StyledExpensesMainWrapper>
            <LeftPane xs={12} sm={6} md={5}>
                <ServiceLogo>Split Bill</ServiceLogo>
                <AddExpenseForm />
                <SettlementSummary />
            </LeftPane>
            <RightPane>
                <StyledGroupName>{groupName ? groupName : 'TEST Group'}</StyledGroupName>
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

  @media screen and (max-width: 600px) {
    padding: 32px;
  }
`

const RightPane = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 100px 30px;
  gap: 75px;
  
  @media screen and (max-width: 600px) {
    padding: 32px;
    width: 100%;
  }
`

const StyledGroupName = styled.h1`
  font-size: 48px;
  line-height: 1;

  letter-spacing: 0.25px;
  color: #212121;
`
