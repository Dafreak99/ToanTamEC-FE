import {
  Box,
  Button,
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import AddDiary from "../components/modals/AddDiary";
import { IoAdd } from "react-icons/io5";

function Upload() {
  const getClassNames = (i) => {
    return `text-black ${i % 2 === 0 ? "bg-light-gray" : "bg-lighter-gray"}`;
  };

  return (
    <Layout>
      <div className="w-full bg-white shadow-lg p-4">
        <h3 className="h3">Nhật ký công việc</h3>
        <hr className="mb-6" />
        <div className="flex">
          <Flex>
            <Select placeholder="Chọn tháng" w="lg" mr="1rem">
              <option value="option1">1</option>
              <option value="option2">2</option>
              <option value="option3">3</option>
            </Select>
            <Select placeholder="Chọn năm">
              <option value="option1">2022</option>
              <option value="option2">2021</option>
              <option value="option3">2020</option>
            </Select>
          </Flex>

          <Box ml="auto">
            <Button>Xuất nhật kí</Button>
            <AddDiary>
              <Button
                className="ml-4"
                leftIcon={<IoAdd color="#fff" />}
                background="primary"
                color="white"
              >
                Tạo dự án
              </Button>
            </AddDiary>
          </Box>
        </div>
        <TableContainer marginTop={6}>
          <Table size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th rowSpan="2" w="15%" className="border-none">
                  MSCT
                </Th>
                <Th rowSpan="2" w="15%" className="border-none">
                  Nội dung công việc
                </Th>
                <Th rowSpan="2" w="15%" className="border-none">
                  Biễu mẫu
                </Th>
                {Array.from({ length: 10 }, (_, i) => (
                  <Th colSpan="2" className={getClassNames(i)}>
                    T{i + 2} <br /> 1
                  </Th>
                ))}
              </Tr>
              <Tr>
                {Array.from({ length: 10 }, (_, i) => (
                  <>
                    <Td className={`${getClassNames(i)} sticky top-14`}>S</Td>
                    <Td className={`${getClassNames(i)} sticky top-14`}>C</Td>
                  </>
                ))}
              </Tr>
            </Thead>

            <tbody>
              {Array.from({ length: 20 }, (_, i) => (
                <Tr
                  className={`cursor-pointer border ${
                    i % 2 === 0 ? "bg-light-gray" : "bg-lighter-gray"
                  }`}
                  key={i}
                >
                  <Td className="sticky top-10">Trần Văn A</Td>
                  <Td>Chỉ huy trưởng công trình</Td>
                  <Td>
                    Lorem ipsum dolor sit amet <br /> Lorem ipsum dolor sit amet
                    <br /> Lorem ipsum dolor sit amet
                  </Td>
                  {Array.from({ length: 10 }, (_, i) => (
                    <>
                      <Td className={getClassNames(i)}>x</Td>
                      <Td className={getClassNames(i)}>x</Td>
                    </>
                  ))}
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
}

export default Upload;
