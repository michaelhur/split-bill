import {CenteredOverlayForm} from './Shared/CenteredOverlayForm';
import {Form} from 'react-bootstrap';
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