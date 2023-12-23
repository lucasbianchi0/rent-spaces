import { Link } from 'react-router-dom';
import { useGetSpacesQuery } from '../app/space/api.js';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Spaces = () => {
  const { data: spaces, error, refetch } = useGetSpacesQuery();
  console.log(spaces);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (error) {
    return <div>Error al cargar los espacios</div>;
  }

  if (!spaces) {
    return <div>Cargando...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, 
  };

  const getDescriptionPreview = (description) => {
    const lines = description.split('\n');
    const previewLines = lines.slice(0, 3);
    return previewLines.join('\n');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {spaces.map((space, index) => (
        <Link key={index} to={`space/${space.uid}`} className="zinc-200 max-w-sm lg:w-[350px] bg-white  rounded-lg ">
          <Slider {...settings}>
            {space.images.map((image, imgIndex) => (
              <div key={imgIndex}>
                <img className="w-full h-[300px] lg:h-[300px]   object-cover rounded-[15px] " src={`http://localhost:4000/${image}`} alt="" />
              </div>
            ))}
          </Slider>
          <div className="py-3">
            <h5 className="mb-2  font-bold tracking-tight text-gray-700 dark:white-700">{space.name}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">  {getDescriptionPreview(space.description)}</p>
            <div className="flex items-center justify-between">
              <span className=" font-bold text-gray-700 dark:white-700">$599</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Spaces;
