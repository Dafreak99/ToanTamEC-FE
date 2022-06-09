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

const AddLocation = ({ children, onSubmit: parentOnSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    parentOnSubmit(data);
    onClose();
  };

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
          <ModalHeader textAlign="center">Thêm kênh</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                Tên kênh <span className="text-red-500">*</span>
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder="Tên kênh"
                {...register("locationName", { required: true })}
              />
              {renderError("locationName")}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Hủy
            </Button>
            <Button background="primary" color="white" type="submit">
              Thêm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddLocation;
