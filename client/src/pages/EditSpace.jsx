import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../app/user/UserSlice";
import { useGetSpacesByIdQuery } from "../app/space/api";
import axios from 'axios'

const EditSpace = () => {
  const userLogged = useSelector(selectUser);
  const uid = userLogged.user.uid;
  const { data: space } = useGetSpacesByIdQuery(uid);

  const [imagenesBorrar,setImagenesBorrar]=useState([])
  const [imagenesAgregar,setImagenesAgregar]=useState([])



  useEffect(() => {
    if (space) {
      setLocalSpace({
        uid,
        name: space.name,
        description: space.description,
        phone: space.phone,
        emailSpace: space.emailSpace, 
        images: space.images,
      });
      console.log(space.images)
    }
  }, [space, uid]);

  const [localSpace, setLocalSpace] = useState({
    uid,
    name: "",
    description: "",
    phone: "",
    emailSpace: "", 
    images: [],
  });



  const handleChange = (e) => {
    const { name, type, files } = e.target;
  
    console.log(files); 

    if (type === 'file') {
        // setLocalSpace({
        //   ...localSpace,
        //   [name]: files,
        // });
        setImagenesAgregar([...imagenesAgregar, ...files]);
    } else {
      setLocalSpace({
        ...localSpace,
        [name]: e.target.value,
      });
    }
  };

  const handleDeleteImage = (imgpath) => {
    console.log(imgpath)
    setImagenesBorrar([...imagenesBorrar,imgpath])
    const updatedImages = localSpace.images.filter((image) => image !== imgpath);
    setLocalSpace({
      ...localSpace,
      images: updatedImages,
    });
  };



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Datos del Space:', space);

  //   console.log('imagenes a borrar')
  //   console.log(imagenesBorrar)
  //   console.log('imagenes a agregar')
  //   console.log(imagenesAgregar)
  //   const datos = {uid,name: localSpace.name,description:localSpace.description,
  //     phone: localSpace.phone,emailSpace: localSpace.emailSpace, }
  //     console.log('datos a modificar')
  //   console.log(datos)


  //   // ... Resto del código de handleSubmit
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('uid', localSpace.uid);
    formData.append('name', localSpace.name);
    formData.append('description', localSpace.description);
    formData.append('phone', localSpace.phone);
    formData.append('emailSpace', localSpace.emailSpace);
  
    // Agregar las imágenes a borrar al formData
    imagenesBorrar.forEach((imagen) => {
      formData.append('images', imagen);
    });
  
    imagenesAgregar.forEach((imagen) => {
      formData.append('images', imagen);
    });
  
    try {
      const response = await axios.post('http://localhost:4000/spaces/update-space', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };
  





  // const handleDeleteImage = async (image) => {
  //   try {
  //     const res = await axios.delete('http://localhost:4000/delete-image', { data: { imgpath: image } });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error('Error al eliminar imagen:', error);
  //   }
  // };


  if (!space) {
    return (
      <div className="bg-gray-100 p-4 min-h-screen text-center">
        <p className="text-red-600 font-bold">No se encontró el espacio.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit space</h2>
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
        {localSpace.images.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {localSpace.images.map((image, index) => (
              <div key={index} className="relative">
                <button
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                  onClick={() => handleDeleteImage(image)}
                >
                  X
                </button>
                <img
                  src={`http://localhost:4000/${image}`}
                  alt={`Imagen ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}



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
            multiple
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

export default EditSpace;
