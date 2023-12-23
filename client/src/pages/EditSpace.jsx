import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../app/user/UserSlice";
import { useGetSpacesByIdQuery } from "../app/space/api";
import axios from 'axios'

const EditSpace = () => {
  const userLogged = useSelector(selectUser);
  const uid = userLogged.user.uid;
  const { data: space, refetch } = useGetSpacesByIdQuery(uid);
  const [imagesSelected, setImagesSelected] = useState(false);
  const [localSpace, setLocalSpace] = useState({
    uid,
    name: "",
    description: "",
    phone: "",
    emailSpace: "", 
    images: [],
  });
  const [images,setImages]=useState([{
    uid,
    files:[]
  }])

  const handleChangeImages = (e) => {
    const files = e.target.files;
    // setLocalSpace({
    //   ...localSpace,
    //   images:[...localSpace.images, ...files]
    // })
    setImages({
      ...images,
      files: files
    });
    setImagesSelected(files.length > 0);
  };
  

  const handleSubmitImages = async(e) => {
   
    e.preventDefault()
    const formData = new FormData();
    formData.append('uid', uid);
    for (let i = 0; i < images.files.length; i++) {
      formData.append('images', images.files[i]);
    }
    console.log(formData)
    console.log(images.files);
    try{
      const res =await  axios.post('http://localhost:4000/spaces/create-image',formData)
      console.log(res.data)
      setImagesSelected(false);
      document.getElementById('images').value = '';
      refetch();

    }catch(err){
      console.log(err)
    }

  }

  useEffect(() => {
    refetch()
    if (space) {
      setLocalSpace({
        uid,
        name: space.name,
        description: space.description,
        phone: space.phone,
        emailSpace: space.emailspace, 
        images: space.images,
      });
      console.log(space)
    }
  }, [space, uid, refetch]);





  const handleChange = (e) => {
    const { name
      // , type, files 
    } = e.target;
  
    // console.log(files); 

    // if (type === 'file') {
    //     setLocalSpace({
    //       ...localSpace,
    //       [name]: files,
    //     });
    //     setImagenesAgregar([...imagenesAgregar, ...files]);
    // } else {
      setLocalSpace({
        ...localSpace,
        [name]: e.target.value,
      });
    // }
  };





  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:4000/spaces/update-space', localSpace);
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };
  

  const handleDeleteImage = async (image) => {
    const updatedImages = localSpace.images.filter((imageToDelete) => imageToDelete !== image);
    setLocalSpace({
      ...localSpace,
      images: updatedImages,
    });
    try {
      const res = await axios.delete('http://localhost:4000/spaces/delete-image', { data: { imgpath: image } });
      console.log(res.data);
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
    }
  };



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
            value={localSpace.name}
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
            value={localSpace.description}
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
            value={localSpace.phone}
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
            value={localSpace.emailSpace}
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
      <h2 className="font-bold text-[22px] mt-4 mb-3">Imagenes</h2>
      <div className=" mb-5">
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
                    className="w-full h-[150px] object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>



        <div className="mb-4 max-w-md mx-auto">
          <input
            className="w-full px-3 py-2 border rounded"
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChangeImages}
            required
          />
        </div>

        {imagesSelected && (
        <button onClick={handleSubmitImages} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2">
          Crear
        </button>
      )}
    </div>
  );
};

export default EditSpace;
