import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Register = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();

    const handleClick = () => setShow(!show);

    const postDetails = () => {

    };

    const submitHandler = () => {

    }; 

  return (
    <VStack spacing='5px'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
                placeholder='Enter your name'
                onChange={(e)=>setName(e.target.value)}
            />
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
                placeholder='Enter your email'
                onChange={(e)=>setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show ? 'text' : 'password'}
                    placeholder='Enter a password'
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='confirmPassword' isRequired>
            <FormLabel>Confirm password</FormLabel>
            <InputGroup>
                <Input 
                    type={show ? 'text' : 'password'}
                    placeholder='Confirm your password'
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='pic' isRequired>
            <FormLabel>Upload a profile picture</FormLabel>
                <Input 
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
        </FormControl>
        <Button
            colorScheme='purple'
            width='100%'
            style={{ marginTop: 15 }}
            onClick={submitHandler}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default Register;