import React, {useEffect, useState} from 'react'
import { Fragment } from 'react'
import {Table, Button} from 'react-bootstrap'

const HomePage = () => {

    const [users, setUsers] = useState([])
    const [selectedId, setSelectedId] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(0)
    const pageLimit = 10
    const [pageStartIndex, setPageStartIndex] = useState(0)
    const [currentUsers, setCurrentUsers] = useState([])

    useEffect(() => {
        console.log('firstload')
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(response => response.json())
        .then((data) => {
            setPages(Math.ceil(data.length/10))
            setUsers(data)
        })
    }, [])

    useEffect(() => {
        console.log(selectedId)
    })

    useEffect(() => {
        setPageStartIndex((currentPage-1)*pageLimit)
        
    }, [currentPage])

    useEffect(() => {
        setCurrentUsers(users.slice(pageStartIndex, pageStartIndex+pageLimit))
    }, [pageStartIndex, users])

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
        for (let i=0; i<currentUsers.length; i++){
            const checkBoxId = document.getElementById(`checkbox${currentUsers[i].id}`)
            const rowId = document.getElementById(`row${currentUsers[i].id}`)
            checkBoxId.checked = e.target.checked ? true : false
            rowId.className = e.target.checked ? 'selected' : ''
            ids.push(checkBoxId.value)
        }
        e.target.checked ? setSelectedId(ids) : setSelectedId([])
    }

    const changePage = (e) => {
        setCurrentPage(e.target.value)
    }


    return (
        <div className="container">
            <Table responsive hover size="sm">
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
                {currentUsers.map((user,index) => {
                    // setCurrentUsers([...currentUsers,user])
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
            <div className="pagination">
                <Button variant="danger" size="sm">Delete Selected</Button>
                <Button id="firstpage" variant="success" size="sm">&lt;&lt;</Button>
                <Button id="prevpage" variant="success" size="sm">&lt;</Button>
                    {[...Array(pages)].map((x,i) => {
                        return(
                            <Button onClick={changePage} value={i+1} id={`page${i+1}`} key={i+1} variant="success" size="sm">{i+1}</Button>
                        )
                    })}
                <Button id="nextpage" variant="success" size="sm">&gt;</Button>
                <Button id="lastpage" variant="success" size="sm">&gt;&gt;</Button>
            </div>
        </div>
    )
}

export default HomePage
