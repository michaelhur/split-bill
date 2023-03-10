import React, {useState} from 'react';
import {Button, Form, Row} from 'react-bootstrap';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {groupMembersState} from '../state/groupMembers';
import {expensesState} from '../state/expenses';
import styled from 'styled-components';
import {API} from 'aws-amplify';
import {groupIdState} from '../state/groupId';

export const AddExpenseForm = () => {
    const members = useRecoilValue(groupMembersState)

    const today = new Date()
    const today_str = [today.getFullYear(), `0${today.getMonth()+1}`.slice(-2), `0${today.getDate()}`.slice(-2)].join("-")

    const [date, setDate] = useState(today_str);
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState(0)
    const [payer, setPayer] = useState(null);

    const [isFormValidated, setIsFormValidated] = useState(false);
    const [isDescValid, setIsDescValid] = useState(false);
    const [isAmountValid, setIsAmountValid] = useState(false);
    const [isPayerValid, setIsPayerValid] = useState(false);

    const guid = useRecoilValue(groupIdState)
    const addExpense = useSetRecoilState(expensesState)

    const checkFormValidity = () => {
        const descValid = desc.length > 0
        const payerValid = payer !== null
        const amountValid = amount > 0

        setIsDescValid(descValid)
        setIsPayerValid(payerValid)
        setIsAmountValid(amountValid)

        return descValid && payerValid && amountValid
    }

    const saveExpense = (newExpense) => {
        API.put('groupsApi', `/groups/${guid}/expenses`, {
            body: {
                expense: newExpense
            }
        })
            .then(response => {
                addExpense(prevExpenses => [
                    ...prevExpenses,
                    newExpense
                ])
            })
            .catch()
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (checkFormValidity()) {
            const newExpense = {
                date,
                desc,
                amount,
                payer
            }
            saveExpense(newExpense)
        }

        setIsFormValidated(true)
    }

    return (
        <StyledWrapper>
            <StyledForm
                noValidate
                onSubmit={handleSubmit}>
                <StyledTitle>1. ?????? ????????????</StyledTitle>
                <StyledRow>
                    <StyledFormGroup>
                        <Form.Control
                            type="date"
                            name="expenseDate"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="????????? ????????? ??????????????????."/>
                    </StyledFormGroup>
                </StyledRow>
                <StyledRow>
                    <StyledFormGroup>
                        <Form.Control
                            type="text"
                            name="expenseDescription"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            isValid={isDescValid}
                            isInvalid={!isDescValid && isFormValidated}
                            placeholder="????????? ?????? ????????? ??????????????????"/>
                        <Form.Control.Feedback
                            type="invalid"
                            data-valid={isDescValid}
                        >?????? ????????? ?????????????????? ?????????.</Form.Control.Feedback>
                    </StyledFormGroup>
                </StyledRow>
                <StyledRow>
                    <StyledFormGroup>
                        <Form.Control
                            type="number"
                            name="expenseAmount"
                            step="0.01"
                            value={amount || ''}
                            onChange={(e) => setAmount(e.target.value || 0)}
                            isValid={isAmountValid}
                            isInvalid={!isAmountValid && isFormValidated}
                            placeholder="????????? ????????????????"/>
                        <Form.Control.Feedback
                            type="invalid"
                            data-valid={isAmountValid}
                        >????????? ?????????????????? ?????????.</Form.Control.Feedback>
                    </StyledFormGroup>
                </StyledRow>
                <StyledRow>
                    <StyledFormGroup>
                        <Form.Select
                            className="form-control"
                            name="expensePayer"
                            defaultValue=""
                            onChange={(e) => setPayer(e.target.value)}
                            isValid={isPayerValid}
                            isInvalid={!isPayerValid && isFormValidated}
                            placeholder="?????? ????????????????">
                            <option disabled value="">?????? ????????????????</option>
                            {members.length > 0
                                ? members.map(member => {
                                    return <option key={member} value={member}>{member}</option>
                                })
                                : (
                                    <>
                                    <option key="??????" value="??????">??????</option>
                                    <option key="??????" value="??????">??????</option>
                                    </>
                                )
                            }
                        </Form.Select>
                        <Form.Control.Feedback
                            type="invalid"
                            data-valid={isPayerValid}
                        >???????????? ?????????????????? ?????????.</Form.Control.Feedback>
                    </StyledFormGroup>
                </StyledRow>
                <StyledRow>
                    <StyledSubmitButton type="submit">????????????</StyledSubmitButton>
                </StyledRow>
            </StyledForm>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  padding: 50px;
  background-color: #683BA1;
  box-shadow: 3px 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  gap: 15px;

  input, select {
    font-size: 14px;

    background: #59359A;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 0;
    color: #F8F9FA;
    height: 45px;

    &:focus {
      color: #F8F9FA;
      background: #59359A;
      filter: brightness(80%);
    }

    ::placeholder {
      color: #F8F9FA;
    }
  }
`

const StyledTitle = styled.h3`
  color: #FFFBFB;
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;
  letter-spacing: 0.25px;
  margin-bottom: 15px;

  @media screen and (max-width: 600px) {
    font-size: 8vw;
  }
`

const StyledRow = styled(Row)`
  width: 100%;
`

const StyledFormGroup = styled(Form.Group)`
  padding: 0;
`

const StyledSubmitButton = styled(Button).attrs({
    type: "submit"
})`
  width: 100%;
  height: 60px;
  padding: 16px 32px;
  border: 0;
  border-radius: 8px;
  background-color: #E2D9F3;
  color: #59359A;

  &:hover, &:focus {
    background-color: #E2D9F3;
    filter: brightness(80%);
  }
`
