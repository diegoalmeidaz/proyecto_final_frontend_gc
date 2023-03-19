import { useState } from 'react'
import { onRegistration } from '../core/api_users'


const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    username: '',
    name: '',
    lastname: '',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({ email: '', password: '', username: '', name: '', lastname: '' })
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }

  return (
    <div
    className="flex justify-center items-center h-screen"
    style={{
      backgroundImage:
        'url("https://media.glamourmagazine.co.uk/photos/63ea4c67eeb41169a4f2de05/master/pass/WEDDING%20GUEST%20130223%20main.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      opacity: 0.8,
    }}
    >

    <div className="bg-white p-6 rounded-md shadow-md">
      <form onSubmit={(e) => onSubmit(e)} className='w-full max-w-md px-4'>
        <h1 className='text-2xl font-bold mb-4'>Register</h1>

        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
            Correo Electrónico
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            name='email'
            value={values.email}
            placeholder='test@gmail.com'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='username' className='block text-gray-700 font-bold mb-2'>
            Username
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='string'
            className='form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            name='username'
            value={values.username}
            placeholder='GuapaCarlota'
            required
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>
            Contraseña
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
              value={values.password}
              className='form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              name='password'
              placeholder='contraseña'
              required
            />
          </div>

          <div className='mb-6'>
          <label htmlFor='Name' className='block text-gray-700 font-bold mb-2'>
            Nombre
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='string'
              value={values.name}
              className='form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              name='name'
              placeholder='Carlota'
              required
            />
          </div>

          <div className='mb-6'>
          <label htmlFor='Lastname' className='block text-gray-700 font-bold mb-2'>
            Apellido
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='string'
              value={values.lastname}
              className='form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='lastname'
              name='lastname'
              placeholder='Guapa'
              required
            />
          </div>

          <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
          <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

          <div className='flex flex-col items-center'>
            <button type='submit' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Submit
            </button>
            <p className='mt-4'>
            ¿Ya tienes cuenta?{' '}
            <a href='/login' className='text-blue-600 hover:underline'>
                Inicia sesión
              </a>
            </p>
          </div>
        </form>
        </div>
      </div>
      
    
  )
}

export default Register
