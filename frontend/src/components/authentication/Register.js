import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Register = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();



    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined){
            toast({
                title: 'Please select an image.',
                status: 'warning',
                durationg: 5000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }
        if (pics.type === 'image/jpeg' || pics.type === 'image/png'){
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'wavedash');
            data.append('cloud_name', 'wavedash-chat-app');
            fetch('https://api.cloudinary.com/v1_1/wavedash-chat-app/image/upload', {
                method: 'post',
                body: data
            }).then((res) => res.json()).then(data => {
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
        }
        else{
            toast({
                title: 'Please select an image.',
                status: 'warning',
                durationg: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
            return;
        }
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
            onClick={ submitHandler } 
            isLoading={ loading }
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default Register;