import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/Layout';
import InfoPanel from '../components/tabs/InfoPanel';
import ReportsPanel from '../components/tabs/ReportsPanel';
import TotalsPanel from '../components/tabs/TotalsPanel';

function ProjectDetail() {
  const tabs = ['Thông tin', 'Tổng kê', 'Biên bản'];

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
              <InfoPanel />
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
