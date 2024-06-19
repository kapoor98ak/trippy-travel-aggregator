
import React, { useRef, useState } from 'react';
import { Container, Alert, Box, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';

const ContactUs = () => {

  const firstNameRef=useRef(null)
  const lastNameRef=useRef(null)
  const emailRef=useRef(null)
  const messageRef=useRef(null)

  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isMessageValid, setIsMessageValid] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  function handleSubmit(){
    if(areAllInputsValid()){
      console.log("all")
      setSuccessMsg("Message sent successfully!")
    }

  }

  function areAllInputsValid(){
    setIsFirstNameValid(firstNameRef.current.value==null | firstNameRef.current.value==='')
    setIsLastNameValid(lastNameRef.current.value==null | lastNameRef.current.value==='')
    setIsEmailValid(emailRef.current.value==null | !emailRegex.test(emailRef.current.value))
    setIsMessageValid(messageRef.current.value==null | messageRef.current.value==='')
    return isFirstNameValid & isLastNameValid & isEmailValid & isMessageValid
  }

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
         borderRadius: '8px',
          padding: '20px',
          backgroundImage: `url('./src/assets/contactusbackground.jpg')`,
          backgroundSize: 'cover' }}      
      >
      <Container         
        maxWidth="sm"
        sx={{
          backgroundColor:'white',
          padding:'35px',
          borderRadius: 3
        }}
      >
        <Typography variant="h4" gutterBottom>
          Contact us
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          We're here to answer your questions. Let's talk!
        </Typography>
        <form noValidate autoComplete="off">
          <Box
            sx={{ display: 'flex', gap: 2 }}>
            <TextField        
              required
              variant='filled'
              sx={{ width: '49%' }}
              maxWidth="full"
              label="First name"
              margin="dense"
              inputRef={firstNameRef} 
              helperText={isFirstNameValid?"Please enter valid input":null}
              error={isFirstNameValid}/>

            <TextField
              required
              variant='filled'
              sx={{ width: '49%' }}
              style={{ marginLeft: 'auto' }}
              label="Last name"
              margin="dense"
              inputRef={lastNameRef} 
              helperText={isLastNameValid?"Please enter valid input":null}
              error={isLastNameValid}/>
          </Box>
          <TextField 
            required 
            variant='filled' 
            fullWidth 
            label="Email address" 
            margin="dense" 
            inputRef={emailRef}
            helperText={isEmailValid?"Please enter valid input":null}
            error={isEmailValid}/>

          <TextField
            required
            fullWidth
            label="Message"
            multiline
            rows={4}
            margin="dense"
            variant='filled'
            inputRef={messageRef}
            helperText={isMessageValid?"Please enter valid input":""}
            error={isMessageValid}
          />
          <FormControlLabel
            control={<Checkbox name="agreeTerms" color="primary" />}
            label="I agree to the terms of use and privacy policy."
          />
          <Button variant="contained" onClick={handleSubmit} color="primary" fullWidth>
            SUBMIT
          </Button>

        </form>
        {successMsg && (
            <Alert severity="success" sx={{ mt: 4 }}>
              {successMsg}
            </Alert>
          )}
      </Container>
    </Container>
  );
};

export default ContactUs;
