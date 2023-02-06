import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {groupMembersState} from '../state/groupMembers';
import {expensesState} from '../state/expenses';

const AddExpenseForm = () => {
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

    const addExpense = useSetRecoilState(expensesState)

    const checkFormValidity = () => {
        const descValid = desc.length > 0
        const payerValid = payer !== null
        const amountValid = amount > 0

        setIsDescValid(descValid)
        setIsPayerValid(payerValid)
        setIsAmountValid(amountValid)

        console.log(descValid, payerValid, amountValid)

        return descValid && payerValid && amountValid
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
            addExpense(prevExpenses => [
                ...prevExpenses,
                    newExpense
            ])
        }

        setIsFormValidated(true)
    }

    return (
        <>
            <Form
                noValidate
                onSubmit={handleSubmit}>
                <h3>1. 비용 추가하기</h3>
                <Form.Group>
                    <Form.Control
                        type="date"
                        name="expenseDate"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="결제한 날짜를 선택해주세요."/>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="expenseDescription"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        isValid={isDescValid}
                        isInvalid={!isDescValid && isFormValidated}
                        placeholder="비용에 대한 설명을 입력해주세요"/>
                    <Form.Control.Feedback
                        type="invalid"
                        data-valid={isDescValid}
                    >비용 내용을 입력해주셔야 합니다.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="number"
                        name="expenseAmount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        isValid={isAmountValid}
                        isInvalid={!isAmountValid && isFormValidated}
                        placeholder="비용은 얼마였나요?"/>
                    <Form.Control.Feedback
                        type="invalid"
                        data-valid={isAmountValid}
                    >금액을 입력해주셔야 합니다.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Select
                        name="expensePayer"
                        defaultValue=""
                        onChange={(e) => setPayer(e.target.value)}
                        isValid={isPayerValid}
                        isInvalid={!isPayerValid && isFormValidated}
                        placeholder="누가 결제했나요?">
                        <option disabled value="">누가 결제했나요?</option>
                        {members.map(member => {
                            <option key={member} value={member}>{member}</option>
                        })}
                        <option value="영수">영수</option>
                        <option value="영희">영희</option>
                    </Form.Select>
                    <Form.Control.Feedback
                        type="invalid"
                        data-valid={isPayerValid}
                    >결제자를 선택해주셔야 합니다.</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">추가하기</Button>
            </Form>
        </>
    );
};

export default AddExpenseForm;
