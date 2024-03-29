import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import InfoPanel from '../components/tabs/InfoPanel';
import ReportsPanel from '../components/tabs/ReportsPanel';
import TotalsPanel from '../components/tabs/TotalsPanel';
import { getProject } from '../features/project/projectSlice';
import { getUsers } from '../features/user/userSlice';

function ProjectDetail() {
  const tabs = ['Thông tin', 'Tổng kê', 'Biên bản'];
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.project);
  const { role } = useSelector((state) => state.user.auth);

  const { id } = useParams();

  const getData = async () => {
    await dispatch(getProject(id));
    if (role !== 3)
      await dispatch(getUsers());
  };

  useEffect(() => {
    getData();
  }, []);

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
            <TabPanel>
              {detail ? <InfoPanel {...{ detail }} /> : <Spinner />}
            </TabPanel>

            {/* Tổng kê */}
            <TabPanel>
              <TotalsPanel />
            </TabPanel>

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

export default ProjectDetail;
