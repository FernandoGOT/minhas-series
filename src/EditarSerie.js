import axios from 'axios'
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const EditarSerie = () => {
  const [name, setName] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const { id } = useParams()

  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios
      .put(`/api/series/${id}`, {
        name
      })
      .then(() => {
        setSuccess(true)
      })
  }

  React.useEffect(() => {
    axios.get(`/api/series/${id}`).then(res => {
      setName(res.data.name)
    })
  }, [id])

  if (success) {
    return <Navigate to='/series' />
  }

  return (
    <div className='container'>
      <h1>Editar Série</h1>
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

export default EditarSerie

