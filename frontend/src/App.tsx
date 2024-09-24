
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import { Blogs } from './pages/Blogs'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish'


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
     <Route path='/signup' element={<Signup></Signup>}/>
     <Route path='/signin' element={<Signin></Signin>}/>
     <Route path='/blogs' element={<Blogs></Blogs>}/>
     <Route path='/blog/:id' element={<Blog></Blog>}/>
     <Route path='/publish' element={<Publish></Publish>}/>

      </Routes>
      </BrowserRouter>
        
    </>
  )
}

export default App
