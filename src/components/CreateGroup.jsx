import {CenteredOverlayForm} from './Shared/CenteredOverlayForm';
import {Form} from 'react-bootstrap';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {groupNameState} from '../state/groupName';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../routes';
import {API} from 'aws-amplify';
import {groupIdState} from '../state/groupId';

export const CreateGroup = () => {
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [groupName, setGroupName] = useRecoilState(groupNameState)
    const setGroupId = useSetRecoilState(groupIdState)

    const saveGroupName = () => {
        API.post('groupsApi', '/groups', {
            body: {
                groupName: groupName,
            }
        })
            .then(({data}) => {
                const {guid} = data;
                setGroupId(guid)
                navigate(ROUTES.ADD_MEMBERS)
            })
            .catch(error => {
                console.log("error", error.response)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.currentTarget
        if (form.checkValidity()) {
            event.stopPropagation()
            saveGroupName()
        }

        setValidated(true)
    }

    return (
        <CenteredOverlayForm
            title={"먼저, 더치 페이 할 그룹의 이름을 정해볼까요?"}
            validated={validated}
            handleSubmit={handleSubmit}>
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
        </CenteredOverlayForm>
    );
};
