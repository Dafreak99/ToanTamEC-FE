import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import InfoPanel from "../components/tabs/InfoPanel";
import TotalsPanel from "../components/tabs/TotalsPanel";
import ReportsPanel from "../components/tabs/ReportsPanel";

function ProjectDetail() {
  const tabs = ["Thông tin", "Tổng kê", "Biên bản"];

  return (
    <div className="w-full bg-white shadow-lg p-4">
      <Tabs>
        <TabList>
          {tabs.map((tab) => (
            <Tab
              _focus={{ boxShadow: "0 0 0 0 transparent" }}
              _selected={{ borderColor: "red.500" }}
            >
              <h1 className="text-lg font-semibold text-gray-700">{tab}</h1>
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
  );
}

export default ProjectDetail;
