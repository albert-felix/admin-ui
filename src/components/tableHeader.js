import React from 'react'

const TableHeader = (props) => {
    
    return(
        <thead>
            <tr>
            <th><input id="toggleAll" type="checkbox" onChange={props.toggleAllCheckBox}/></th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
            </tr>
        </thead>
    )
}

export default TableHeader