import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AddProject from "../components/modals/AddProject";
import "react-datepicker/dist/react-datepicker.css";
import { IoAdd } from "react-icons/io5";

function Projects() {
  const navigate = useNavigate();

  const TOTAL = 16;

  return (
    <div className="w-full bg-white shadow-lg p-4">
      <h3 className="h3">Tất cả dự án</h3>
      <hr className="mb-6" />
      <div className="flex mb-8">
        <div className="w-60">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch color="gray.300" />}
              fontSize="xl"
            />
            <Input placeholder="Nhập từ khóa" />
          </InputGroup>
        </div>

        <AddProject>
          <Button
            className="ml-auto"
            leftIcon={<IoAdd color="#fff" />}
            background="primary"
            color="white"
          >
            Tạo dự án
          </Button>
        </AddProject>
      </div>

      <TableContainer>
        <Table size="sm" variant="striped">
          <Thead>
            <Tr>
              <Th>Mã dự án</Th>
              <Th>Tên dự án</Th>
              <Th>Chỉnh sửa lần cuối</Th>
              <Th>Người chỉnh sửa</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: TOTAL }, (_, i) => (
              <Tr
                onClick={() => navigate(`/project/${i}`)}
                className="cursor-pointer"
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
      <small className="mt-4 inline-block">Tổng cộng có {TOTAL} dự án</small>
    </div>
  );
}

export default Projects;
