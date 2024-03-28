import React, { createContext, useEffect, useState } from 'react'
import './MainPage.css'
import Completed from './Completed';
import icon from "../src/Images/Group.png"
import { UserAuth } from './AuthContex';
import { useNavigate } from 'react-router-dom';
// import { query } from 'express';
import { QuerySnapshot, addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { db } from './FireBase';



export const completedData=createContext();

function MainPage() {

  const nav= useNavigate()

  const [title, settitle] = useState('')
  const [discription, setdiscription] = useState('')

  const [search, setsearch] = useState('')

  const [allTodos, setallTodos] = useState([])

  const [singleData, setsingleData] = useState(null);

  //--SignOut
  const {logOut,user} = UserAuth();

  // console.log(user);
  const handleSignOut = async() =>{
    try{
      await logOut()
      await nav('/')
    } catch(error){
      console.log(error);
    }
  }

  // console.log(allTodos);

  //Create
  const createTodo = async (e) =>{
    e.preventDefault(e)
    
    if(!title || !discription){
      alert('please enter the valid todo')
      return
    }
    await addDoc(collection(db,'todos'),{
      title:title,
      description:discription,
    })
    // console.log(collection('todos'));
    settitle('')
    setdiscription('')
  }

  //Read
  useEffect(() => {
    const q=query(collection(db,'todos'))
    const unsubScribe = onSnapshot(q,(QuerySnapshot) =>{
      let todoArr = []
      QuerySnapshot.forEach((doc) =>{
        todoArr.push({...doc.data(), id:doc.id})
      });
      setallTodos(todoArr)
    })
    return ()=>unsubScribe()
  }, [])
  

  //delete
  const deleteTodo=async(id)=>{
    console.log(id);
    await getSingleDatas(id)
    await deleteDoc(doc(db,'todos',id))
  }

  //Add Delete data into deleted data collection
  const getSingleDatas=async(id)=>{
    const data=await doc(db,'todos',id)
    const getData=await getDoc(data)
    const singledata=await getData.data()
    console.log(singledata);
    
    const deltitle=singledata.title;
    const delDescription=singledata.description;

    await addDoc(collection(db,'Deleted'),{
      title:deltitle,
      description:delDescription,
    })
  }

  //Favourite

  const addToFav=async(id)=>{
    console.log(id);
    const data=await doc(db,'todos',id)
    const getData=await getDoc(data)
    const singledata=await getData.data()
    // console.log(singledata);

    const title=singledata.title;
    const Description=singledata.description;

    await addDoc(collection(db,'favourite'),{
      title:title,
      description:Description,
    })
  }

  //Completed

  const completed=async(id)=>{
    console.log(id);
    const data=await doc(db,'todos',id)
    const getData=await getDoc(data)
    const singledata=await getData.data()
    // console.log(singledata);
    await deleteComplededToto(id)
    const title=singledata.title;
    const Description=singledata.description;

    await addDoc(collection(db,'completed'),{
      title:title,
      description:Description,
    })
   
  }

  const deleteComplededToto=async(id)=>{
    console.log(id);
    await deleteDoc(doc(db,'todos',id))
  }

  //Routing
  const completedPage=()=>{
    nav('/completed')
  }
  const favouritePage=()=>{
    nav('/fav')
  }
  const deletedPage=()=>{
    nav('/deleted')
  }
 

  return (
    <div className='main-page'>
      <div className='left-side'>
        <nav className='nav-bar'>
          <img className='icon' src={icon} alt="icon" />
        </nav>
        <section className='section'>
          <div className='todoHeadin-div'>
            <p>TODO</p>
          </div>
          <div className='para'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.
          </div>
          <div className='input-section'>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingInput" value={title} placeholder="Title" onChange={(e)=>settitle(e.target.value)}/>
              <label for="floatingInput">Title</label>
            </div>
            <div class="form-floating">
              <input type="text" class="form-control" id="floatingPassword" value={discription} onChange={(e)=>setdiscription(e.target.value)} placeholder="Description"/>
              <label for="floatingPassword">Description</label>
            </div>
          </div>
          <div className='button-div'>
            <button className='todo-btn' onClick={createTodo}>Add</button>
          </div>
        </section>
      </div>
      <div className='center-sepration'>
        <div className='center-line'></div>
      </div>
      <div className='right-side'>
        <section className='right-side-section'>
          <nav className='right-section-heading' style={{width:'100%'}}>
           <p className='heading'> TODO LIST</p>
           <button type="button" class="btn btn-secondary" onClick={handleSignOut}>LogOut</button>
          </nav>
          <div className='input-and-dropDown'>
            <div>
              <input type="text" onChange={(e)=>setsearch(e.target.value)} class="form-control" id="floatingInput" placeholder="Search"
              />
            </div>
            <div class="dropdown-center">
              <button class="btn btn-secondary dropdown-toggle todo-dropDown-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Filterd by
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" onClick={completedPage}>Completed</a></li>
                <li><a class="dropdown-item" onClick={favouritePage}>Favourite</a></li>
                <li><a class="dropdown-item" onClick={deletedPage}>Deleted</a></li>
              </ul>
            </div>
          </div>
          {
            allTodos.filter((item)=>{
              return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search)
            }).map((e,index)=>
          <section key={e.id} className='todo-list'>
            <div className="single-todo">
              <div className='todos'>
                <h3>{e.title}</h3>
                <p>{e.description}</p>
              </div>
              <div className='todo-options'>

                <svg data-bs-toggle="dropdown" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical dropdown-toggle" viewBox="0 0 16 16" aria-expanded="false">
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                </svg>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" onClick={()=>completed(e.id)} >Complete</a></li>
                  <li><a class="dropdown-item" onClick={()=>addToFav(e.id)}>Favourite</a></li>
                  <li><a class="dropdown-item" onClick={()=>deleteTodo(e.id)} >Delete</a></li>
                </ul>
              </div>
            </div>
            <div className='supration'>
              <div className='todo-list-supration'></div>
            </div>
          </section>
            )
          }
        </section>
      </div>
    </div>
  )
}

export default MainPage