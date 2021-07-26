import React, {useEffect, useState} from 'react'
import { Fragment } from 'react'
import {Table, Button} from 'react-bootstrap'

const HomePage = () => {

    const [users, setUsers] = useState([])
    const [selectedId, setSelectedId] = useState([])

    useEffect(() => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(response => response.json())
        .then((data) => {
            setUsers(data)
        })
    }, [])

    useEffect(() => {
        console.log(selectedId)
    }, [selectedId])

    const toggleCheckBox = (e) => {
        const newId = e.target.value
        if(e.target.checked){
            const idRow = document.getElementById(`row${newId}`)
            idRow.className = 'selected'
            setSelectedId([...selectedId, newId])
        }
        else{
            const idRow = document.getElementById(`row${newId}`)
            idRow.className = ''
            const removeIndex = selectedId.indexOf(newId)
            if(removeIndex > -1){
                const newArray = [...selectedId]
                newArray.splice(removeIndex, 1)
                setSelectedId(newArray) 
            }
        }
    }

    const toggleAllCheckBox = (e) => {
        const ids = []
        for (let i=1; i<=users.length; i++){
            const checkBoxId = document.getElementById(`checkbox${i}`)
            const rowId = document.getElementById(`row${i}`)
            checkBoxId.checked = e.target.checked ? true : false
            rowId.className = e.target.checked ? 'selected' : ''
            ids.push(checkBoxId.value)
        }
        e.target.checked ? setSelectedId(ids) : setSelectedId([])
    }

    return (
        <div className="container">
            <Table responsive bordered hover size="sm">
            <thead>
                <tr>
                <th><input type="checkbox" onChange={toggleAllCheckBox}/></th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                    return(
                        <Fragment key={user.id}>
                            <tr id={`row${user.id}`}>
                            <td><input type="checkbox" id={`checkbox${user.id}`} value={user.id} onChange={toggleCheckBox}/></td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button className="actionButton" variant="warning" size="sm">Edit</Button>
                                <Button className="actionButton" variant="danger" size="sm">Delete</Button>
                            </td>
                            </tr>
                        </Fragment>
                    )
                })}
            </tbody>
            </Table>
        </div>
    )
}

export default HomePage
