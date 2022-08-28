import {
  Badge,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AddAcount from '../components/modals/AddAccount';
import Spinner from '../components/Spinner';
import { getUsers } from '../features/user/userSlice';

const Users = () => {
  const navigate = useNavigate();
  const {
    auth: { role },
    systemUsers: users,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Layout>
      <div className='w-full bg-white shadow-lg p-4'>
        <h3 className='h3'>Quản trị người dùng</h3>
        <hr className='mb-6' />
        <div className='flex mb-8'>
          <div className='w-60'>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<AiOutlineSearch color='gray.300' />}
                fontSize='xl'
              />
              <Input placeholder='Nhập từ khóa' />
            </InputGroup>
          </div>

          <AddAcount>
            <Button
              className='ml-auto'
              leftIcon={<IoAdd color='#fff' />}
              background='primary'
              color='white'
            >
              Thêm tài khoản
            </Button>
          </AddAcount>
        </div>

        {users.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <TableContainer height='65vh'>
              <Table size='sm' variant='striped'>
                <Thead>
                  <Tr textTransform='lowercase'>
                    <Th className='border-none'>Họ tên</Th>
                    <Th className='border-none'>Chức vụ</Th>
                    <Th className='border-none'>Điện thoại</Th>
                    <Th className='border-none'>Email</Th>
                    <Th className='border-none'>Tên tài khoản</Th>
                    <Th className='border-none'>Trạng thái</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map(
                    ({
                      _id,
                      username,
                      fullName,
                      phoneNumber,
                      email,
                      jobTitle,
                      status,
                    }) => (
                      <Tr
                        onClick={(e) => {
                          if (e.target.id !== 'menu-button-userDiary') {
                            navigate(`/nguoi-dung/${_id}`);
                          }
                        }}
                        className='cursor-pointer'
                      >
                        <Td>{fullName}</Td>
                        <Td>{jobTitle}</Td>
                        <Td>{phoneNumber}</Td>
                        <Td>{email}</Td>
                        <Td>{username}</Td>
                        <Td>
                          <Badge
                            colorScheme={status === 'active' ? 'green' : 'red'}
                          >
                            {status}
                          </Badge>
                        </Td>
                      </Tr>
                    ),
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Users;
