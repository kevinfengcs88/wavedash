import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const handleClick = () => setShow(!show);

    const submitHandler = async() => {
        setLoading(true);
        if (!email || !password){
            toast({
                title: 'Please fill out all fields',
                status: 'warning',
                durationg: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
            return;
        }
        try{
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            };
            const { data } = await axios.post('/api/user/login', {email, password}, config);
            toast({
                title: 'Login successful',
                status: 'success',
                durationg: 5000,
                isClosable: true,
                position: 'bottom'
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
        }
        catch (error){
            toast({
                title: 'Error occurred',
                description: error.response.data.message,
                status: 'error',
                durationg: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
        }
    }; 

    return (
        <VStack spacing='5px'>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input 
                        type={show ? 'text' : 'password'}
                        placeholder='Enter a password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme='purple'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={ submitHandler }
                isLoading={ loading }
            >
                Login
            </Button>
            <Button
                colorScheme='red'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={() => {
                    setEmail('guestuser@guest.com');
                    setPassword('guest');
                }}
            >
                Get guest credentials
            </Button>
        </VStack>
      )
}

export default Login;