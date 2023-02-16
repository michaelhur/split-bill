import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {API} from 'aws-amplify';
import {useRecoilState} from 'recoil';
import {groupNameState} from '../state/groupName';
import {groupIdState} from '../state/groupId';
import {groupMembersState} from '../state/groupMembers';
import {expensesState} from '../state/expenses';

export const useGroupData = () => {
    const {guid} = useParams()
    const apiUrl = `/groups/${guid}`
    const [groupName, setGroupName] = useRecoilState(groupNameState)
    const [groupId, setGroupId] = useRecoilState(groupIdState)
    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState)
    const [expenses, setExpenses ]= useRecoilState(expensesState)

    const fetchAndSetGroupData = () => {
        API.get('groupsApi', apiUrl, {})
            .then(({data}) =>{
                setGroupName(data.groupName)
                setGroupId(data.guid)
                setGroupMembers(data.members)
                setExpenses(data.expenses || [])
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    useEffect(() => {
        if (guid?.length > 0) {
            fetchAndSetGroupData()
        }
    }, [apiUrl, guid])

    return {
        groupName,
        groupId,
        groupMembers,
        expenses,
    }

};

