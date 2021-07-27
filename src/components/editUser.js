import React , {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const EditUser = (props) => {


    const userId = props.user.id
    const [userName, setUserName] = useState(props.user.name)
    const [userEmail, setUserEmail] = useState(props.user.email)
    const [userRole, setUserRole] = useState(props.user.role)

    const onNameChange = e => setUserName(e.target.value)
    const onEmailChange = e => setUserEmail(e.target.value)
    const onRoleChange = e => setUserRole(e.target.value)

    const updateData = () => {
        const data ={
            "id": userId,
            "name": userName,
            "email": userEmail,
            "role": userRole
        }
        props.updateUser(data)
    }

    return(
        <div className="container editUser">
            <Form>

            <Form.Group className="mb-3" controlId="userId">
                <Form.Label>ID</Form.Label>
                <Form.Control size="sm" readOnly type="text" value={userId} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userName">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={onNameChange} size="sm" type="text" value={userName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={onEmailChange} size="sm" type="email" value={userEmail} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userRole">
                <Form.Label>Role</Form.Label>
                <Form.Control onChange={onRoleChange} size="sm" type="text" value={userRole} />
            </Form.Group>

            <Button onClick={updateData} className="updateButton" variant="primary" size="sm">
                Update
            </Button>
            <Button onClick={props.cancelEditing} variant="danger" size="sm">
                Cancel
            </Button>
            </Form>
        </div>
    )
}

export default EditUser