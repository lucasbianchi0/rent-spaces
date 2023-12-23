import { useGetSpacesByIdQuery } from '../app/space/api.js'; // Asegúrate de importar correctamente la ruta
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SpaceDetail = () => {
  const { uid } = useParams(); // Obtén el uid de la URL
  console.log(uid)
  const { data: space, isSuccess } = useGetSpacesByIdQuery(uid); // Obtenemos el espacio usando Redux Toolkit


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, 
  };
  console.log(space)
  if (!isSuccess) {
    return <div>Cargando...</div>;
  }
  
  return (

    <div className="lg:w-[1300px] lg:mx-auto lg:p-4  ">
      <div className="grid grid-cols-1  md:grid-cols-12 gap-4">
        <div className='col-span-7'>
          <Slider {...settings}>
            {space.images.map((image, imgIndex) => (
              <div key={imgIndex} className=" shadow rounded">
                <img src={`http://localhost:4000/${image}`} alt="Espacio Seleccionado" className="w-full h-[300px] lg:h-[700px] object-cover" />
              </div>
            ))}
          </Slider>
        </div>
        <div className="bg-white p-4 col-span-5 flex flex-col justify-between ">
          <div className='lg:overflow-y-auto lg:max-h-[600px] mb-28 lg:mb-0'>
            <h2 className="text-xl lg:text-[26px] font-bold mb-2 ">{space.name}</h2>
            <p className="text-gray-700 mb-2 lg:text-[18px]">{space.description}</p>
            <p className="text-green-600 font-bold lg:text-[18px]">${space.price} por día</p>
          </div>
          <div className='py-3 bg-white border-t-2 fixed left-0 bottom-0 lg:static w-full'>
            <button type="button" className="w-full    text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Contactarme</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
