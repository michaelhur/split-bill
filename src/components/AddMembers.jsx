import React, {useState} from 'react';
import {InputTags} from 'react-bootstrap-tagsinput';
import {CenteredOverlayForm} from './Shared/CenteredOverlayForm';
import {useSetRecoilState,} from 'recoil';
import {groupMembersState} from '../state/groupMembers';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {ROUTE_UTILS} from '../routes';
import {API} from 'aws-amplify';
import {useGroupData} from '../hooks/useGroupData';

export const AddMembers = () => {
    const { groupName, groupId, groupMembers} = useGroupData()

    const navigate = useNavigate()
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [validated, setValidated] = useState(false);
    const setGroupMembers = useSetRecoilState(groupMembersState)

    const title = `${groupName} 그룹의 속한 사람들의 이름을 모두 적어주세요!`
    const isError = formSubmitted && groupMembers.length === 0

    const saveGroupMembers = () => {
        API.put('groupsApi', `/groups/${groupId}/members`, {
            body: {
                members: groupMembers
            }
        })
            .then((response) => {
                navigate(ROUTE_UTILS.EXPENSE_MAIN(groupId))
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)
        setValidated(true)
        if (groupMembers.length > 0) {
            saveGroupMembers()
        }
    }

    return (
        <CenteredOverlayForm
            title={title}
            validated={validated}
            handleSubmit={handleSubmit}>
            <InputTags
                id="input-member-names"
                placeholder="이름 간 띄어쓰기"
                values={groupMembers}
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
