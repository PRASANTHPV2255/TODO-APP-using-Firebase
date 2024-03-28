import React, { useEffect, useState } from 'react'
import { db } from './FireBase'
import './Filter.css'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function Deleted() {
  const nav= useNavigate()
  const back=()=>{
    nav('/main')
  }

  const [allDeletedTodos, setallDeletedTodos] = useState([])

  useEffect(() => {
    const q=query(collection(db,'Deleted'))
    const unsubScribe = onSnapshot(q,(QuerySnapshot) =>{
      let todoArr = []
      QuerySnapshot.forEach((doc) =>{
        todoArr.push({...doc.data(), id:doc.id})
      });
      setallDeletedTodos(todoArr)
    })
    return ()=>unsubScribe()
  }, [])

  console.log(allDeletedTodos);

  return (
    <div>
             <nav class="navbar bg-body-tertiary " data-bs-theme="dark">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Deleted Todos</span>
          <button type="button" class="btn btn-outline-light" onClick={back}>Back To Todo</button>
        </div>
      </nav>
      <table class="table table-filter">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
        {
            allDeletedTodos?.map((e,index)=>
            <tr>
            <td scope="row">{e.title}</td>
              <td scope="row">{e.description}</td>
            </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Deleted