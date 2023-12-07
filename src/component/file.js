import {  React,useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function File(){
   const [isOpen,setIsOpen] = useState(false);
   const [date, setDate]=useState(new Date());
  useEffect(()=>{
  const targetDate = new Date('2023-12-26');
  const currentDate = new Date();
  const isAfterTargetDate = currentDate.getTime() >= targetDate.getTime();
    setIsOpen(isAfterTargetDate);
  },[]);
  useEffect(()=>{
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  },[]);
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px'}}>
      <Box
      sx={{
      border: 1,
      borderRadius: 2,
      borderColor: 'primary.main',
      padding: 3,
      marginBottom: 3,
     }}>   
    <Typography variant="h4" gutterBottom>
    Mock Text Opening Information
    </Typography>
    <Typography  variant="body1">
      {  

        isOpen?
      'Your mock text is now open! 🎉':
      `Your mock text will open on December 26th. Please check back later! 🕰️`
      }
      </Typography>
       </Box> 
        <Box
        sx={{
        border: 1,
        borderRadius: 2,
        borderColor:'primary.main',
        padding: 3,
        }
        }>
    <Typography variant="body2" style={{ marginTop: '20px' }}>
    <Typography variant="h6">Time:{date.toLocaleTimeString()}</Typography>
    <Typography variant="h6">Date:{date.toLocaleDateString()}</Typography>
    </Typography>
   </Box>
    </Container>
  );
}

export default File;
