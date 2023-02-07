import {RecoilRoot} from 'recoil';
import {ExpenseMain} from './ExpenseMain';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderComponent = () => {
    render(
        <RecoilRoot>
            <ExpenseMain />
        </RecoilRoot>
    )

    const dateInput = screen.getByPlaceholderText(/결제한 날짜/i)
    const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i)
    const amountInput = screen.getByPlaceholderText(/비용은 얼마/i)
    const payerInput = screen.getByPlaceholderText(/누가 결제/i)
    const addButton = screen.getByText('추가하기')

    const descErrorMessage = screen.queryByText('비용 내용을 입력해주셔야 합니다.')
    const payerErrorMessage = screen.queryByText('결제자를 선택해주셔야 합니다.')
    const amountErrorMessage = screen.queryByText('금액을 입력해주셔야 합니다.')

    return {
        dateInput,
        descInput,
        amountInput,
        payerInput,
        addButton,
        descErrorMessage,
        payerErrorMessage,
        amountErrorMessage
    }
}

describe('비용 정산 메인 페이지', () => {

    describe('비용 추가 컴포넌트', () => {
        test('비용 추가 컴포넌트 렌더링', async () => {
            const {dateInput, descInput, amountInput, payerInput, addButton} = renderComponent()

            expect(dateInput).toBeInTheDocument()
            expect(descInput).toBeInTheDocument()
            expect(amountInput).toBeInTheDocument()
            expect(payerInput).toBeInTheDocument()
            expect(addButton).toBeInTheDocument()
        })

        test('필수값을 입력하지 않고 "추가" 버튼 클릭시 에러 메세지 노출', async () => {
            const {addButton, descErrorMessage, payerErrorMessage, amountErrorMessage} = renderComponent()
            expect(addButton).toBeInTheDocument()

            await userEvent.click(addButton)

            expect(descErrorMessage).toHaveAttribute('data-valid','false')
            expect(payerErrorMessage).toHaveAttribute('data-valid','false')
            expect(amountErrorMessage).toHaveAttribute('data-valid','false')
        })

        test('필수값을 입력한 후 "추가" 버튼 클릭시 저장에 성공한다.', async () => {
            const {descInput, amountInput, payerInput, addButton, descErrorMessage, payerErrorMessage, amountErrorMessage} = renderComponent()

            await userEvent.type(descInput, '장보기')
            await userEvent.type(amountInput, '30000')
            await userEvent.selectOptions(payerInput, '영수')
            await userEvent.click(addButton)

            expect(descErrorMessage).toHaveAttribute('data-valid','true')
            expect(payerErrorMessage).toHaveAttribute('data-valid','true')
            expect(amountErrorMessage).toHaveAttribute('data-valid','true')
        })
    })

    describe('비용 리스트 컴포넌트', () => {
        test('비용 리스트 컴포넌트가 렌더링 되는가?', () => {
            renderComponent()
            const expenseListComponent = screen.getByTestId('expenseList')
            expect(expenseListComponent).toBeInTheDocument()
        })
    })

    describe('새로운 비용이 입력되었을때', () => {
        const addNewExpense = async () => {
            const {dateInput, descInput, payerInput, amountInput, addButton} = renderComponent()
            await userEvent.type(dateInput, '2023-01-01')
            await userEvent.type(descInput, '장보기')
            await userEvent.type(amountInput, '30000')
            await userEvent.selectOptions(payerInput, '영수')
            await userEvent.click(addButton)
        }
        test('날짜, 내용, 결제자, 금액 데이터가 정산 리슽트에 추가된다', async () => {
            await addNewExpense()
            const expenseListComponent = screen.getByTestId('expenseList')
            const dateValue = within(expenseListComponent).getByText('2023-01-01')
            expect(dateValue).toBeInTheDocument()

            const descValue = within(expenseListComponent).getByText('장보기')
            expect(descValue).toBeInTheDocument()

            const payerValue = within(expenseListComponent).getByText('영수')
            expect(payerValue).toBeInTheDocument()

            const amountValue = within(expenseListComponent).getByText('30000')
            expect(amountValue).toBeInTheDocument()
        })
    })
})
