import React, {
  useState,
  useEffect
} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({ name: ''})
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('INFO')
  const [genres, setGenres] = useState([])

  const [data, setData] = useState({})

  useEffect(() => {
    axios
    .get('/api/genres')
    .then(res => {
      setGenres(res.data.data)
    })
  }, [])

  useEffect(() => {
    axios
    .get('/api/series/' + match.params.id)
    .then(res => {
      setData(res.data)
      setForm(res.data)
    })
  }, [match.params.id])

  // custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  const save = () => {
    axios.put('/api/series/' + match.params.id, form)
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return <Redirect to='/series' />
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)'}}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-9'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                  {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                  G??nero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <button type='button' onClick={() => setMode('EDIT')} className='btn btn-primary'>Editar</button>
      </div>
      {mode === 'EDIT' && 
        <div className='container'>
          <h1>Editar S??rie</h1>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input autoFocus type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' aria-placeholder='Nome da s??rie' />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>G??nero</label>
              <select className='form-control' onChange={onChange('genre_id')} value={form.genre_id}>
                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Coment??rios</label>
              <input type='text' value={form.comments || ''} onChange={onChange('comments')} className='form-control' id='name' aria-placeholder='Coment??rios' />
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name='status' id='assistido' value='ASSISTIDO' checked={form.status === 'ASSISTIDO'} onChange={seleciona('ASSISTIDO')} />
              <label className='form-check-label' htmlFor='assistido'>
                Assistido
              </label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIR' checked={form.status === 'PARA_ASSISTIR'} onChange={seleciona('PARA_ASSISTIR')} />
              <label className='form-check-label' htmlFor='paraAssistir'>
                Assistir
              </label>
            </div>
            <button type='button'  onClick={() => setMode('INFO')} className='btn btn-primary'>Cancelar edi????o</button>
            <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
          </form>
        </div>
      }
    </div>
  )
}

export default InfoSerie