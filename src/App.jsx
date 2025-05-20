import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(()=> {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handleAddUser = e => {
    e.preventDefault()
    const name = e.target.name.value;
    const email = e.target.email.value;
    
    const user = {name, email}
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newUsers = [...users, data]
      setUsers(newUsers)
      e.target.reset()
    })
  }

  return (
    <>
      <h1>User management server</h1>
      <h2>Users: {users.length}</h2>

      <form onSubmit={handleAddUser}>
        <input name='name' type="text" placeholder='name'/>
        <br />
        <input type="email" name="email" id="" placeholder='email'/>
        <br />
        <input type="submit" value="Submit" />
      </form>

      <div>
        {
          users.map(user => <div key={user.id} style={{border:'2px solid yellow', margin:'6px'}}>
          <p>{user.id}</p>
          <h4>{user.name}</h4>
          <p>{user.email}</p>
          </div>)
        }
      </div>
    </>
  )
}

export default App
