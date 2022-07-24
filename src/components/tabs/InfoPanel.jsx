/* eslint-disable react/no-unstable-nested-components */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgCloseO } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteMember,
  deleteProject,
} from '../../features/project/projectSlice';
import solution from '../../images/solution.svg';
import AddProject from '../modals/AddProject';
import EmployeeModal from '../modals/Employee';

function InfoPanel({ detail }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const cancelRef2 = React.useRef();
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    location,
    comment,
    startedAt,
    name,
    members,
    _id: projectId,
  } = detail;

  const delMember = async () => {
    await dispatch(deleteMember({ projectId: id, memberId: deleteId }));

    toast({
      description: 'Đã xóa thành viên',
      status: 'success',
      isClosable: true,
      position: 'top-right',
    });
    onClose2();
  };

  const delProject = async () => {
    await dispatch(deleteProject(projectId));
    toast({
      description: 'Đã xóa dự án',
      status: 'success',
      isClosable: true,
      position: 'top-right',
    });
    onClose();
    navigate('/du-an');
  };

  const renderEmployeesTable = () => {
    if (members.length === 0) {
      return (
        <Flex
          justifyItems='center'
          alignItems='center'
          flexDir='column'
          py='90px'
        >
          <img src={solution} alt='solution' className='h-56 mb-10' />
          <p>Chưa có thành viên</p>
          <EmployeeModal>
            <Button
              className='mt-3'
              leftIcon={<IoAdd color='#fff' />}
              background='primary'
              color='white'
              variant='solid'
              size='md'
            >
              Thêm thành viên
            </Button>
          </EmployeeModal>
        </Flex>
      );
    }

    return (
      <>
        <EmployeeModal>
          <Button
            className='mt-3'
            leftIcon={<IoAdd color='#fff' />}
            background='primary'
            color='white'
            variant='solid'
            size='md'
          >
            Thêm thành viên
          </Button>
        </EmployeeModal>

        <TableContainer marginTop={6}>
          <Table size='sm' variant='striped'>
            <Thead>
              <Tr>
                <Th>Họ tên</Th>
                <Th>Chức vụ</Th>
                <Th>Thông tin liên hệ</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {members.map(
                ({
                  user: { fullName, username, phoneNumber, email, _id: userId },
                  role,
                  _id,
                }) => (
                  <Tr className='cursor-pointer' key={_id}>
                    <Td>{fullName}</Td>
                    <Td>{role}</Td>
                    <Td>
                      {phoneNumber === ''
                        ? 'Thành viên chưa điền sđt'
                        : phoneNumber}{' '}
                      <br />
                      {email === '' ? 'Thành viên chưa điền email' : email}
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton>
                          <BsThreeDotsVertical />
                        </MenuButton>
                        <MenuList>
                          <EmployeeModal
                            edit
                            {...{
                              _id,
                              userId,
                              role,
                            }}
                          >
                            <MenuItem icon={<MdModeEdit />}>
                              Sửa thông tin thành viên
                            </MenuItem>
                          </EmployeeModal>
                          <MenuItem
                            icon={<FaTrash />}
                            color='red.500'
                            onClick={() => {
                              onOpen2();
                              console.log(_id);
                              setDeleteId(_id);
                            }}
                          >
                            Xóa thông tin thành viên
                          </MenuItem>
                          <DeleteEmployeeConfirmation />
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ),
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const DeleteProjectConfirmation = () => {
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Xóa dự án
            </AlertDialogHeader>

            <AlertDialogBody textAlign='center'>
              <CgCloseO
                className='mx-auto mb-4'
                fontSize='3rem'
                color='#DE3B33'
              />
              Bạn thật sự muốn xóa dự án này?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button colorScheme='red' onClick={delProject} ml={3}>
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };

  const DeleteEmployeeConfirmation = () => {
    return (
      <AlertDialog
        isOpen={isOpen2}
        leastDestructiveRef={cancelRef2}
        onClose={onClose2}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Xóa thành viên
            </AlertDialogHeader>

            <AlertDialogBody textAlign='center'>
              <CgCloseO
                className='mx-auto mb-4'
                fontSize='3rem'
                color='#DE3B33'
              />
              Bạn thật sự muốn xóa thành viên này?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef2} onClick={onClose2}>
                Hủy
              </Button>
              <Button colorScheme='red' onClick={delMember} ml={3}>
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };

  return (
    <>
      <div className='flex justify-between items-start'>
        <Box>
          <p className='mb-3'>
            <strong>Tên dự án: </strong>
            {name}
          </p>

          <p className='mb-3'>
            <strong>Địa điểm: </strong> {location}
          </p>
          <p className='mb-3'>
            <strong>Thời gian khởi công: </strong>
            {startedAt}
          </p>
          <p className='mb-3'>
            <strong>Căn chứ nghiệm thu: </strong>{' '}
            {comment === '' ? 'Chưa có dữ liệu' : comment}
          </p>
        </Box>

        <Menu>
          <MenuButton>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <AddProject project={detail}>
              <MenuItem icon={<MdModeEdit />}>Sửa thông tin dự án</MenuItem>
            </AddProject>
            <MenuItem
              icon={<FaTrash />}
              color='red.500'
              onClick={() => {
                onOpen();
              }}
            >
              Xóa thông tin dự án
            </MenuItem>
            <DeleteProjectConfirmation />
          </MenuList>
        </Menu>
      </div>

      <h3 className='h3 mt-12'>Thành viên tham gia</h3>
      <hr />

      {renderEmployeesTable()}
    </>
  );
}

export default InfoPanel;
