import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../app/user/UserSlice.js';
// import { Link } from 'react-router-dom';
import { usePostSpaceMutation } from '../app/space/api.js';

const CreateSpace = () => {
  const userLogged = useSelector(selectUser);
  const uid = userLogged.user.uid;
  console.log(uid)

  const [space, setSpace] = useState({
    uid,
    name: '',
    description: '',
    phone: '',
    emailSpace: '', 
    images: [],
  });
  
  const [postSpace] = usePostSpaceMutation();

  const handleChange = (e) => {
    const { name, type, files } = e.target;
  
    console.log(files); 

    if (type === 'file') {
        setSpace({
          ...space,
          [name]: files,
        });
    } else {
      setSpace({
        ...space,
        [name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('uid', space.uid);
    formData.append('name', space.name);
    formData.append('description', space.description);
    formData.append('phone', space.phone);
    formData.append('emailSpace', space.emailSpace);
  
    for (let i = 0; i < space.images.length; i++) {
      formData.append('images', space.images[i]);
    }
  
    console.log(formData)
    console.log(space.images);

    try {
      const res = await postSpace(formData
      //   {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // }
      );
      console.log('Espacio creado:', res.space);
      setSpace({
        name: '',
        description: '',
        phone: '',
        emailSpace: '',
        images: [],
      });
    } catch (error) {
      console.error('Error al crear el espacio:', error);
    }
  };

  
  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-lg" encType="multipart/form-data">
        <h2 className="text-2xl font-bold mb-4 text-center">Create tu Space</h2>
        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="name"
            name="name"
            value={space.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            id="description"
            name="description"
            value={space.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="tel"
            id="phone"
            name="phone"
            value={space.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2" htmlFor="emailSpace">
            Email del Space
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            id="emailSpace"
            name="emailSpace"
            value={space.emailSpace}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2" htmlFor="images">
            Imágenes
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple // Permite la selección de múltiples archivos
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
      {/* <Link to={'/edit-space'}>ir a edit</Link> */}
    </div>
  );
};

export default CreateSpace;
