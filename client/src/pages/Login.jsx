import { useState } from 'react';
import { useDispatch } from 'react-redux'; // Importa useDispatch y useSelector desde react-redux
import { login} from '../app/user/UserSlice.js'; // Asegúrate de importar el action creator correcto
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebaseConfig.js';
import { useNavigate } from 'react-router-dom';
// import { useGetCheckSpaceQuery } from '../app/space/api.js';
import axios from 'axios'


const auth = getAuth(app);

const Login = () => {
  const [space, setSpace] = useState({
    email: '',
    password: '',
  });

  // const  { data }  = useGetCheckSpaceQuery(uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpace({
      ...space,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los campos del formulario
    if (!space.email || !space.password) {
      console.error('Todos los campos son requeridos');
      return;
    }

    // Iniciar sesión con Firebase
    try {
      await signInWithEmailAndPassword(auth, space.email, space.password);
      console.log('Inicio de sesión exitoso');

      // Obtener el UID del usuario
      const user = auth.currentUser;      
      const uid = user.uid;

      // Después de iniciar sesión, dispara la acción para actualizar el estado de Redux
      dispatch(login({ isLoggedIn: true, email: space.email, uid }));
      const response = await axios.get('http://localhost:4000/spaces/check-space/'+ uid);
      const data = response.data;

      if (data) {
        console.log('tiene space');
        navigate('/');
      } else {
        console.log('no tiene space');
        navigate('/create-space');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }

    // Luego, puedes resetear los campos si lo deseas
    setSpace({
      email: '',
      password: '',
    });
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            id="email"
            name="email"
            value={space.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="password"
            id="password"
            name="password"
            value={space.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
