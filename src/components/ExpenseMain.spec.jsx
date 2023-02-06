import {RecoilRoot} from 'recoil';
import ExpenseMain from './ExpenseMain';
import {render, screen} from '@testing-library/react';
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
    const addButton = screen.getByText('저장')

    return {
        dateInput,
        descInput,
        amountInput,
        payerInput,
        addButton,
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
            const {addButton} = renderComponent()
            expect(addButton).toBeInTheDocument()

            await userEvent.click(addButton)

            const descErrorMessage = screen.getByText('비용 내용을 입력해주셔야 합니다.')
            expect(descErrorMessage).toBeInTheDocument()

            const payerErrorMessage = screen.getByText('결제자를 선택해주셔야 합니다.')
            expect(payerErrorMessage).toBeInTheDocument()

            const amountErrorMessage = screen.getByText('금액을 입력해주셔야 합니다.')
            expect(amountErrorMessage).toBeInTheDocument()
        })

        test('필수값을 입력한 후 "추가" 버튼 클릭시 저장에 성공한다.', async () => {
            const {descInput, amountInput, payerInput, addButton} = renderComponent()

            await userEvent.type(descInput, '장보기')
            await userEvent.type(amountInput, '30000')
            await userEvent.selectOptions(payerInput, '영수')
            await userEvent.click(addButton)

            const descErrorMessage = screen.queryByText('비용 내용을 입력해주셔야 합니다.')
            expect(descErrorMessage).not.toBeInTheDocument()

            const payerErrorMessage = screen.queryByText('결제자를 선택해주셔야 합니다.')
            expect(payerErrorMessage).not.toBeInTheDocument()

            const amountErrorMessage = screen.queryByText('금액을 입력해주셔야 합니다.')
            expect(amountErrorMessage).not.toBeInTheDocument()
        })
    })

})
