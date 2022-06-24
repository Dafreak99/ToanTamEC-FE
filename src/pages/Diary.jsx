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
        workingSession: ["morning"],
        MSCT: "001",
        status: "red",
        workContents: [
          {
            title: "workContent1",
            forms: [
              {
                formType: "formType1",
                attachedFile: File,
                isOffcial: false,
              },
              {
                formType: "formType1",
                attachedFile: File,
                isOffcial: false,
              },
            ],
          },
          {
            title: "workContent3",
            forms: [
              {
                formType: "formType3a",
                attachedFile: File,
                isOffcial: false,
              },
              {
                formType: "formType3b",
                attachedFile: File,
                isOffcial: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[1],
        workingSession: ["morning", "afternoon"],
        MSCT: "002",
        status: "green",
        workContents: [
          {
            title: "workContent2",
            forms: [
              {
                formType: "formType1",
                attachedFile: File,
                isOffcial: false,
              },
              {
                formType: "formType2",
                attachedFile: File,
                isOffcial: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[2],
        workingSession: [],
        MSCT: "003",
        status: "red",
        workContents: [],
      },
      {
        workingDate: dates[3],
        workingSession: [],
        MSCT: "004",
        status: "yellow",
        workContents: [
          {
            title: "workContent1",
            forms: [
              {
                formType: "formType3",
                attachedFile: File,
                isOffcial: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[4],
        workingSession: ["morning", "afternoon"],
        MSCT: "004",
        status: "green",
        workContents: [
          {
            title: "workContent2",
            forms: [
              {
                formType: "formType1",
                attachedFile: File,
                isOffcial: false,
              },
              {
                formType: "formType2",
                attachedFile: File,
                isOffcial: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[5],
        workingSession: ["morning", "afternoon"],
        status: "green",
        MSCT: "005",
        workContents: [
          {
            title: "workContent2",
            forms: [
              {
                formType: "formType1",
                attachedFile: File,
                isOffcial: false,
              },
              {
                formType: "formType2",
                attachedFile: File,
                isOffcial: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[6],
        workingSession: ["morning", "afternoon"],
        MSCT: "005",
        status: "green",
        workContents: [
          {
            title: "workContent2",
            forms: [
              {
                formType: "formType1",
                attachedFile: File,
                isOffcial: false,
              },
              {
                formType: "formType2",
                attachedFile: File,
                isOffcial: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[7],
        workingSession: ["morning", "afternoon"],
        MSCT: "005",
        status: "green",
        workContents: [
          {
            title: "workContent2",
            forms: [
              {
                formType: "formType1",
                attachedFile: File,
                isOffcial: false,
              },
              {
                formType: "formType2",
                attachedFile: File,
                isOffcial: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[8],
        workingSession: ["morning", "afternoon"],
        MSCT: "005",
        status: "green",
        workContents: [
          {
            title: "workContent2",
            forms: [
              {
                formType: "formType1",
                attachedFile: File,
                isOffcial: false,
              },
              {
                formType: "formType2",
                attachedFile: File,
                isOffcial: false,
              },
            ],
          },
        ],
      },
      {
        workingDate: dates[9],
        workingSession: ["morning", "afternoon"],
        MSCT: "005",
        status: "yellow",
        workContents: [
          {
            title: "workContent2 workContent2",
            forms: [
              {
                formType: "formType1",
                attachedFile: File,
                isOffcial: false,
              },
              {
                formType: "formType2",
                attachedFile: File,
                isOffcial: false,
              },
            ],
          },
        ],
      },
    ];

    setLogs(logs);
  }, []);

  const renderCheckMark = (i, calDay, currDay, workingSession, status) => {
    let style;
    console.log(status);
    if (status === "green") {
      style = { background: "green.100", color: "green.800" };
    } else if (status === "red") {
      style = { background: "red.100", color: "red.800" };
    }
    if (status === "yellow") {
      style = { background: "yellow.100", color: "yellow.800" };
    }

    const morning = calDay === currDay && workingSession.includes("morning");
    const afternoon =
      calDay === currDay && workingSession.includes("afternoon");

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

                {logs.map(({ workingDate }, i) => {
                  return (
                    <Th colSpan="2">
                      {workingDate?.dateInW} <br /> {workingDate?.day}
                    </Th>
                  );
                })}
              </Tr>
              <Tr className="z-20">
                {logs.map((_, i) => (
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
                  { MSCT, workContents, workingDate, workingSession, status },
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
                      <Td className="border-none"> {MSCT}</Td>
                      <Td className="border-none">
                        {workContents.map((workContent) => (
                          <p>{workContent.title}</p>
                        ))}
                      </Td>
                      <Td className="border-none pr-4">
                        {workContents.map((workContent) => (
                          <>
                            {workContent.forms.map((form) => (
                              <p>{form.formType}</p>
                            ))}
                          </>
                        ))}
                      </Td>
                    </Td>

                    {dates.map((date, i) => (
                      <>
                        {/* <Td
                          {...getClassNames(i)}
                          zIndex="inherit"
                          backgroundColor={
                            date.day === workingDate.day &&
                            workingSession.includes("morning") &&
                            status
                          }
                        >
                          {date.day === workingDate.day &&
                            workingSession.includes("morning") &&
                            "x"}
                        </Td> */}

                        {renderCheckMark(
                          i,
                          date.day,
                          workingDate.day,
                          workingSession,
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
