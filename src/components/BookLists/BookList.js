import React from "react";
import './bookList.css'
import {useGlobalContext} from '../../context'
import Loading from '../Loader/Loader'
import Book from './Book'
import coverimg from "../../Images/cover_not_found.jpeg"



function BookList(){
    const{books,loading,resultTitle}= useGlobalContext()
    const booksWithCovers = books.map((singleBook)=>{
        return {
            ...singleBook,
            id: (singleBook.id).replace('/works/',""),
            cover_img: singleBook.cover_id ?`https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` :coverimg
        }
    })

   
    
    if(loading) return <Loading/>;

    return (
        <section className='booklist'>
            <div className='container'>
                <div className='section-title'>
                    <h2>{resultTitle}</h2>
                </div>
                <div className='booklist-content grid'>
                    {
                        booksWithCovers.map((item,index)=>{
                            return (
                                <Book key={index} {...item}/>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default BookList