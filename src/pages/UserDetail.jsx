import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import Diary from '../components/tabs/Diary';
import ProfileTab from '../components/tabs/Profile';
import ReportsPanel from '../components/tabs/ReportsPanel';
import { getUser } from '../features/user/userSlice';

function UserDetail() {
  const tabs = ['Thông tin', 'Nhật ký'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.user.auth);

  const { id } = useParams();

  const getData = async () => {
    await dispatch(getUser(id));
  };

  useEffect(() => {
    getData();
  }, []);

  if (role === 3) {
    navigate('/');
  }

  return (
    <Layout>
      <div className='w-full bg-white shadow-lg p-4'>
        <Tabs>
          <TabList>
            {tabs.map((tab, i) => (
              <Tab
                _focus={{ boxShadow: '0 0 0 0 transparent' }}
                _selected={{ borderColor: 'red.500' }}
                key={i}
              >
                <h1 className='text-lg font-semibold text-gray-700 whitespace-nowrap'>
                  {tab}
                </h1>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {/* Thông tin */}
            <TabPanel>{detail ? <ProfileTab /> : <Spinner />}</TabPanel>

            {/* Nhật ký */}
            <TabPanel>{detail?._id && <Diary userId={detail._id} />}</TabPanel>

            {/* Biên bản */}
            <TabPanel>
              <ReportsPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Layout>
  );
}

export default UserDetail;
