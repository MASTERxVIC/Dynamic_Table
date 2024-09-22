import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function Table () {
    const [data, setData] = useState([])
    const [id,setId] =useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [uname, usetName] = useState('')
    const [uemail, usetEmail] = useState('')
    const [editId , setEditID] = useState(-1)
    useEffect(()=>{
        axios.get('http://localhost:3000/users')
        .then(res =>setData(res.data))
        .catch(er =>console.log(er))
    })
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/users',{id: id, name: name, email: email})
        .then(res =>{
          window.location.reload();
            // setData([...data, res.data]); // Add new user to the current data
            // setId(''); // Clear the ID input field
            // setName(''); // Clear the Name input field
            // setEmail('');
        })
        .catch(er => console.log(er));
    }

        const handleEdit = (id) =>{
            axios.get('http://localhost:3000/users/'+id)
            .then(res => {
                console.log(res.data);
                usetName(res.data.name)
                usetEmail(res.data.email)})
            .catch(er =>console.log(er))
            setEditID(id)
        }

        const handleUpdate =()=>{
        axios.put('http://localhost:3000/users/'+ editId,{id: editId, name: uname, email: uemail})
        .then(res =>{console.log(res)
            window.location.reload();
            setEditID (-1);
        })
        .catch (err => console.log(err));
        }
  return (

    <div className='container'>
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter ID' onChange={e=>setId(e.target.value)}/>
                <input type="text" placeholder='Enter Name' className='diff' onChange ={e=> setName(e.target.value)} />
                <input type="text" placeholder='Enter Email' className='diff' onChange ={e=> setEmail(e.target.value)}/>
              
                <button>Add</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th className='first'>ID</th>
                    <th className='first'>Name</th>
                    <th className='first'>Email</th>
                    <th className='first'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((user,index)=>(
                        user.id === editId ?
                        <tr>
                            <td>{user.id}</td>
                            <td><input type="text" value ={uname} onChange ={e=> usetName(e.target.value)} /></td>
                            <td><input type="text" value ={uemail} onChange ={e=> usetEmail(e.target.value)} /></td>
                            <td><button onClick={handleUpdate}>Update</button></td>
                        </tr>
                        :
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={()=> handleEdit(user.id)}>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    )
                    )
                }
            </tbody>
        </table>
     
    </div>
  )
}
export default Table
