import {
  Box,
  Button,
  Flex,
  Select,
  Table,
  TableContainer,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AddDiary from "../components/modals/AddDiary";
import { IoAdd } from "react-icons/io5";

import viLocale from "date-fns/locale/vi";

import { sub, add, format } from "date-fns";

function Upload() {
  const [dates, setDates] = useState([]);
  const getClassNames = (i) => {
    // return `text-black ${i % 2 === 0 ? "bg-light-gray" : "bg-lighter-gray"}`;

    return {
      color: "black",
      background: i % 2 === 0 ? "#EDF2F6" : "#F8FAFC",
    };
  };

  useEffect(() => {
    Date.prototype.addDays = function (days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    };

    function getDates(startDate, stopDate) {
      var dateArray = new Array();
      var currentDate = startDate;
      while (currentDate <= stopDate) {
        const [dateInW, day] = format(currentDate, "EEEEE-dd", {
          locale: viLocale,
        }).split("-");
        dateArray.push({ dateInW, day });
        currentDate = add(currentDate, { days: 1 });
      }

      setDates(dateArray);
    }

    getDates(sub(new Date(), { days: 10 }), new Date());
  }, []);

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
                variant="primary"
              >
                Tạo dự án
              </Button>
            </AddDiary>
          </Box>
        </div>
        <TableContainer marginTop={6}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th rowSpan="2" className="sticky top-0 left-0 z-10">
                  <Th rowSpan="2" w="15%" className="border-none">
                    MSCT
                  </Th>
                  <Th rowSpan="2" w="15%" className="border-none">
                    Nội dung công việc
                  </Th>
                  <Th rowSpan="2" w="15%" className="border-none">
                    Biễu mẫu
                  </Th>
                </Th>

                {dates.map((date, i) => (
                  <Th colSpan="2">
                    {date.dateInW} <br /> {date.day}
                  </Th>
                ))}
              </Tr>
              <Tr className="z-20">
                {dates.map((_, i) => (
                  <>
                    <Td className="sticky top-16" {...getClassNames(i)}>
                      S
                    </Td>
                    <Td className="sticky top-16" {...getClassNames(i)}>
                      C
                    </Td>
                  </>
                ))}
              </Tr>
            </Thead>

            <tbody>
              {Array.from({ length: 20 }, (_, i) => (
                <Tr className="cursor-pointer" {...getClassNames(i)} key={i}>
                  <Td className="sticky left-0">
                    <Td className="border-none"> Trần Văn A</Td>
                    <Td className="border-none">Chỉ huy trưởng công trình</Td>
                    <Td className="border-none">
                      Lorem ipsum dolor sit amet <br /> Lorem ipsum dolor sit
                      amet
                      <br /> Lorem ipsum dolor sit amet
                    </Td>
                  </Td>

                  {dates.map((_, i) => (
                    <>
                      <Td {...getClassNames(i)} zIndex="inherit">
                        x
                      </Td>
                      <Td {...getClassNames(i)} zIndex="inherit">
                        x
                      </Td>
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
