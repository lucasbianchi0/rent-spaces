import { useSelector } from "react-redux";
import { selectUser } from "../app/user/UserSlice";
import { Link } from "react-router-dom";
import Spaces from "../components/Spaces";
import Categorias from "../components/Categorias";



const Home = () => {
  const userLogged = useSelector(selectUser)
  console.log(userLogged)
  return (
    <div className="container mx-auto p-4">
      <Categorias/>
      <h1 className="text-3xl font-bold mb-4">hola {userLogged.user.user}</h1>
      <Spaces/>
      <Link to={'/create-space'}>create space</Link>
    </div>
  );
};

export default Home;
