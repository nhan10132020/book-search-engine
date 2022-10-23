import React , {useState,useContext,useEffect} from 'react'



const URLAPI = 'http://openlibrary.org/search.json?title='

const AppContext=React.createContext()
function AppProvider({children}){
    const [searchTerm,setSearchTerm] =useState("the lost world");
    const [books,setBooks]=useState([]);
    const [loading,setLoading]=useState(true)
    const [resultTitle,setResultTitle]=useState("")

    useEffect(()=>{
        const fetchBooks = async()=>{
            setLoading(true)
            try{
                const response =await fetch(`${URLAPI}${searchTerm}`)
                const data = await response.json();
                const {docs} =data;
                
                if(docs){
                    const newBooks = docs.slice(0,20).map((singleBook)=>{
                        const {key, author_name,cover_i,edition_count,first_publish_year,title} = singleBook;
                        return {
                            id:key,
                            author:author_name,
                            cover_id : cover_i,
                            edition_count: edition_count,
                            title,
                            first_publish_year
                        }
                    })
                    setBooks(newBooks)
                    if(newBooks.length>1){
                        setResultTitle("Your Search Result")
                    }else{
                        setResultTitle("No result found !")
                    }
                }else{
                    setBooks([])
                    setResultTitle("No result found !")
                }
                setLoading(false);
            }
            catch(error){
                console.log(error)
                setLoading(false)
            }
        }

        fetchBooks();
    },[searchTerm])


    return(
        <AppContext.Provider value={{loading,books,setSearchTerm,resultTitle,setResultTitle}}>
            {children}
        </AppContext.Provider>       
    )
}


export const useGlobalContext = ()=>{
    return useContext(AppContext)
}


export {AppContext,AppProvider}