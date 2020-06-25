import React , {useState} from 'react'

const BlogForm = ({ createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

      const addBlog = (event) => {
       event.preventDefault()
       createBlog({
         title: title,
         author: author,
         likes: 0,
     })

       setTitle('')
       setAuthor('')
       setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
      <p> title: <input value={title} onChange={( event ) => setTitle(event.target.value)}/> </p>
     <p> author: <input value={author} onChange={( event ) => setAuthor(event.target.value)}/> </p>
     url: <input value={url} onChange={( event ) => setUrl(event.target.value)}/>
      <button type="submit">create</button>
     </form>
 ) 
}

export default BlogForm
