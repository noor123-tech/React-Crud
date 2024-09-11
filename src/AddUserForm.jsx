import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { GlobalState } from './App';
function AddUserForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const { userData, setUserData } = useContext(GlobalState);
    // const [loading, setLoading] = useState(false)
    // const [tohide, setTohide] = useState(false);
    const [editId, setEditId] = useState("")
    // const [userDetail, setUserDetail] = useState()
    // const[datalocation,setDatalocation]=useState([]);
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        username: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        username: ""
    });

    useEffect(() => {
        const searchId = new URLSearchParams(location.search)
        const id = searchId.get("id")
        // const name = searchId.get('name')
        setEditId(id ?? "")
    }, [location.search])

    useEffect(() => {
        if (editId !== "" && userData?.length > 0) {
            const findUSerDetail = userData.find((item) => {
                return item.id == editId
            })
            if (findUSerDetail) {
                setValues({
                    name: findUSerDetail?.name ?? "",
                    email: findUSerDetail?.email ?? "",
                    phone: findUSerDetail?.phone ?? "",
                    username:  findUSerDetail?.username ?? ""
                })
            }
        }
    }, [editId, userData])

    const handleValue  =(e)=>{ 
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const FormValidation = () => {
        const validateWith = ["name", "email", "phone", "username"]
        let isValidate = true
        let error = errors
        if (values.name === "" || values.email === "" || values.phone === "" || values.username === "") {
            isValidate = false;
            for (const item of validateWith) {
                if (values[item] === "") {
                    error = { ...error, [item]: `${item} is required` }
                }
            }
        }
        if (userData.some(user => user.email == values.email) && values.email !== "" && editId == "") {
            isValidate = false;
            error ={ ...error, email: "User already exist" }
        }
        setErrors(error)
        return isValidate
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // setLoading(true)

        const validation = FormValidation();
        if (validation === true) {
            if(editId){
                const data = userData
                for(let i = 0; i < data.length; i++){
                    if(data[i].id == editId){
                        data[i] = {...data[i], ...values}
                   
                    }
                }
                setUserData(data)
                navigate('/')
            }else{
                setUserData([...userData, { ...values, id: userData.length - 1 }]);
                navigate('/')
                setValues({
                    name: "",
                    email: "",
                    phone: "",
                    username: ""
                })
                // setLoading(false)
            }
        }
    }

    const handleFocus = (e) => {
        setErrors({ ...errors, [e.target.name]: "" })
    }


    useEffect(() => {
        console.log(errors, "errors")
    }, [errors])

    return (
        <div id="nav-container">
            <div id="toaddshadow">
                <div id="container-inside">
                    <form>
                        <div>
                            <label><span>*</span>Name</label>
                            <input
                                type="text"
                                name='name'
                                value={values.name}
                                placeholder="Enter Name"
                                onChange={handleValue}
                                onFocus={handleFocus}
                            />
                            <p className='forname'>{errors.name}</p>
                        </div>

                        <div>
                            <label><span>*</span>Phone</label>
                            <input
                                type="text"
                                name='phone'
                                value={values.phone}
                                placeholder="Enter Phone no"
                                onChange={handleValue}
                                onFocus={handleFocus}
                            />
                            <p className='forname'>{errors.phone}</p>
                        </div>

                        <div>
                            <label><span>*</span>Email</label>
                            <input
                                type="text"
                                name='email'
                                value={values.email}
                                placeholder="Email"
                                onChange={handleValue}
                                onFocus={handleFocus}
                            />
                            <p className='forname'>{errors.email}</p>
                        </div>

                        <div>
                            <label><span>*</span>Username</label>
                            <input
                                type="text"
                                name='username'
                                value={values.username}
                                placeholder="Username"
                                onChange={handleValue}
                                onFocus={handleFocus}
                            />
                            <p className='forname'>{errors.username}</p>
                        </div>

                        <div id="clear">
                            <button onClick={handleSubmit} >
                                {/* {loading == true && (
                                    <div className='loader'></div>
                                )}     */}
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )


}

export default AddUserForm