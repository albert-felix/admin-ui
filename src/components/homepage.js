import React, {useEffect, useState} from 'react'
import {Table, Button} from 'react-bootstrap'
import EditUser from './editUser'
import TableBody from './tableBody'
import TableHeader from './tableHeader'

const HomePage = () => {

    const [users, setUsers] = useState([])
    const [backupUser, setBackupUser] = useState([])
    const [selectedId, setSelectedId] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(0)
    const pageLimit = 10
    const [pageStartIndex, setPageStartIndex] = useState(0)
    const [currentUsers, setCurrentUsers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [editUser, setEditUser] = useState({})
    const [isEditing, setIsEditing] = useState(false)


    useEffect(() => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(response => response.json())
        .then((data) => {
            setPages(Math.ceil(data.length/10))
            setUsers(data)
            setBackupUser(data)
            setIsLoaded(true)
        })
    }, [])


    useEffect(() => {
        if(isLoaded){
            const disableButton = () => {
                if(currentPage <= pages){
                    const currentPageButton = document.getElementById(`page${currentPage}`)
                    currentPageButton.disabled = true
                }
                const nextPage = document.getElementById('nextpage')
                const lastPage = document.getElementById('lastpage')
                const prevPage = document.getElementById('prevpage')
                const firstPage = document.getElementById('firstpage')
                if(pages <= 1){
                    nextPage.disabled = true
                    lastPage.disabled = true
                    prevPage.disabled = true
                    firstPage.disabled = true
                }
                else if(parseInt(currentPage,10) === pages){
                    nextPage.disabled = true
                    lastPage.disabled = true
                    prevPage.disabled = false
                    firstPage.disabled = false
                }
                else if(parseInt(currentPage,10) === 1){
                    prevPage.disabled = true
                    firstPage.disabled = true
                    nextPage.disabled = false
                    lastPage.disabled = false
                }
                else{
                    prevPage.disabled = false
                    firstPage.disabled = false
                    nextPage.disabled = false
                    lastPage.disabled = false
                }
            }
            disableButton()
        }
        setPageStartIndex((currentPage-1)*pageLimit)
    }, [currentPage, pages, isLoaded])

    useEffect(() => {
        setCurrentUsers(users.slice(pageStartIndex, pageStartIndex+pageLimit))
        setPages(Math.ceil(users.length/10))
    }, [pageStartIndex, users])

    useEffect(() => {
        if(currentPage > pages){
            setCurrentPage(1)
        }
    }, [pages, currentPage])

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

    const changePage = (pageNum) => {
        const currentPageButton = document.getElementById(`page${currentPage}`)
        currentPageButton.disabled = false
        setCurrentPage(pageNum)
    }

    const deleteSelected = () => {
        if(selectedId.length){
            const updatedUsers = [...users]
            selectedId.forEach(id => {
                updatedUsers.forEach((user,index) => {
                    if(id === user.id){
                        updatedUsers.splice(index,1)
                    }
                })
            })
            setSelectedId([])
            setUsers(updatedUsers)
            setBackupUser(updatedUsers)
        }
        const mainCheckBox = document.getElementById('toggleAll')
        mainCheckBox.checked = false
    }

    const startEditing = (e) => {
        const userId = e.target.value
        const userIndex = currentUsers.findIndex(user => user.id === userId)
        if(userIndex > -1){
            setEditUser(currentUsers[userIndex])
        }
        setIsEditing(true)
        setIsLoaded(false)
    }

    const updateUser = (data) => {
        const userIndex = users.findIndex(user => user.id === data.id)
        if(userIndex > -1){
            const updatedUsers = [...users]
            updatedUsers.splice(userIndex,1,data)
            setUsers(updatedUsers)
            setBackupUser(updatedUsers)
        }
        setIsEditing(false)
        setIsLoaded(true)
    }

    const cancelEditing = () => {
        setIsEditing(false)
        setIsLoaded(true)
    }

    const deleteUser = (e) => {
        const userId = e.target.value
        const userIndex = currentUsers.findIndex(user => user.id === userId)
        const updatedUsers = [...users]
        updatedUsers.splice(userIndex,1)
        setUsers(updatedUsers)
        setBackupUser(updatedUsers)
    }

    const searchUser = (e) => {
        const searchKey = e.target.value
        if(searchKey.length){
            const usersFiltered = []
            for(let i=0; i<backupUser.length; i++){
                for(let key in backupUser[i]){
                    if(backupUser[i][key].toLowerCase().indexOf(searchKey.toLowerCase()) !== -1){
                        usersFiltered.push(backupUser[i])
                        break
                    }
                }
            }
            setUsers(usersFiltered)
        }
        else{
            setUsers(backupUser)
        }
    }


    return (
        <div className="container">
            <input type="text" placeholder="Search here" onChange={searchUser} />
            {isEditing ? (<EditUser user={editUser} updateUser={updateUser} cancelEditing={cancelEditing}/>) :
            (<div>
            <Table responsive hover size="sm">
                <TableHeader toggleAllCheckBox={toggleAllCheckBox}/>
                <TableBody 
                    currentUsers={currentUsers} 
                    toggleCheckBox={toggleCheckBox} 
                    startEditing={startEditing} 
                    deleteUser={deleteUser}
                />
            </Table>
            <div className="pagination">
                <Button variant="danger" size="sm" onClick={deleteSelected}>Delete Selected</Button>
                <Button onClick={()=>changePage(1)} id="firstpage" variant="success" size="sm">&lt;&lt;</Button>
                <Button onClick={()=>changePage(parseInt(currentPage,10)-1)} id="prevpage" variant="success" size="sm">&lt;</Button>
                    {[...Array(pages)].map((x,i) => {
                        return(
                            <Button onClick={(e)=>changePage(e.target.value)} value={i+1} id={`page${i+1}`} key={i+1} variant="success" size="sm">{i+1}</Button>
                        )
                    })}
                <Button onClick={()=>changePage(parseInt(currentPage,10)+1)} id="nextpage" variant="success" size="sm">&gt;</Button>
                <Button onClick={()=>changePage(pages)} id="lastpage" variant="success" size="sm">&gt;&gt;</Button>
            </div>
            </div>)}
        </div>
    )
}

export default HomePage
