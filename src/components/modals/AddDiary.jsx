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
  Select,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Box,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "../../partials/actions/Datepicker";
import ErrorMessage from "../../utils/ErrorMessage";
import { format } from "date-fns";

/**
 *
 * @children Pass in the button
 */

const AddDiary = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const [workContents, setWorkContents] = useState([]);

  const addNewWorkContent = () => {
    const newWorkContent = {
      title: getValues("workContent"),
      content: [
        {
          formType: null,
          attachedFile: null,
          isOfficialFile: false,
        },
      ],
    };

    setWorkContents([...workContents, newWorkContent]);
  };

  const onSubmit = (data) => {
    console.log(data);

    setStep(step + 1);
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

  const renderStep = () => {
    if (step === 1) {
      return (
        <>
          <FormControl>
            <FormLabel>
              Họ và tên <span className="text-red-500">*</span>
            </FormLabel>
            <Input
              ref={initialRef}
              // defaultValue="Nguyễn Hoàng Phúc"
              {...register("name", { required: true })}
            />
            {renderError("projectName")}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>
              Ngày làm việc <span className="text-red-500">*</span>
            </FormLabel>
            <Controller
              name="workingDate"
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
              Buổi làm việc <span className="text-red-500">*</span>
            </FormLabel>
            <Controller
              name="workingSession"
              defaultValue="morning"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack direction="row">
                    <Radio value="morning">Sáng</Radio>
                    <Radio value="afternoon">Chiều</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>
              Công trình<span className="text-red-500">*</span>
            </FormLabel>
            <Controller
              name="workingLocation"
              control={control}
              defaultValue="workingLocation1"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select {...field}>
                  <option value="workingLocation1">Công trình 1</option>
                  <option value="1">Two</option>
                  <option value="1">Three</option>
                </Select>
              )}
            />

            {renderError("workingLocation")}
          </FormControl>
        </>
      );
    } else {
      return (
        <Box>
          <Box maxH="400px" overflow="scroll">
            {workContents.map(({ title, content }, index) => (
              <Box
                bg="#F8FAFC"
                border="1px solid #CBD5E0"
                borderRadius="md"
                mb="2rem"
              >
                <Box p="0.5rem 1rem" fontSize="xs">
                  {index + 1}. {title}
                </Box>

                {content.map((eachContent) => (
                  <Flex p="0.5rem 1rem" alignItems="flex-end" columnGap="1rem">
                    <Box className="w-5/12">
                      <FormControl>
                        <FormLabel htmlFor="formType">
                          Loại biểu mẫu *
                        </FormLabel>
                        <Controller
                          name="formType"
                          control={control}
                          defaultValue="Trình duyệt KHTC"
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <Select maxW="md" bg="#fff" {...field}>
                              <option value="Trình duyệt KHTC">
                                Trình duyệt KHTC
                              </option>
                              <option value="Lập hồ sơ khởi công công trình">
                                Lập hồ sơ khởi công công trình
                              </option>
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Box>
                    <Box className="w-5/12">
                      <FormControl>
                        <FormLabel htmlFor="attachedFile">
                          Tệp đính kèm *
                        </FormLabel>
                        <label htmlFor="attachedFile">
                          <Flex
                            alignItems="center"
                            bg="#fff"
                            p="4px 15px"
                            borderRadius="md"
                            border="1px solid #CBD5E0"
                          >
                            <Box
                              mr="0.5rem"
                              fontSize="md"
                              p="2px 5px"
                              bg="#E9EAEC"
                              borderRadius="md"
                            >
                              Tải tệp lên
                            </Box>
                            <Text>20220606_LenhKhoiCong.docx</Text>
                          </Flex>
                        </label>
                        <Input id="attachedFile" type="file" display="none" />
                      </FormControl>
                    </Box>
                    <Box className="w-2/12">
                      <Checkbox>Bản chính</Checkbox>
                    </Box>
                  </Flex>
                ))}
              </Box>
            ))}
          </Box>

          <Flex
            justifyContent="center"
            bg="#F8FAFC"
            p="46px 0"
            border="1px dashed #CBD5E0"
            borderRadius="md"
          >
            {/* TODO: Need to have a predefined list for Works & Papers */}
            <Controller
              name="workContent"
              control={control}
              defaultValue="Trình duyệt KHTC"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select maxW="md" bg="#fff" {...field}>
                  <option value="Trình duyệt KHTC">Trình duyệt KHTC</option>
                  <option value="Lập hồ sơ khởi công công trình">
                    Lập hồ sơ khởi công công trình
                  </option>
                </Select>
              )}
            />

            <Button
              className="ml-4"
              leftIcon={<IoAdd color="#fff" />}
              variant="primary"
              onClick={addNewWorkContent}
            >
              Thêm công việc
            </Button>
          </Flex>
        </Box>
      );
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
        size={step === 1 ? "lg" : "5xl"}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader textAlign="center" fontSize="lg">
            {step === 1 ? (
              "Thêm nhật ký công việc"
            ) : (
              <>
                Công trình {getValues("workingLocation")}
                <Text fontSize="sm" fontWeight="normal">
                  Ngày: {format(getValues("workingDate"), "dd/MM/yyyy")} -{" "}
                  {getValues("name")}
                </Text>
              </>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{renderStep()}</ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Hủy
            </Button>
            {step === 1 ? (
              <Button variant="primary" type="submit">
                Tiếp theo
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Lưu
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDiary;
