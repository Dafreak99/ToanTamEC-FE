import React from "react";
import {
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import AddProject from "../modals/AddProject";
import EmployeeModal from "../modals/Employee";

function InfoPanel() {
  const toast = useToast();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading fontSize="xl" marginBottom={3}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </Heading>

        <Menu>
          <MenuButton>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <AddProject>
              <MenuItem icon={<MdModeEdit />}>Sửa thông tin dự án</MenuItem>
            </AddProject>
            <MenuItem
              icon={<FaTrash />}
              color="red.500"
              onClick={() =>
                toast({
                  description: "Đã xóa dự án",
                  status: "success",
                  isClosable: true,
                  position: "top-right",
                })
              }
            >
              Xóa thông tin dự án
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <p className="mb-3">
        <strong>Địa điểm: </strong>Lorem, ipsum dolor sit amet consectetur
        adipisicing elit
      </p>
      <p className="mb-3">
        <strong>Thời gian khởi công: </strong>Chưa có dữ liệu
      </p>
      <p className="mb-3">
        <strong>Căn chứ nghiệm thu: </strong>Chưa có dữ liệu
      </p>
      <h3 className="h3 mt-12">Thành viên tham gia</h3>
      <hr />

      <Flex justifyContent="space-between" alignItems="center">
        <EmployeeModal>
          <Button
            className="mt-3"
            leftIcon={<IoAdd color="#fff" />}
            background="primary"
            color="white"
            variant="solid"
            size="md"
          >
            Thêm thành viên
          </Button>
        </EmployeeModal>
      </Flex>

      <TableContainer marginTop={6}>
        <Table size="sm" variant="striped">
          <Thead>
            <Tr>
              <Th>Họ tên</Th>
              <Th>Chức vụ</Th>
              <Th>Thông tin liên hệ</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 8 }, (_, i) => (
              <Tr className="cursor-pointer">
                <Td>Trần Văn A</Td>
                <Td>Chỉ huy trưởng công trình</Td>
                <Td>0987654321</Td>
                <Td>
                  <Menu>
                    <MenuButton>
                      <BsThreeDotsVertical />
                    </MenuButton>
                    <MenuList>
                      <AddProject>
                        <MenuItem icon={<MdModeEdit />}>
                          Sửa thông tin thành viên
                        </MenuItem>
                      </AddProject>
                      <MenuItem
                        icon={<FaTrash />}
                        color="red.500"
                        onClick={() =>
                          toast({
                            description: "Đã xóa dự án",
                            status: "success",
                            isClosable: true,
                            position: "top-right",
                          })
                        }
                      >
                        Xóa thông tin thành viên
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default InfoPanel;
