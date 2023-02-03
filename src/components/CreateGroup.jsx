import {CenteredOverlayForm} from './CenteredOverlayForm';
import {Button, Container, Form, Row} from 'react-bootstrap';
import {useRecoilState} from 'recoil';
import {groupNameState} from '../state/groupName';
import React, {useState} from 'react';
import styled from 'styled-components';

export const CreateGroup = () => {
    const [validated, setValidated] = useState(false);
    const [groupName, setGroupName] = useRecoilState(groupNameState)

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.currentTarget
        if (!form.checkValidity()) event.stopPropagation()

        setValidated(true)
    }

    return (
        <div>
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
                                        onChange={(e) => setGroupName(e.target.value)}
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
        </div>
    );
};

const StyledH2 = styled.h2`
  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
`

const StyledSubmitButton = styled(Button).attrs({type: 'submit'})`
  background: #6610F2;
  border-radius: 8px;
  border: none;
  
  &:hover {
    background: #6610F2;
    filter: brightness(80%)
  }
`
const StyledRow = styled(Row)`
  justify-content: center;
  align-items: center;
  height: 60vh;
`
