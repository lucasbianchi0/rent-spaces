import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from '../firebaseConfig.js';

const auth = getAuth(firebase);

const Signup = () => {
  const [space, setSpace] = useState({
    email: '',
    password: '',
  });

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

    // Crear un nuevo usuario en Firebase
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, space.email, space.password);
      const user = userCredential.user;
      console.log('Usuario creado:', user);

      // Luego de crear el usuario, puedes hacer lo que necesites con la información en tu base de datos de PostgreSQL.
    } catch (error) {
      console.error('Error al crear el usuario:', error.message);
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
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
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

export default Signup;
