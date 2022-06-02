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
import { Controller, useForm } from "react-hook-form";
import Datepicker from "../../partials/actions/Datepicker";
import ErrorMessage from "../../utils/ErrorMessage";

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

  const onSubmit = (data) => console.log(data);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: onOpen });
    }
    return child;
  });

  const renderError = (name, type = "required") => {
    if (name in errors && errors[name].type === type) {
      return <ErrorMessage />;
    }
  };

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
              {renderError("projectName")}
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
              {renderError("location")}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Thời điểm khởi công <span className="text-red-500">*</span>
              </FormLabel>

              <Controller
                name="startDate"
                control={control}
                defaultValue={new Date()}
                rules={{
                  required: true,
                }}
                render={({ field }) => <Datepicker onChange={field.onChange} />}
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
              {renderError("basedAcceptance")}
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
