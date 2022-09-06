import { Tab, TabList, Tabs } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/Layout';
import ProfileTab from '../components/tabs/Profile';

function Profile() {
  return (
    <Layout>
      <div className='w-full bg-white shadow-lg p-4'>
        <Tabs>
          <TabList>
            <Tab
              _focus={{ boxShadow: '0 0 0 0 transparent' }}
              _selected={{ borderColor: 'red.500' }}
            >
              <h3 className='h3'>Tài khoản</h3>
            </Tab>
          </TabList>

          <ProfileTab self />
        </Tabs>
      </div>
    </Layout>
  );
}

export default Profile;
