
import { Link } from 'react-router-dom';
import { useGetSpacesQuery } from '../app/space/api.js';

const Spaces = () => {
  // Llama al hook generado por RTK Query para obtener los espacios
  const { data: spaces, error } = useGetSpacesQuery();
    console.log(spaces)
    

  if (error) {
    return <div>Error al cargar los espacios</div>;
  }

  if (!spaces) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {spaces.map((space, index) => (
        <Link key={index}to={`space/${space.uid}`}>
            <div className="bg-white p-4 border border-zinc-200 shadow rounded">
                <img 
                src={`http://localhost:4000/${space.images[0]}`}
                // src={`/${space.images[0]}`}
                alt={`Imagen de ${space.name}`} 
                className="w-full h-32 object-cover mb-2"
                />                
                <h2 className="text-xl font-bold mb-2">{space.name}</h2>
                <p className="text-gray-700 mb-2">{space.description}</p>
                <p className="text-green-600 font-bold">${space.price} por día</p>
            </div>
        </Link>
      ))}
    </div>
  );
};

export default Spaces;
