import React, { useRef, useState } from 'react';
import { Container, Alert, Box, Typography, TextField, FormControlLabel, FormHelperText, Checkbox, Button } from '@mui/material';

const ContactUs = () => {

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const termsRef = useRef(null);

  const [isFirstNameInvalid, setIsFirstNameInvalid] = useState(false);
  const [isLastNameInvalid, setIsLastNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isMessageInvalid, setIsMessageInvalid] = useState(false);
  const [isTermsUnchecked, setIsTermsUnchecked] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  function handleSubmit() {
    if (areAllInputsValid()) {
      setSuccessMsg("Message sent successfully!");
    } else {
      setSuccessMsg("");
    }
  }

  function areAllInputsValid() {
    const isFirstNameValid = firstNameRef.current.value !== '';
    const isLastNameValid = lastNameRef.current.value !== '';
    const isEmailValid = emailRegex.test(emailRef.current.value);
    const isMessageValid = messageRef.current.value !== '';
    const isTermsValid = termsRef.current.checked;

    setIsFirstNameInvalid(!isFirstNameValid);
    setIsLastNameInvalid(!isLastNameValid);
    setIsEmailInvalid(!isEmailValid);
    setIsMessageInvalid(!isMessageValid);
    setIsTermsUnchecked(!isTermsValid);

    return isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid && isTermsValid;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        borderRadius: '8px',
        padding: '20px',
        backgroundImage: `url('./src/assets/contactusbackground.jpg')`,
        backgroundSize: 'cover'
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: 'white',
          padding: '35px',
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
              helperText={isFirstNameInvalid ? "Please enter valid input" : ""}
              error={isFirstNameInvalid} />

            <TextField
              required
              variant='filled'
              sx={{ width: '49%' }}
              style={{ marginLeft: 'auto' }}
              label="Last name"
              margin="dense"
              inputRef={lastNameRef}
              helperText={isLastNameInvalid ? "Please enter valid input" : ""}
              error={isLastNameInvalid} />
          </Box>
          <TextField
            required
            variant='filled'
            fullWidth
            label="Email address"
            margin="dense"
            inputRef={emailRef}
            helperText={isEmailInvalid ? "Please enter valid input" : ""}
            error={isEmailInvalid} />

          <TextField
            required
            fullWidth
            label="Message"
            multiline
            rows={4}
            margin="dense"
            variant='filled'
            inputRef={messageRef}
            helperText={isMessageInvalid ? "Please enter valid input" : ""}
            error={isMessageInvalid}
          />
          <FormControlLabel
            control={<Checkbox name="agreeTerms" color="primary" inputRef={termsRef} />}
            label="I agree to the terms of use and privacy policy."
          />
          {isTermsUnchecked && (
            <FormHelperText error>Please agree to the terms</FormHelperText>
          )}
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
