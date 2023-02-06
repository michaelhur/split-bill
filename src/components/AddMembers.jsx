import React, {useState} from 'react';
import {InputTags} from 'react-bootstrap-tagsinput';
import {CenteredOverlayForm} from './Shared/CenteredOverlayForm';
import {useRecoilState, useRecoilValue} from 'recoil';
import {groupNameState} from '../state/groupName';
import {groupMembersState} from '../state/groupMembers';
import styled from 'styled-components';

export const AddMembers = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [validated, setValidated] = useState(false);

    const groupName = useRecoilValue(groupNameState)
    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState)

    const handleSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)
        setValidated(true)
    }

    const title = `${groupName} 그룹의 속한 사람들의 이름을 모두 적어주세요!`
    const isError = formSubmitted && groupMembers.length === 0

    return (
        <CenteredOverlayForm
            title={title}
            validated={validated}
            handleSubmit={handleSubmit}>
            <InputTags
                id="input-member-names"
                placeholder="이름 간 띄어쓰기"
                onTags={(value) => {
                    setFormSubmitted(false)
                    setGroupMembers(value.values)
                }}
            />
            <StyledErrorMessage style={{display: isError ? "block" : "none"}}>그룹 멤버들의 이름을 입력해주세요</StyledErrorMessage>
        </CenteredOverlayForm>
    );
};

const StyledErrorMessage = styled.span`
  margin-top: 0.5rem;
  color: #fd3a69;
`
