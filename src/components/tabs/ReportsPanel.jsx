import { Flex, Select } from "@chakra-ui/react";
import React from "react";
import friends from "../../images/friends.svg";

function ReportsPanel() {
  return (
    <div>
      <Select placeholder="Tất cả biên bản" width="300px">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Flex
        py="100px"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <img src={friends} alt="friend" className="h-56 mb-4" />
        <p>Chưa có dữ liệu</p>
      </Flex>
    </div>
  );
}

export default ReportsPanel;
