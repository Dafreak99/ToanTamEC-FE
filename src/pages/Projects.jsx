import {
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
import { format } from 'date-fns';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AddProject from '../components/modals/AddProject';
import Spinner from '../components/Spinner';
import { useProjects } from '../hooks/useProjects';

function Projects() {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user.auth);

  const { data: projects, isLoading } = useProjects();

  return (
    <Layout>
      <div className='w-full bg-white shadow-lg p-4'>
        <h3 className='h3'>Tất cả dự án</h3>
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

          {role !== 3 ? (
            <AddProject>
              <Button
                className='ml-auto'
                leftIcon={<IoAdd color='#fff' />}
                background='primary'
                color='white'
              >
                Tạo dự án
              </Button>
            </AddProject>
          ) : (
            <></>
          )}
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TableContainer height='65vh'>
              <Table size='sm' variant='striped'>
                <Thead>
                  <Tr textTransform='lowercase'>
                    <Th className='border-none'>Mã dự án</Th>
                    <Th className='border-none'>Tên dự án</Th>
                    <Th className='border-none'>Chỉnh sửa lần cuối</Th>
                    <Th className='border-none'>Người chỉnh sửa</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {projects.map(({ _id, code, name, updatedAt, updatedBy }) => (
                    <Tr
                      onClick={() => navigate(`/du-an/${_id}`)}
                      className='cursor-pointer'
                    >
                      <Td>{code}</Td>
                      <Td>{name}</Td>
                      <Td>{format(new Date(updatedAt), 'dd/MM/yyyy')}</Td>
                      <Td>{updatedBy?.username}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <small className='mt-4 inline-block'>
              Tổng cộng có {projects.length} dự án
            </small>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Projects;
