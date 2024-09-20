import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function Table () {
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res =>setData(res.data))
        .catch(er =>console.log(er))
    })
  return (

    <div className='container'>
        <div>
            <form action="">
                <input type="text" placeholder='Enter Name' />
                <input type="text" placeholder='Enter Email' className='diff'/>
              
                <button>Add</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th class='first'>ID</th>
                    <th class='first'>Name</th>
                    <th class='first'>Email</th>
                    <th class='first'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((user,index)=>(
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
     
    </div>
  )
}
export default Table
