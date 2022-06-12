import axios from 'axios'
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Badge, FormGroup, Label, Input } from 'reactstrap'

const InfoSerie = () => {
  const [form, setForm] = React.useState({})
  const [genres, setGenres] = React.useState([])
  // const [success, setSuccess] = React.useState(false)
  const [mode, setMode] = React.useState('INFO')
  const [data, setData] = React.useState({})
  const { id } = useParams()

  React.useEffect(() => {
    axios.get(`/api/series/${id}`).then(res => {
      setData(res.data)
      setForm(res.data)
    })

    axios.get(`/api/genres`).then(res => {
      setGenres(res.data.data)
    })
  }, [id])

  const onChange = fieldName => evt => {
    setForm({
      ...form,
      [fieldName]: evt.target.value
    })
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  const save = () => {
    axios.put(`/api/series/${id}`, form).then(res => {
      // setSuccess(true)
    })
  }

  const masterHeader = {
    height: '50vh',
    minHight: '500px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repat',
    backgroundPosition: 'center',
    backgroundImage: `url('${data.background}')`
  }

  const currentGenre = genres.find(genre => parseInt(genre.id, 10) === data.genre_id)

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 d-flex align-items-center'>
              <div className='col-3'>
                <img src={data.poster} alt={data.name} className='img-fluid img-thumbnail' />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                  {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                  <div>
                    <h3>Genêro: {currentGenre?.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <button className='btn btn-primary' onClick={() => setMode('EDIT')}>
          Editar
        </button>
      </div>
      {mode === 'EDIT' && (
        <div className='container'>
          <h1>Nova Série</h1>
          <button className='btn btn-primary' onClick={() => setMode('INFO')}>
            Cancelar edição
          </button>
          <form>
            <div className='form-group'>
              <label htmlFor='nam'>Nome</label>
              <input
                type='text'
                className='form-control'
                id='name'
                placeholder='Nome da série'
                value={form.name}
                onChange={onChange('name')}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='nam'>Cometários</label>
              <input
                type='text'
                className='form-control'
                id='commets'
                placeholder='Cometários'
                value={form.comments}
                onChange={onChange('comments')}
              />
            </div>
            <FormGroup>
              <Label htmlFor='exampleSelect'>Genêro</Label>
              <Input id='exampleSelect' name='genre' type='select' onChange={onChange('genre_id')} value={form.genre_id}>
                <option value={0}>Selecione</option>
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <div class='custom-control custom-radio'>
              <input
                type='radio'
                name='status'
                id='assistido'
                value='ASSISTIDO'
                class='custom-control-input'
                onClick={seleciona('ASSISTIDO')}
                checked={form.status === 'ASSISTIDO'}
              />
              <label class='custom-control-label' htmlFor='assistido'>
                Assistido
              </label>
            </div>
            <div class='custom-control custom-radio'>
              <input
                type='radio'
                name='status'
                id='paraAssistir'
                value='PARA_ASSISTIR'
                class='custom-control-input'
                onClick={seleciona('PARA_ASSISTIR')}
                checked={form.status === 'PARA_ASSISTIR'}
              />
              <label class='custom-control-label' htmlFor='paraAssistir'>
                Para assistir
              </label>
            </div>
            <br />
            <button type='button' className='btn btn-primary' onClick={save}>
              Salvar
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default InfoSerie

