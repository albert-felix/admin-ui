import React, {useEffect} from 'react'
import {Button} from 'react-bootstrap'

const Pagination = (props) => {

    useEffect(() => {
        if(props.isLoaded){
            const disableButton = () => {
                if(props.currentPage <= props.pages){
                    const currentPageButton = document.getElementById(`page${props.currentPage}`)
                    currentPageButton.disabled = true
                }
                const nextPage = document.getElementById('nextpage')
                const lastPage = document.getElementById('lastpage')
                const prevPage = document.getElementById('prevpage')
                const firstPage = document.getElementById('firstpage')
                if(props.pages <= 1){
                    nextPage.disabled = true
                    lastPage.disabled = true
                    prevPage.disabled = true
                    firstPage.disabled = true
                }
                else if(parseInt(props.currentPage,10) === props.pages){
                    nextPage.disabled = true
                    lastPage.disabled = true
                    prevPage.disabled = false
                    firstPage.disabled = false
                }
                else if(parseInt(props.currentPage,10) === 1){
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
        props.setPageStartIndex((props.currentPage-1)*props.pageLimit)
    }, [props])

    return(
        <div className="pagination">
            <Button variant="danger" size="sm" onClick={props.deleteSelected}>Delete Selected</Button>
            <Button onClick={()=>props.changePage(1)} id="firstpage" variant="success" size="sm">&lt;&lt;</Button>
            <Button onClick={()=>props.changePage(parseInt(props.currentPage,10)-1)} id="prevpage" variant="success" size="sm">&lt;</Button>
                {[...Array(props.pages)].map((x,i) => {
                    return(
                        <Button onClick={(e)=>props.changePage(e.target.value)} value={i+1} id={`page${i+1}`} key={i+1} variant="success" size="sm">{i+1}</Button>
                    )
                })}
            <Button onClick={()=>props.changePage(parseInt(props.currentPage,10)+1)} id="nextpage" variant="success" size="sm">&gt;</Button>
            <Button onClick={()=>props.changePage(props.pages)} id="lastpage" variant="success" size="sm">&gt;&gt;</Button>
        </div>
    )
}

export default Pagination