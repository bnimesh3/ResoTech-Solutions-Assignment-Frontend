import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListTaskComponent from './components/ListTaskComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskComponent from './components/TaskComponent'

function App() {

  return (
    <>
    <BrowserRouter>
       <HeaderComponent />
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path='/' element = { <ListTaskComponent />}></Route>

          {/* // http://localhost:3000/task */}
          <Route path='/task' element = { <ListTaskComponent />}></Route>

          {/* // http://localhost:3000/add-task */}
          <Route path='/add-task' element = { <TaskComponent />}></Route>

          {/* // http://localhost:3000/edit-task/1 */}
          <Route path='/edit-task/:id' element = { <TaskComponent />}></Route>

        </Routes>
       <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
