

const Categorias = () => {
  const categorias = [
    { titulo: 'Categoria 1', imagen: 'https://i.blogs.es/410bab/danielle-cerullo-cqfnt66ttzm-unsplash/1366_2000.jpeg' },
    { titulo: 'Categoria 2', imagen: 'https://resizer.iproimg.com/unsafe/880x/filters:format(webp)/https://assets.iprofesional.com/assets/png/2023/04/552056.png' },
    { titulo: 'Categoria 3', imagen: 'https://hips.hearstapps.com/hmg-prod/images/vista-salon-desde-comedor-1603349975.jpg' },
    // Agrega más categorías según tus necesidades
  ];

  return (
    <div className="flex  justify-center gap-2 lg:gap-4">
      {categorias.map((categoria, index) => (
        <div key={index} className="max-w-xs  bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center justify-center">
          <img className="w-[70px] rounded-[50%] h-[50px] object-cover object-center" src={categoria.imagen} alt={categoria.titulo} />
          <div className="p-4">
            <h2 className="text-[12px] font-semibold">{categoria.titulo}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categorias;
