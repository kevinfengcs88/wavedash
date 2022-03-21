import { Box, Container, Tabs, Tab, TabList, TabPanels, TabPanel, Image} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';

const HomePage = () => {

  const history = useHistory();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      
      if (user) history.push('/chats');
    }, [history]);

  return (
    <Container maxW='xl' centerContent>
      <Box pb='3'>
          <Image src='https://user-images.githubusercontent.com/80129996/156907621-337688cb-c88d-48df-b043-31e70ee980c1.png'/>
      </Box>
      <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
      <Tabs variant='soft-rounded' colorScheme='purple'>
        <TabList mb='1em'>
          <Tab width='50%'>Login</Tab>
          <Tab width='50%'>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Register />
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
