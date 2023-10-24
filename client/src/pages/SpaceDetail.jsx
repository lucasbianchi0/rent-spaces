import { useGetSpacesByIdQuery } from '../app/space/api.js'; // Asegúrate de importar correctamente la ruta
import { useParams } from 'react-router-dom';

const SpaceDetail = () => {
  const { uid } = useParams(); // Obtén el uid de la URL
  console.log(uid)
  const { data: space, isSuccess } = useGetSpacesByIdQuery(uid); // Obtenemos el espacio usando Redux Toolkit

  console.log(space)
  if (!isSuccess) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Producto Seleccionado</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <img src='https://www.ole.com.ar/2023/07/07/TutqaH373_720x0__1.jpg' alt="Espacio Seleccionado" className="w-full h-auto" />
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold mb-2">{space.name}</h2>
          <p className="text-gray-700 mb-2">{space.description}</p>
          <p className="text-green-600 font-bold">${space.price} por día</p>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
