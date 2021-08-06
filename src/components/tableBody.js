import React, {Fragment} from 'react'
import {Button} from 'react-bootstrap'

const TableBody = (props) => {
    return(
        <tbody>
                {props.currentUsers.map((user) => {
                        return(
                            <Fragment key={user.id}>
                                <tr id={`row${user.id}`}>
                                <td><input type="checkbox" id={`checkbox${user.id}`} value={user.id} onChange={props.toggleCheckBox}/></td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button className="actionButton" variant="warning" size="sm" value={user.id} onClick={props.startEditing}>Edit</Button>
                                    <Button className="actionButton" variant="danger" size="sm" value={user.id} onClick={props.deleteUser} >Delete</Button>
                                </td>
                                </tr>
                            </Fragment>
                        )
                })}
            </tbody>
    )
}

export default TableBody