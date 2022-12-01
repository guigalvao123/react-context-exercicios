import CardUser from "./components/CardUser";
import { ChakraBaseProvider } from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "./constants/url";
import { useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";

function App() {

    useEffect(() => {
    baseUsuarios()
  }, [])


  const [usuarios, setUsuarios] = useState([])
  const [clickId, setClickId] = useState("")


  const changeCard = (userId) => {
    const findClickedCard = usuarios.find((user) => {
      return user.id === userId
    })
    setClickId(findClickedCard)
  }

  const baseUsuarios = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          authorization: `guilherme-padua-ammalb`
        }
      }
      );
      setUsuarios(response.data)
      console.log("Base encontrada.")
    } catch (error) {
      console.log("Erro ao encontrar a lista de usuarios")
      console.log(error.response)
    }
  }

  const context ={
    usuarios,
    clickId,
    changeCard,
  }

  return (
    <GlobalContext.Provider value={context}>
    <ChakraBaseProvider>
      {usuarios
        .map((users, index) => {
          return <CardUser 
          key={index}
          id={users.id}
          changeCard={changeCard}
          clickId={clickId}
          name={users.name}
          />
        })
      }
    </ChakraBaseProvider>
    </GlobalContext.Provider>
  );
}

export default App;
