import React, { useEffect,useState } from "react";
import {useParams} from 'react-router-dom'
import Loading from '../Loader/Loader'
import coverImg from '../../Images/cover_not_found.jpeg'
import "./bookDetail.css"
import {FaArrowLeft} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
const Url = 'https://openlibrary.org/works/';

function BookDetail(){
    const {id} = useParams();
    const [loading,setLoading]=useState(false);
    const [book,setBook] = useState(null)
    const navigate=useNavigate();
    console.log(book)
    useEffect(()=>{
        setLoading(true);
        const getBookDetails = async()=>{
            setLoading(true);
            try{
                const response = await fetch(`${Url}${id}.json`);
                const data = await response.json()
                
                if(data){
                    const {description, title, covers, subject_places, subject_times, subjects} = data;
                    const newBook = {
                        description: description? description:"No description found :(",
                        title,
                        cover_img :covers?`https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`: coverImg,
                        subject_places: subject_places? subject_places.join(', '):"No subject places found :(",
                        subject_times: subject_times? subject_times.join(", "): "No subject times found :(",
                        subjects: subjects? subjects.join(", "): "No subjects found :("
                    }
                    setBook(newBook)
                }else{
                    setBook(null)
                }

                setLoading(false)
            }catch(err){
                console.log(err)
                setLoading(false);
            }
        }

        getBookDetails();
    },[id])

    if(loading) return <Loading/>

    return (
        <section className='book-details'>
          <div className='container'>
            <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
              <FaArrowLeft size = {22} />
              <span className='fs-18 fw-6'>Go Back</span>
            </button>
    
            <div className='book-details-content grid'>
              
              <div className='book-details-img'>
                <img src = {book?.cover_img} alt = "cover img" />
              </div>
              
              
              <div className='book-details-info'>
                <div className='book-details-item title'>
                  <span className='fw-6 fs-24'>{book?.title}</span>
                </div>
                <div className='book-details-item description'>
                  <span className='fw-6'>Description: </span>
                  <span >{book?.description.value}</span>
                </div>
                <div className='book-details-item'>
                  <span className='fw-6'>Places: </span>
                  <span className='text-italic'>{book?.subject_places}</span>
                </div>
                <div className='book-details-item'>
                  <span className='fw-6'>Times: </span>
                  <span className='text-italic'>{book?.subject_times}</span>
                </div>
                <div className='book-details-item'>
                  <span className='fw-6'>Subjects: </span>
                  <span>{book?.subjects}</span>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      )
    }



export default BookDetail