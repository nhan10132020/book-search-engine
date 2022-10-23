import React from 'react'
import LoaderImg from '../../Images/loader.svg'
import './loader.css'


function Loader(){
    return (
        <div className='loader flex flex-c'>
            <img src={LoaderImg} alt="loader"/>
        </div>
    )
}

export default Loader;