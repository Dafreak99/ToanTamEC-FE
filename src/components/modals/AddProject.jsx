import React, { useState } from "react";
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
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";

/**
 *
 * @children Pass in the button
 */

const AddProject = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState(new Date());

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  console.log(children);
  const onSubmit = (data) => console.log(data);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: onOpen });
    }
    return child;
  });

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
          <ModalHeader textAlign="center">Thông tin dự án</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                Tên dự án <span className="text-red-500">*</span>
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder="Tên dự án"
                {...register("projectName", { required: true })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Địa điểm <span className="text-red-500">*</span>
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder="Địa điểm"
                {...register("location", { required: true })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Thời điểm khởi công <span className="text-red-500">*</span>
              </FormLabel>

              <Controller
                name="startDate"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <DatePicker
                    locale="vn-VN"
                    {...field}
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                  />
                )}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Căn cứ nghiệm thu<span className="text-red-500">*</span>
              </FormLabel>
              <Textarea
                placeholder="Nhập căn cứ nghiệm thu"
                {...register("basedAcceptance", { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Hủy
            </Button>
            <Button background="primary" color="white" type="submit">
              Tạo dự án
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProject;
