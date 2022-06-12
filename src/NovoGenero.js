import axios from 'axios'
import React from 'react'
import { Navigate } from 'react-router-dom'

const NovoGenero = () => {
  const [name, setName] = React.useState('')
  const [success, setSuccess] = React.useState(false)

  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios
      .post('/api/genres', {
        name
      })
      .then(rs => {
        setSuccess(true)
      })
  }

  if (success) {
    return <Navigate to='/generos' />
  }

  return (
    <div className='container'>
      <h1>Novo Genêro</h1>
      <form>
        <div class='form-group'>
          <label for='nam'>Nome</label>
          <input type='text' class='form-control' id='name' placeholder='Nome do genêro' value={name} onChange={onChange} />
        </div>
        <br />
        <button type='button' class='btn btn-primary' onClick={save}>
          Salvar
        </button>
      </form>
    </div>
  )
}

export default NovoGenero

