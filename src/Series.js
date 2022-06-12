import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {
  const [data, setData] = React.useState([])

  const getData = () => {
    console.log('getData')
    axios.get('/api/series').then(res => {
      setData(res.data.data)
    })
  }

  React.useEffect(() => {
    getData()
  }, [])

  const deleteSerie = id => {
    axios.delete(`/api/series/${id}`).then(res => {
      getData()
    })
  }

  const RendrizaLinha = ({ record }) => {
    return (
      <tr>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>
            Remover
          </button>
          <Link className='btn btn-info' to={`/series/${record.id}`}>
            Info
          </Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Séries</h1>
        <Link className='btn btn-primary' to='/series/novo'>
          Nova Série
        </Link>
        <div class='alert alert-warning' role='alert'>
          Você não possui séries cadastrados.
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Séries</h1>
      <Link className='btn btn-primary' to='/series/novo'>
        Nova Série
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

export default Series

