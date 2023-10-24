import { useSelector } from "react-redux";
import { selectUser } from "../app/user/UserSlice";
import { Link } from "react-router-dom";
import Spaces from "../components/Spaces";


// const spaces = [
//   {
//     title: 'Espacio 1',
//     description: 'Descripción del Espacio 1',
//     price: 100
//   },
//   {
//     title: 'Espacio 2',
//     description: 'Descripción del Espacio 2',
//     price: 150
//   },
//   {
//     title: 'Espacio 3',
//     description: 'Descripción del Espacio 3',
//     price: 120
//   },
//   {
//     title: 'Espacio 4',
//     description: 'Descripción del Espacio 4',
//     price: 200
//   },
//   // Agrega más objetos de espacios según sea necesario
// ];

const Home = () => {
  const userLogged = useSelector(selectUser)
  console.log(userLogged)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">hola {userLogged.user.user}</h1>
      <Spaces/>
      <Link to={'/create-space'}>create space</Link>
    </div>
  );
};

export default Home;
