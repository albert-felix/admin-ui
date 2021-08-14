import React from 'react'
import CryGif from '../assets/cry.gif'

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
      }

    render(){
        if(this.state.hasError){
            return(
                <div className="container error-boundary">
                    <>
                        <h1 style={{color:'blue'}}>Sorry...!</h1>
                        <h2 style={{color:'red'}}>Something Went Wrong With AdminUI</h2>
                        <img src={CryGif} alt="cry-gif" />
                        <h2 style={{color:'green'}}>Please Reload the Page...</h2>
                    </>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary