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
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AddProject from '../components/modals/AddProject';

function Projects() {
  const navigate = useNavigate();

  const TOTAL = 16;

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
        </div>

        <TableContainer>
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
              {Array.from({ length: TOTAL }, (_, i) => (
                <Tr
                  onClick={() => navigate(`/du-an/${i}`)}
                  className='cursor-pointer'
                >
                  <Td>001</Td>
                  <Td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Td>
                  <Td>12/12/2022</Td>
                  <Td>hoangphuc</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <small className='mt-4 inline-block'>Tổng cộng có {TOTAL} dự án</small>
      </div>
    </Layout>
  );
}

export default Projects;
