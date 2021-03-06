import React, {
  useState
} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovoGenero = () => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios.post('/api/series', { name })
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return <Redirect to='/series' />
  }

  return (
    <div className='container'>
      <h1>Nova Série</h1>
      <form>
        <div class='form-group'>
          <label for='name'>Nome</label>
          <input autoFocus type='text' value={name} onChange={onChange} className='form-control' id='name' aria-placeholder='Nome da série' />
        </div>
        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
      </form>
    </div>
  )
}

export default NovoGenero