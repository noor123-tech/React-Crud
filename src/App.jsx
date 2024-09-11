import React, { createContext, useState, useEffect } from 'react'
import Data from './data.jsx';
import AddUserForm from './AddUserForm.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

export const GlobalState = createContext()

function App() {
  const [userData, setUserData] = useState([])
  const [allData, setAllData] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Data/>
    },
    {
      path: "/form",
      element: <AddUserForm/>
    }
  ])

  useEffect(() => {  // use effect is used when page is load first time it just do this
    (async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        setUserData(response.data);
        setAllData(response.data)
        // if (!response.ok) {
        //   throw new Error("THere is error cant display anything");
        // }
        // console.log(response);
        // const tempdata = await response.json(); // convert data type
       // store our data in a variable;

      }
      catch (error) {
        setError(error.message);
        // setLoading(true); // if it is true we return <div > loading </div>
      }
      finally{
        setLoading(false);
      }
    })()
  }, []);
  return (
    <GlobalState.Provider value={{ userData, setUserData, allData }}>
      <RouterProvider router={router} />
    </GlobalState.Provider>
  );
}

export default App;
