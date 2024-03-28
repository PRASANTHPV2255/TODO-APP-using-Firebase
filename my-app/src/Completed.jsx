import React, { useContext, useEffect, useState } from 'react'
import './Filter.css'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from './FireBase'
import { useNavigate } from 'react-router-dom'

function Completed() {

  const nav= useNavigate()
  const back=()=>{
    nav('/main')
  }

  const [allCompletedTodos, setallCompletedtodos] = useState([])

  useEffect(() => {
    const q=query(collection(db,'completed'))
    const unsubScribe = onSnapshot(q,(QuerySnapshot) =>{
      let todoArr = []
      QuerySnapshot.forEach((doc) =>{
        todoArr.push({...doc.data(), id:doc.id})
      });
      setallCompletedtodos(todoArr)
    })
    return ()=>unsubScribe()
  }, [])

  console.log(allCompletedTodos);

  return (
    <div>
      <nav class="navbar bg-body-tertiary " data-bs-theme="dark">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Completed Todos</span>
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
            allCompletedTodos?.map((e,index)=>
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

export default Completed