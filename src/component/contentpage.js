import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ContentPage() {
  const navigate = useNavigate();
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    heading: {
      color: '#333',
    },
      paragraph: {
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
};
  const getIPAddress = async () => {
    try{
    const response = await axios.get('https://api64.ipify.org?format=json');
    return response.data.ip;
    } catch (error) {
    console.error('Error getting IP address:', error);
    return null;
     }
};
  const [userInfo, setUserInfo] = useState({
  id: '', 
  ip: ''
  });
  useEffect(() => {
      getIPAddress().then((ip) =>{
      setUserInfo((prevUserInfo) =>({ ...prevUserInfo, ip }));
    });
  }, []);
 const navigateToRegister = () => {
    axios.post('http://localhost:3000/newuser', userInfo)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
});
    navigate('/register');
  };
 return (
    <div style={styles.container}>
    <h1 style={styles.heading}>This is the content page</h1>
    <p style={styles.paragraph}/>
    <p>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's   standard dummy text ever since the 1500s, 
  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
  It has survived not only five centuries, but also the leap into electronic typesetting, 
  remaining essentially unchanged. It was popularised in the 1960s with the release of 
  Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
  software like Aldus PageMaker versions of Lorem Ipsum 
    </p>
    <Button onClick={navigateToRegister} variant="secondary">Go to Register Page</Button>
    </div>
   );
}

export default ContentPage;

