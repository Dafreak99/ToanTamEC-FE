import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Icon,
  List,
  ListIcon,
  ListItem,
  Spinner,
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
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setEndDate } from '../../features/date/dateSlice';
import { getUsers } from '../../features/user/userSlice';
import {
  useCountActualWorkingDate,
  useWorkDiaries,
} from '../../hooks/useWorkDiaries';
import Datepicker from '../../partials/actions/Datepicker';
import MutateDiary from '../modals/MutateDiary';
import UploadOfficialProof from '../modals/UploadOfficialProof';

const Diary = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [editLog, setEditLog] = useState(null);

  const { endDate, dates, startMonth, endMonth } = useSelector(
    (state) => state.date,
  );

  const dispatch = useDispatch();

  const getClassNames = (i) => {
    return {
      color: 'black',
      background: i % 2 === 0 ? '#EDF2F6' : '#F8FAFC',
    };
  };

  const { data, isLoading } = useWorkDiaries(endDate, userId);

  const { data: total } = useCountActualWorkingDate(endDate, userId);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

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

  const renderCheckMarkForLastRow = (i, iterateDate) => {
    const exist = data.accreditedDates.find((date) => {
      if (!date) return false;

      return date.workingDate.dayMonth === iterateDate;
    });

    const morning = exist && (exist.shift === 0 || exist.shift === 2);
    const afternoon = exist && (exist.shift === 1 || exist.shift === 2);

    return (
      <>
        {morning ? (
          <Td {...getClassNames(i)} zIndex='inherit'>
            x
          </Td>
        ) : (
          <Td {...getClassNames(i)} zIndex='inherit' />
        )}

        {afternoon ? (
          <Td {...getClassNames(i)} zIndex='inherit'>
            x
          </Td>
        ) : (
          <Td {...getClassNames(i)} zIndex='inherit' />
        )}
      </>
    );
  };

  if (isLoading) {
    return (
      <>
        <Box className='flex'>
          <Datepicker onChange={(e) => dispatch(setEndDate(e))} />

          <Box ml='auto'>
            {/* <Button>Xuất nhật kí</Button> */}
            <MutateDiary {...{ endDate, userId }}>
              <Button
                className='ml-4'
                leftIcon={<IoAdd color='#fff' />}
                variant='primary'
              >
                Tạo nhật ký
              </Button>
            </MutateDiary>
          </Box>
        </Box>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <Box className='flex'>
        <Datepicker onChange={(e) => dispatch(setEndDate(e))} />

        <Box ml='auto'>
          {/* <Button>Xuất nhật kí</Button> */}
          <MutateDiary>
            <Button
              className='ml-4'
              leftIcon={<IoAdd color='#fff' />}
              variant='primary'
            >
              Tạo nhật ký
            </Button>
          </MutateDiary>
        </Box>
      </Box>

      {data?.logs.length === 0 ? (
        <Alert status='warning' mt='2rem' w='35rem'>
          <AlertIcon />
          Không có dữ liệu để hiển thị! Vui lòng chọn ngày khác
        </Alert>
      ) : (
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

                {dates.map(({ dateInW, dayMonth }) => {
                  return (
                    <Th colSpan='2'>
                      {dateInW} <br /> {dayMonth}
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
              {data?.logs.map((log, i) => {
                const {
                  _id: workDiaryId,
                  project: { code },
                  workDiaryDetail: { workContents },
                  workingDate,
                  shift,
                  status,
                } = log;

                return (
                  <Tr className='cursor-pointer' key={i}>
                    <Td
                      className='sticky left-0 pl-0'
                      {...getClassNames(i)}
                      minH='50px'
                    >
                      <Td
                        className='border-none'
                        minW='150px'
                        maxW='150px'
                        p='0'
                        pr='2'
                      >
                        {code}
                      </Td>
                      <Td
                        className='border-none whitespace-pre-line text-left'
                        minW='350px'
                        maxW='350px'
                        p='0'
                        pr='2'
                      >
                        <Flex
                          alignItems='center'
                          justifyContent='space-between'
                        >
                          <Box>
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

                                                onOpen();
                                                setSelectedInfo({
                                                  workContentId:
                                                    workContent._id,
                                                  workDiaryId,
                                                  docId: _id,
                                                  proof,
                                                  draft,
                                                });
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
                          </Box>

                          <MutateDiary {...{ edit: true, editLog }}>
                            {/* Edit icon */}
                            <Icon
                              as={FaEdit}
                              mr='-2'
                              onClick={() => setEditLog(log)}
                            />
                          </MutateDiary>
                        </Flex>
                      </Td>
                      <Box
                        position='absolute'
                        right='0'
                        top='0'
                        height='100%'
                        w='2px'
                        bg='#fff'
                      />
                    </Td>

                    {dates.map((date, ii) => (
                      <>
                        {renderCheckMark(
                          ii,
                          date.dayMonth,
                          workingDate.dayMonth,
                          shift,
                          status,
                        )}
                      </>
                    ))}
                  </Tr>
                );
              })}
              <Tr className='cursor-pointer'>
                <Td
                  className='sticky left-0 pl-0'
                  {...getClassNames(2)}
                  minH='50px'
                >
                  Ngày công thực tế trong tháng (
                  {format(new Date(startMonth), 'dd/MM')} -
                  {format(new Date(endMonth), 'dd/MM')}): {total}
                  <Box
                    position='absolute'
                    right='0'
                    top='0'
                    height='100%'
                    w='2px'
                    bg='#fff'
                  />
                </Td>

                {dates.map((date, i) => (
                  <>{renderCheckMarkForLastRow(i, date.dayMonth)}</>
                ))}

                {/* TODO: Render x x for last row */}

                {}
              </Tr>

              <UploadOfficialProof
                {...{ isOpen, onClose, onOpen, selectedInfo, endDate }}
              />
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Diary;
