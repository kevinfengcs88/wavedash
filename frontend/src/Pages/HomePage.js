import { Box, Container, Text, Tabs, Tab, TabList, TabPanels, TabPanel, Image} from '@chakra-ui/react';
import React from 'react';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';

const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box pb='3'>
          <Image src='https://user-images.githubusercontent.com/80129996/155554004-ac58493c-36d0-4dd9-b525-61963a4006ad.png'/>
      </Box>
      <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
      <Tabs variant='soft-rounded' colorScheme='purple'>
        <TabList mb='1em'>
          <Tab width='50%'>Login test part 2</Tab>
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
  )
}

export default HomePage;