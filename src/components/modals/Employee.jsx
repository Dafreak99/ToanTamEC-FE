import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";

/**
 *
 * @children Pass in the button
 */

const EmployeeModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState(new Date());

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: onOpen });
    }
    return child;
  });

  useEffect(() => {
    return function () {
      reset();
    };
  }, [isOpen]);

  return (
    <>
      {/* Button */}
      {childrenWithProps}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader textAlign="center">Thêm thành viên</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tài khoản người dùng</FormLabel>
              <Input
                ref={initialRef}
                _placeholder="Nhập tên người dùng"
                {...register("userName")}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Họ và tên <span className="text-red-500">*</span>
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder="Nhập họ và tên thành viên"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <p class="text-red-500 mt-1 text-xs">Vui lòng nhập họ tên</p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Chức vụ <span className="text-red-500">*</span>
              </FormLabel>

              <Controller
                name="jobTitle"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select {...field} placeholder="Chọn chức vụ">
                    <option value="option1">Chỉ huy trưởng công trình</option>
                    <option value="option2">Kỹ thuật viên thi công</option>
                    <option value="option3">Giám sát viên</option>
                  </Select>
                )}
              />
              {errors.jobTitle && (
                <p class="text-red-500 mt-1 text-xs">Vui lòng chọn chức vụ</p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Số điện thoại</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Nhập sđt"
                {...register("phone")}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="user@example.com"
                type="email"
                {...register("phone")}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Hủy
            </Button>
            <Button background="primary" color="white" type="submit">
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmployeeModal;
