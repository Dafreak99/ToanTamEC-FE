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
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AddDiary from "../components/modals/AddDiary";
import { IoAdd } from "react-icons/io5";

import viLocale from "date-fns/locale/vi";

import { sub, add, format } from "date-fns";

function Upload() {
  const [dates, setDates] = useState(() => {
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

      return dateArray;
    }
    return getDates(sub(new Date(), { days: 9 }), new Date());
  });

  const [logs, setLogs] = useState([]);

  const getClassNames = (i) => {
    return {
      color: "black",
      background: i % 2 === 0 ? "#EDF2F6" : "#F8FAFC",
    };
  };

  useEffect(() => {
    const logs = [
      {
        workingDate: dates[0],
        shift: ["morning"],
        projectId: "001",
        status: "red",
        workContents: [
          {
            name: "workContent1",
            docs: [
              {
                name: "formType1",
                proof: File,
                draft: false,
              },
              {
                name: "formType1",
                proof: File,
                draft: false,
              },
            ],
          },
          {
            name: "workContent3",
            docs: [
              {
                name: "formType3a",
                proof: File,
                draft: false,
              },
              {
                name: "formType3b",
                proof: File,
                draft: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[1],
        shift: ["morning", "afternoon"],
        projectId: "002",
        status: "green",
        workContents: [
          {
            name: "workContent2",
            docs: [
              {
                name: "formType1",
                proof: File,
                draft: false,
              },
              {
                name: "formType2",
                proof: File,
                draft: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[2],
        shift: [],
        projectId: "003",
        status: "red",
        workContents: [],
      },
      {
        workingDate: dates[3],
        shift: [],
        projectId: "004",
        status: "yellow",
        workContents: [
          {
            name: "workContent1",
            docs: [
              {
                name: "formType3",
                proof: File,
                draft: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[4],
        shift: ["morning", "afternoon"],
        projectId: "004",
        status: "green",
        workContents: [
          {
            name: "workContent2",
            docs: [
              {
                name: "formType1",
                proof: File,
                draft: false,
              },
              {
                name: "formType2",
                proof: File,
                draft: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[5],
        shift: ["morning", "afternoon"],
        status: "green",
        projectId: "005",
        workContents: [
          {
            name: "workContent2",
            docs: [
              {
                name: "formType1",
                proof: File,
                draft: false,
              },
              {
                name: "formType2",
                proof: File,
                draft: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[6],
        shift: ["morning", "afternoon"],
        projectId: "005",
        status: "green",
        workContents: [
          {
            name: "workContent2",
            docs: [
              {
                name: "formType1",
                proof: File,
                draft: false,
              },
              {
                name: "formType2",
                proof: File,
                draft: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[7],
        shift: ["morning", "afternoon"],
        projectId: "005",
        status: "green",
        workContents: [
          {
            name: "workContent2",
            docs: [
              {
                name: "formType1",
                proof: File,
                draft: false,
              },
              {
                name: "formType2",
                proof: File,
                draft: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[8],
        shift: ["morning", "afternoon"],
        projectId: "005",
        status: "green",
        workContents: [
          {
            name: "workContent2",
            docs: [
              {
                name: "formType1",
                proof: File,
                draft: false,
              },
              {
                name: "formType2",
                proof: File,
                draft: false,
              },
            ],
          },
        ],
      },
    ];

    setLogs(logs);
  }, []);

  const renderCheckMark = (i, calDay, currDay, shift, status) => {
    let style;
    if (status === "green") {
      style = { background: "green.100", color: "green.800" };
    } else if (status === "red") {
      style = { background: "red.100", color: "red.800" };
    }
    if (status === "yellow") {
      style = { background: "yellow.100", color: "yellow.800" };
    }

    const morning = calDay === currDay && shift.includes("morning");
    const afternoon = calDay === currDay && shift.includes("afternoon");

    return (
      <>
        {morning ? (
          <Td
            {...getClassNames(i)}
            zIndex="inherit"
            background={style.background}
            color={style.color}
          >
            x
          </Td>
        ) : (
          <Td {...getClassNames(i)} zIndex="inherit"></Td>
        )}

        {afternoon ? (
          <Td
            {...getClassNames(i)}
            zIndex="inherit"
            background={style.background}
            color={style.color}
          >
            x
          </Td>
        ) : (
          <Td {...getClassNames(i)} zIndex="inherit"></Td>
        )}
      </>
    );
  };

  const onSubmitDiary = (data) => {
    if (typeof data.shift === "string") {
      data.shift = [data.shift];
    }

    const [dateInW, day] = format(data.workingDate, "EEEEE-dd", {
      locale: viLocale,
    }).split("-");

    data.workingDate = { dateInW, day };

    setLogs([...logs, data]);
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
            <AddDiary onSubmit={onSubmitDiary}>
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
                  <Th w="100px" maxW="100px" className="border-none">
                    MSCT
                  </Th>
                  <Th w="200px" maxW="200px" className="border-none">
                    Nội dung công việc
                  </Th>
                  <Th w="100px" maxW="100px" className="border-none">
                    Biễu mẫu
                  </Th>
                </Th>

                {dates.map(({ dateInW, day }, i) => {
                  return (
                    <Th colSpan="2">
                      {dateInW} <br /> {day}
                    </Th>
                  );
                })}
              </Tr>
              <Tr className="z-20">
                {dates.map((_, i) => (
                  <>
                    <Td className="sticky top-18" {...getClassNames(i)}>
                      S
                    </Td>
                    <Td className="sticky top-18" {...getClassNames(i)}>
                      C
                    </Td>
                  </>
                ))}
              </Tr>
            </Thead>

            <tbody>
              {logs.map(
                (
                  { projectId, workContents, workingDate, shift, status },
                  i
                ) => (
                  <Tr className="cursor-pointer" key={i}>
                    <Td
                      className="sticky left-0"
                      {...getClassNames(i)}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Td className="border-none" maxW="100px" p="0" pr="2">
                        {projectId}
                      </Td>
                      <Td
                        className="border-none"
                        w="200px"
                        maxW="200px"
                        p="0"
                        pr="2"
                      >
                        {workContents.map((workContent) => (
                          <Tooltip label={workContent.name}>
                            <p>{workContent.name.slice(0, 10) + "..."}</p>
                          </Tooltip>
                        ))}
                      </Td>
                      <Td className="border-none" maxW="100px" p="0">
                        {workContents.map((workContent) => (
                          <>
                            {workContent.docs.map((doc) => (
                              <Tooltip label={doc.name}>
                                <p>{doc.name.slice(0, 10)}...</p>
                              </Tooltip>
                            ))}
                          </>
                        ))}
                      </Td>
                    </Td>

                    {dates.map((date, i) => (
                      <>
                        {renderCheckMark(
                          i,
                          date.day,
                          workingDate.day,
                          shift,
                          status
                        )}
                      </>
                    ))}
                  </Tr>
                )
              )}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
}

export default Upload;
