import {CenteredOverlayForm, StyledH2, StyledRow, StyledSubmitButton} from './Shared/CenteredOverlayForm';
import {Button, Container, Form, Row} from 'react-bootstrap';
import {useSetRecoilState} from 'recoil';
import {groupNameState} from '../state/groupName';
import React, {useState} from 'react';

export const CreateGroup = () => {
    const [validated, setValidated] = useState(false);
    const setGroupName = useSetRecoilState(groupNameState)

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.currentTarget
        if (!form.checkValidity()) event.stopPropagation()

        setValidated(true)
    }

    return (
        <CenteredOverlayForm>
            <Container>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}>
                    <StyledRow>
                        <Row className="align-items-start">
                            <StyledH2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</StyledH2>
                        </Row>
                        <Row className="align-items-center">
                            <Form.Group controlId="validationGroupName">
                                <Form.Control
                                    type="text"
                                    placeholder="ex) 2022 제주도 여행"
                                    onChange={(e) => {
                                        setGroupName(e.target.value)
                                    }}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    그룹 이름을 입력해주세요!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="align-items-end">
                            <StyledSubmitButton type="submit">
                                저장
                            </StyledSubmitButton>
                        </Row>
                    </StyledRow>
                </Form>
            </Container>
        </CenteredOverlayForm>
    );
};
