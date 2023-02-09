import React from 'react';
import {useRecoilValue} from 'recoil';
import {expensesState} from '../state/expenses';
import {groupMembersState} from '../state/groupMembers';

export const calculateMinimumTransaction = (expenses, members, amountPerPerson) => {
    const minTransactions = []

    if (amountPerPerson === 0) return minTransactions

    // 1. 멤버별로 냈어야 하는 금액
    const membersToPay = {}
    members.forEach(member => {
        membersToPay[member] = amountPerPerson
    })

    // 2. 멤버별로 냈어야 하는 금액 업데이트
    expenses.forEach(({payer, amount}) => {
        membersToPay[payer] -= amount
    })

    // 3. amount별로 오름차순으로 sorting된 리스트 만들기
    const sortedMembersToPay = Object.keys(membersToPay)
        .map(member => ({
            member: member,
            amount: membersToPay[member],
        }))
        .sort((a,b) => a.amount - b.amount)

    // 4.
    let left = 0
    let right = sortedMembersToPay.length - 1

    while(left < right) {
        while (left < right && sortedMembersToPay[left].amount === 0) {
            left++
        }
        while (left < right && sortedMembersToPay[right].amount === 0) {
            right--
        }

        const toReceive = sortedMembersToPay[left]
        const toSend = sortedMembersToPay[right]

        const amountToReceive = Math.abs(toReceive.amount)
        const amountToSend = Math.abs(toSend.amount)

        if (amountToSend > amountToReceive) {
            minTransactions.push({
                receiver: toReceive.member,
                sender: toSend.member,
                amount: amountToReceive,
            })
            toReceive.amount = 0
            toSend.amount -= amountToReceive
            left++
        } else if (amountToSend < amountToReceive) {
            minTransactions.push({
                receiver: toReceive.member,
                sender: toSend.member,
                amount: amountToSend,
            })
            toReceive.amount += amountToSend
            toSend.amount = 0
            right--
        } else if (amountToSend === amountToReceive) {
            minTransactions.push({
                receiver: toReceive.member,
                sender: toSend.member,
                amount: amountToReceive,
            })
            toReceive.amount = 0
            toSend.amount = 0
            left++
            right--
        }
    }

    return minTransactions
}


export const SettlementSummary = () => {
    const expenses = useRecoilValue(expensesState)
    // const members = useRecoilValue(groupMembersState)
    const members = ["A","B","C","D"]

    const totalMembersCount = members.length
    const totalExpenseAmount = expenses.reduce((prevAmount, currentExpense) => parseInt(prevAmount) + parseInt(currentExpense.amount), 0)
    const splitAmount = totalMembersCount > 0 ? totalExpenseAmount/totalMembersCount : 0;

    const minimumTransaction = calculateMinimumTransaction(expenses, members, splitAmount)

    return (
        <>
            <div>
                <h3>3. 정산은 이렇게!</h3>
                {totalExpenseAmount > 0 && totalMembersCount > 0
                    ? (
                        <>
                            <span>{totalMembersCount} 명이 총 {totalExpenseAmount}원 지출</span>
                            <span>한 사람당 {splitAmount}원</span>
                            <ul>
                                {minimumTransaction.map(({sender, receiver, amount}, index) => {
                                    return(
                                        <li key={`transaction-${index}`}>
                                            <span>{sender}가 {receiver}에게 {amount}원 보내기</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
                    )
                    : ''}
            </div>
        </>
    );
};

