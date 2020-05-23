import React, {
  useState
} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovaSerie = () => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios.post('/api/genres', { name })
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return <Redirect to='/generos' />
  }

  return (
    <div className='container'>
      <h1>Novo Genero</h1>
      <form>
        <div class='form-group'>
          <label for='name'>Nome</label>
          <input autoFocus type='text' value={name} onChange={onChange} className='form-control' id='name' aria-placeholder='Nome do genêro' />
        </div>
        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
      </form>
    </div>
  )
}

export default NovaSerie