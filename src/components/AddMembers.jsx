import React, {useState} from 'react';
import {InputTags} from 'react-bootstrap-tagsinput';
import {CenteredOverlayForm, StyledH2, StyledRow, StyledSubmitButton} from './Shared/CenteredOverlayForm';
import {useRecoilState, useRecoilValue} from 'recoil';
import {groupNameState} from '../state/groupName';
import {Button, Container, Form, Row} from 'react-bootstrap';
import {groupMembersState} from '../state/groupMembers';

export const AddMembers = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const groupName = useRecoilValue(groupNameState)
    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState)

    const handleSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)
    }

    return (
        <CenteredOverlayForm>
            <Container>
                <Form
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <StyledRow>
                        <Row className="align-items-start">
                            <StyledH2>{groupName} 그룹의 속한 사람들의 이름을 모두 적어주세요!</StyledH2>
                        </Row>
                        <Row className="align-items-center">
                            <InputTags
                                id="input-member-names"
                                placeholder="이름 간 띄어쓰기"
                                onTags={(value) => {
                                    setFormSubmitted(false)
                                    setGroupMembers(value.values)
                                }}
                            />
                            {formSubmitted && groupMembers.length === 0 && <span>그룹 멤버들의 이름을 입력해주세요</span>}
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
