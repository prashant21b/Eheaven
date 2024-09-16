import React, { useState } from 'react';
import './EditableProfile.css'; // Import the CSS file
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { baseURL } from '../url';
function EditableProfile() {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const pro=useSelector((state)=>state.product.product);
    console.log(pro)
    const [name, setName] = useState(decodedToken.name);
    const [email, setEmail] = useState(decodedToken.email);
    const [isEditing, setIsEditing] = useState(false);
    console.log(decodedToken.id);
const navigate=useNavigate();
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/v1/updateprofile`, {
                id:decodedToken.id,
                name: name,
                email: email,
            })
            if (response.status == 200) {
                toast.success('profile updated sucessfully please again login to see changes');
                setIsEditing(false);
                navigate('/profile')
            }
        }
        catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="profile-container">
            {isEditing ? (
                <div className="edit-mode">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            ) : (
                <div className="display-mode">
                    <img src='https://avatarfiles.alphacoders.com/254/thumb-1920-254772.jpg' style={{ borderRadius: '50%', width: '100px', height: '100px' }} alt="Avatar" />
                    <p>{name}</p>
                    <p>{email}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default EditableProfile;
