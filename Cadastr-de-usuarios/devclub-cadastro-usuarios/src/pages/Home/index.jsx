import { useEffect,useState,useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  const[user, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  
  async function getUsers(){
    const usersFromApi = await api.get('/Usuarios')
    setUsers (usersFromApi.data)
  }

  async function deleteUsers(id){
    await api.delete(`/Usuarios/${id}`)
    getUsers();
  }

  async function createUsers(){
    await api.post('/Usuarios',{
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    
  }

  useEffect(() => {
    getUsers()  
  },[])  


  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuarios</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName}/>
        <input placeholder='Idade' name='idade' type='number' ref={inputAge}/>
        <input placeholder="E-mail" name='email' type='email' ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {user.map((user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade:<span>{user.age}</span></p>
            <p>Email:<span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash}/>
          </button>
        </div>
      )))}
    </div>
  )
}

export default Home
