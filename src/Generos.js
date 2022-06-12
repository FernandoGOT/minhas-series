import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Generos = () => {
  const [data, setData] = React.useState([])

  const getData = () => {
    axios.get('/api/genres').then(res => {
      setData(res.data.data)
    })
  }

  React.useEffect(() => {
    getData()
  }, [])

  const deleteGenero = id => {
    axios.delete(`/api/genres/${id}`).then(res => {
      getData()
    })
  }

  const RendrizaLinha = ({ record }) => {
    return (
      <tr>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>
            Remover
          </button>
          <Link className='btn btn-info' to={`/generos/${record.id}`}>
            Editar
          </Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Genêros</h1>
        <Link className='btn btn-primary' to='/generos/novo'>
          Novo genêro
        </Link>
        <div class='alert alert-warning' role='alert'>
          Você não possui genêros cadastrados.
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Genêros</h1>
      <Link className='btn btn-primary' to='/generos/novo'>
        Novo genêro
      </Link>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nome</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(record => (
            <RendrizaLinha record={record} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Generos

