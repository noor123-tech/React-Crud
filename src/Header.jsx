import { Link } from "react-router-dom";
import { GlobalState } from "./App";
import { useEffect, useState, useContext } from "react";

function Header({ click }) {
    const { userData, setUserData, allData } = useContext(GlobalState);
    const [inputs, setInputs] = useState("")

    // useEffect( ()=>{
    //     if(userData && userData.length>0)
    //     {
    //  setOrginaldata(userData);
    //     }
    // },[userData]);
    useEffect(() => {
        if (allData && allData?.length > 0) {
            // setOrginaldata(allData);
            //    const data= userData.filter((user)=>
            //     { 
            //     user.name.toLowerCase().includes(inputs.name.toLowerCase())
            //     });

            if (inputs?.trim() == "") {
                setUserData(allData);
            }
            else {
                const data = allData.filter(user =>
                    user?.name?.toLowerCase().includes(inputs?.toLowerCase())
                );
                setUserData(data);
            }

        }
    }, [inputs, allData]);


    return (
        <div id="container">
            <div id="right">
                <input type="text" placeholder="Enter Here" name="name" value={inputs.name} onChange={(e)=>{
                    setInputs(e.target.value)
                }}></input>
            </div>
            <div id="left"><Link to="/form" onClick={click}> ADD ME </Link></div>
        </div>
    );
}
export default Header