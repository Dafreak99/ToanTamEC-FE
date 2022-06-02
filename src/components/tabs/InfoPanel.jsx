import React, { useEffect, useState } from "react";
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";
import AddProject from "../modals/AddProject";
import EmployeeModal from "../modals/Employee";
import Spinner from "../Spinner";
import solution from "../../images/solution.svg";

function InfoPanel() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const cancelRef2 = React.useRef();

  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setTimeout(() => {
      setEmployees([]);
    });
  };

  const onSubmit = (data) => {
    setEmployees([...employees, data]);
  };

  const renderEmployeesTable = () => {
    if (!employees) {
      return <Spinner />;
    } else if (employees.length === 0) {
      return (
        <Flex
          justifyItems="center"
          alignItems="center"
          flexDir="column"
          py="90px"
        >
          <img src={solution} alt="solution" className="h-56 mb-10" />
          <p>Chưa có thành viên</p>
          <EmployeeModal onSubmit={onSubmit}>
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
      );
    } else {
      return (
        <>
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
                  <Tr className="cursor-pointer" key={i}>
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
                            onClick={onOpen2}
                          >
                            Xóa thông tin thành viên
                          </MenuItem>
                          <DeleteEmployeeConfirmation />
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
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa dự án
            </AlertDialogHeader>

            <AlertDialogBody textAlign={"center"}>
              <CgCloseO
                className="mx-auto mb-4"
                fontSize="3rem"
                color="#DE3B33"
              />
              Bạn thật sự muốn xóa dự án này?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  toast({
                    description: "Đã xóa dự án",
                    status: "success",
                    isClosable: true,
                    position: "top-right",
                  });
                  onClose();
                }}
                ml={3}
              >
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
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa dự án
            </AlertDialogHeader>

            <AlertDialogBody textAlign={"center"}>
              <CgCloseO
                className="mx-auto mb-4"
                fontSize="3rem"
                color="#DE3B33"
              />
              Bạn thật sự muốn xóa dự án này?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef2} onClick={onClose2}>
                Hủy
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  toast({
                    description: "Đã xóa thành viên",
                    status: "success",
                    isClosable: true,
                    position: "top-right",
                  });
                  onClose2();
                }}
                ml={3}
              >
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
            <MenuItem icon={<FaTrash />} color="red.500" onClick={onOpen}>
              Xóa thông tin dự án
            </MenuItem>
            <DeleteProjectConfirmation />
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

      {renderEmployeesTable()}
    </>
  );
}

export default InfoPanel;
