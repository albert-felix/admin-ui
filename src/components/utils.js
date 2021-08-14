export const toggleCheckBox = (e, selectedId, setSelectedId) => {
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