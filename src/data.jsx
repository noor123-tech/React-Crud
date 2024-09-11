import React, { useState, useEffect, useContext } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS if using npm
import { GlobalState } from "./App";
import Headings from "./Headings";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Data() {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(GlobalState)
  // it is rn empty;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // rn error has no value we are not printing andything
  // we will fill it with error to display

  const handledelete = (id) => {
    setUserData(userData.filter(item => item.id !== id));

  }
  // if (loading === true) // it will be true only if error occured so no need to check error
  // {
  //   return <div>LOADING.........</div>
  // }
  // if (error) // means it is not null it has some data
  // {
  //   return <div>Error: {error.message}</div>
  // }
  return (
    <>
      <Header />
      <Headings />
      {userData && userData.length > 0 && userData.map(item => (
        <>
          <ul className="dataul" key={item.id}>
            <li>{item.id}</li>
            <li>{item.name}</li>
            <li>{item.phone}</li>
            <li>{item.email}</li>
            <li>{item.username}</li>
            <li>
              <button className="first-icon" href="#" onClick={() => {
              navigate(`/form?id=${item.id}&name=${item.name}`)
            }}> {<i class="fa-solid fa-pen"></i>}</button>
              <button className="second-icon" onClick={() => handledelete(item.id)}>{<i class="fa-solid fa-user-slash"></i>}</button></li>
          </ul>
        </>
      ))}

    </>
  );
}
export default Data;
