import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { add, format, sub } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import Layout from '../components/Layout';
import AddDiary from '../components/modals/AddDiary';
import UploadOfficialProof from '../components/modals/UploadOfficialProof';
import Spinner from '../components/Spinner';
import { useWorkDiaries } from '../hooks/useWorkDiaries';
import Datepicker from '../partials/actions/Datepicker';

function Upload() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInfo, setSelectedInfo] = useState(null);

  const [dates] = useState(() => {
    Date.prototype.addDays = (days) => {
      const dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    };

    function getDates(startDate, stopDate) {
      const dateArray = [];
      let currentDate = startDate;

      while (currentDate <= stopDate) {
        const [dateInW, day] = format(currentDate, 'EEEEE-dd', {
          locale: viLocale,
        }).split('-');
        dateArray.push({ dateInW, day });
        currentDate = add(currentDate, { days: 1 });
      }

      return dateArray;
    }
    return getDates(sub(new Date(), { days: 9 }), new Date());
  });

  const getClassNames = (i) => {
    return {
      color: 'black',
      background: i % 2 === 0 ? '#EDF2F6' : '#F8FAFC',
    };
  };

  const { data: logs, isFetching } = useWorkDiaries();

  if (isFetching) {
    return (
      <Layout>
        <div className='w-full bg-white shadow-lg p-4'>
          <h3 className='h3'>Nhật ký công việc</h3>
          <hr className='mb-6' />
          <Spinner />
        </div>
      </Layout>
    );
  }

  const renderCheckMark = (i, calDay, currDay, shift, status = 'green') => {
    let style;
    if (status === 'green') {
      style = { background: 'green.100', color: 'green.800' };
    } else if (status === 'red') {
      style = { background: 'red.100', color: 'red.800' };
    }
    if (status === 'yellow') {
      style = { background: 'yellow.100', color: 'yellow.800' };
    }

    const morning = calDay === currDay && (shift === 0 || shift === 2);
    const afternoon = calDay === currDay && (shift === 1 || shift === 2);

    return (
      <>
        {morning ? (
          <Td
            {...getClassNames(i)}
            zIndex='inherit'
            background={style.background}
            color={style.color}
          >
            x
          </Td>
        ) : (
          <Td {...getClassNames(i)} zIndex='inherit' />
        )}

        {afternoon ? (
          <Td
            {...getClassNames(i)}
            zIndex='inherit'
            background={style.background}
            color={style.color}
          >
            x
          </Td>
        ) : (
          <Td {...getClassNames(i)} zIndex='inherit' />
        )}
      </>
    );
  };

  return (
    <Layout>
      <div className='w-full bg-white shadow-lg p-4'>
        <h3 className='h3'>Nhật ký công việc</h3>
        <hr className='mb-6' />
        <div className='flex'>
          <Datepicker onChange={null} />

          <Box ml='auto'>
            <Button>Xuất nhật kí</Button>
            <AddDiary>
              <Button
                className='ml-4'
                leftIcon={<IoAdd color='#fff' />}
                variant='primary'
              >
                Tạo nhật ký
              </Button>
            </AddDiary>
          </Box>
        </div>

        <TableContainer marginTop={6} height='65vh'>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th rowSpan='2' className='sticky top-0 left-0 z-10'>
                  <Th w='100px' maxW='100px' className='border-none'>
                    MSCT
                  </Th>
                  <Th w='250px' maxW='250px' className='border-none'>
                    Nội dung công việc
                  </Th>
                  <Th w='250px' maxW='250px' className='border-none'>
                    Biễu mẫu
                  </Th>
                </Th>

                {dates.map(({ dateInW, day }) => {
                  return (
                    <Th colSpan='2'>
                      {dateInW} <br /> {day}
                    </Th>
                  );
                })}
              </Tr>

              <Tr className='z-20'>
                {dates.map((_, i) => (
                  <>
                    <Td className='sticky top-18' {...getClassNames(i)}>
                      S
                    </Td>
                    <Td className='sticky top-18' {...getClassNames(i)}>
                      C
                    </Td>
                  </>
                ))}
              </Tr>
            </Thead>

            <tbody>
              {logs.map(
                (
                  {
                    _id: workDiaryId,
                    projectId,
                    workDiaryDetail: { workContents },
                    workingDate,
                    shift,
                    status,
                  },
                  i,
                ) => (
                  <Tr className='cursor-pointer' key={i}>
                    <Td
                      className='sticky left-0 pl-0'
                      {...getClassNames(i)}
                      display='flex'
                      justifyContent='space-between'
                      minH='50px'
                    >
                      <Td
                        className='border-none'
                        w='100px'
                        maxW='100px'
                        p='0'
                        pr='2'
                      >
                        {projectId}
                      </Td>
                      <Td
                        className='border-none whitespace-pre-line '
                        w='250px'
                        maxW='250px'
                        p='0'
                        pr='2'
                      >
                        {workContents.map((workContent) => (
                          <p>{workContent.name}</p>
                        ))}
                      </Td>
                      <Td
                        className='border-none whitespace-pre-line'
                        w='250px'
                        maxW='250px'
                        p='0'
                      >
                        {workContents.map((workContent) => (
                          <>
                            {workContent.docs.map(
                              ({ _id, name, proof, draft }) => (
                                <Flex alignItems='baseline'>
                                  {!draft && (
                                    <BsCheck
                                      fontSize='1rem'
                                      className='text-green-500 text-lg'
                                    />
                                  )}
                                  <Box
                                    as='p'
                                    textAlign='left'
                                    wordBreak='break-all'
                                  >
                                    <a
                                      href={proof}
                                      target='_blank'
                                      rel='noreferrer'
                                      className='underline'
                                      onContextMenu={(e) => {
                                        e.preventDefault();

                                        if (draft) {
                                          onOpen();
                                          setSelectedInfo({
                                            workContentId: workContent._id,
                                            workDiaryId,
                                            docId: _id,
                                          });
                                        }
                                      }}
                                    >
                                      {name}
                                    </a>
                                  </Box>
                                </Flex>
                              ),
                            )}
                          </>
                        ))}
                      </Td>
                    </Td>

                    {dates.map((date, ii) => (
                      <>
                        {renderCheckMark(
                          ii,
                          date.day,
                          workingDate.day,
                          shift,
                          status,
                        )}
                      </>
                    ))}
                  </Tr>
                ),
              )}

              <UploadOfficialProof
                {...{ isOpen, onClose, onOpen, selectedInfo }}
              />
            </tbody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
}

export default Upload;
