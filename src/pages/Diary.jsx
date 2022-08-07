import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { add, format, sub } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import React, { useState } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import AddDiary from '../components/modals/AddDiary';
import UploadOfficialProof from '../components/modals/UploadOfficialProof';
import Spinner from '../components/Spinner';
import { useWorkDiaries } from '../hooks/useWorkDiaries';
import Datepicker from '../partials/actions/Datepicker';

function Upload() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  const { fullName } = useSelector((state) => state.user.auth);

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

  const { data: logs, isFetching } = useWorkDiaries(endDate);

  if (isFetching) {
    return (
      <Layout>
        <div className='w-full bg-white shadow-lg p-4'>
          <h3 className='h3'>Nhật ký công việc - {fullName}</h3>
          <hr className='mb-6' />
          <div className='flex'>
            <Datepicker onChange={setEndDate} />

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
        <h3 className='h3'>Nhật ký công việc - {fullName}</h3>
        <hr className='mb-6' />
        <div className='flex'>
          <Datepicker onChange={setEndDate} />

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
                  <Th w='150px' maxW='150px' className='border-none'>
                    MSCT
                  </Th>
                  <Th w='350px' maxW='350px' className='border-none'>
                    Nội dung công việc <br /> Biễu mẫu
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
                        w='150px'
                        maxW='150px'
                        p='0'
                        pr='2'
                      >
                        {projectId}
                      </Td>
                      <Td
                        className='border-none whitespace-pre-line text-left'
                        w='350px'
                        maxW='350px'
                        p='0'
                        pr='2'
                      >
                        {workContents.map((workContent) => (
                          <Box>
                            <Text>{workContent.name}</Text>
                            <List>
                              {workContent.docs.map(
                                ({ _id, name, proof, draft }) => (
                                  <Tooltip
                                    label={
                                      draft
                                        ? 'Chưa cập nhật bản chính'
                                        : 'Đã cập nhật bản chính'
                                    }
                                  >
                                    <ListItem
                                      display='flex'
                                      alignItems='center'
                                      as='li'
                                      listStyleType='inherit'
                                      pl='1rem'
                                    >
                                      {!draft ? (
                                        <ListIcon
                                          as={BsCheck}
                                          color='green.500'
                                          fontSize='1.2rem'
                                        />
                                      ) : (
                                        <ListIcon
                                          as={AiFillWarning}
                                          color='yellow.500'
                                          fontSize='1.2rem'
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
                                    </ListItem>
                                  </Tooltip>
                                ),
                              )}
                            </List>
                          </Box>
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
