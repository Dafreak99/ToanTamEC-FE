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
  RadioGroup,
  Stack,
  Radio,
  Text,
  Box,
  Flex,
  Checkbox,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "../../partials/actions/Datepicker";
import ErrorMessage from "../../utils/ErrorMessage";
import { format } from "date-fns";
import { FaTrash, FaPlus } from "react-icons/fa";
/**
 *
 * @children Pass in the button
 */

const AddDiary = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
  const [num, setNum] = useState(0);

  const WORK_CONTENT = [
    {
      title: "Khảo sát công trường (cho TK, cho HSDT)",
      forms: ["Báo cáo khảo sát công trường"],
    },
    {
      title: "Tham gia lập hồ sơ dự toán",
      forms: [
        "Danh mục VTTB",
        "BPTCTC",
        "Tiến độ, Biểu đồ nhân lực",
        "KHTC tổng thể",
      ],
    },
    {
      title: "Lập hồ sơ khởi công công trình",
      forms: [
        "Lệnh khởi công",
        "CV thông báo khởi công",
        "QĐ phân công nhiệm vụ BCHCT",
        "Danh sách Công nhân, CNKT, KTV",
        "Danh sách phương tiện, thiết bị thi công",
        "Biện pháp tổ chức thi công",
        "KHTC theo đoạn tuyến",
        "KHTC theo thời gian]",
      ],
    },
  ];

  useEffect(() => {}, [num]);

  const addNewWorkRow = () => {
    const title = getValues("workContent");
    const newWorkContent = {
      title,
      forms: [
        {
          formType: getFirstForm(title),
          attachedFile: null,
          isOfficialFile: false,
        },
      ],
    };
    setWorkContents([...workContents, newWorkContent]);
  };

  const getFirstForm = (workTitle) => {
    return WORK_CONTENT.find((content) => content.title === workTitle).forms[0];
  };

  const onSubmit = (data) => {
    console.log(data);

    setStep(step + 1);
  };

  const addNewForm = (workTitle, formTitle) => {
    const forms = getForms(workTitle);

    if (forms.length === 1) {
      toast({
        status: "warning",
        description: "Nội dung công việc này chỉ có 1 loại biểu mẫu!",
        position: "top-right",
      });
      return;
    }
    let index = workContents.findIndex((work) => work.title === workTitle);

    workContents[index].forms.push({
      formType: formTitle,
      attachedFile: null,
      isOfficialFile: false,
    });
    setWorkContents(workContents);
    setNum(Math.random());
  };

  console.log(workContents);

  const getForms = (title) => {
    const matchedContent = WORK_CONTENT.find(
      (content) => content.title === title
    );

    return matchedContent.forms.map((aaa) => {
      const belongTo = workContents.find((work) => work.title === title);

      const existed =
        belongTo.forms.findIndex((form) => form.formType === aaa) !== -1;

      return {
        title: aaa,
        existed,
      };
    });
  };

  const getFormsMinimal = (title) => {
    return WORK_CONTENT.find((content) => content.title === title).forms;
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

  const onChange = (e, workIndex, formIndex) => {
    const { name, value, checked, files } = e.target;

    let val;

    console.log(name);

    if (name === "isOfficialFile") {
      val = checked;
    } else if (name === "attachedFile") {
      val = files[0];
    } else {
      val = value;
    }

    console.log(val);

    workContents[workIndex].forms[formIndex][name] = val;

    setWorkContents(workContents);
    console.log(workContents);
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
          {workContents.length > 0 && (
            <Box maxH="400px" overflow="scroll" mb="2rem" px="0.5rem">
              {workContents.map(({ title, forms }, index) => (
                <Box
                  bg="#F8FAFC"
                  border="1px solid #CBD5E0"
                  borderRadius="md"
                  mb="2rem"
                >
                  <Flex
                    p="0.5rem 1rem"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="1px solid #CBD5E0"
                  >
                    <Text fontSize="xs">
                      {index + 1}. {title}
                    </Text>
                    <Flex>
                      <Menu>
                        <MenuButton>
                          <FaPlus className="mr-3" />
                        </MenuButton>
                        <MenuList>
                          {getForms(title).map((form) => (
                            <MenuItem
                              isDisabled={form.existed}
                              // Thêm biểu mẫu
                              onClick={() => addNewForm(title, form.title)}
                            >
                              {form.title}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>

                      <FaTrash />
                    </Flex>
                  </Flex>

                  {forms.map((form, formIndex) => (
                    <Flex
                      p="0.5rem 1rem"
                      alignItems="flex-end"
                      columnGap={{ base: 0, md: "1rem" }}
                      rowGap={{ base: "0.5rem", md: 0 }}
                      flexWrap="wrap"
                    >
                      <Box className="w-full md:w-4/12">
                        <FormControl>
                          <FormLabel htmlFor="formType" className="">
                            Loại biểu mẫu *
                          </FormLabel>

                          <Select
                            maxW="md"
                            bg="#fff"
                            name="formType"
                            defaultValue={form.formType}
                            onChange={(e) => onChange(e, index, formIndex)}
                          >
                            {getForms(title).map((form) => (
                              <option value={form.title}>{form.title}</option>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box className="w-full md:w-5/12">
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
                          <Input
                            id="attachedFile"
                            type="file"
                            display="none"
                            name="attachedFile"
                            onChange={(e) => onChange(e, index, formIndex)}
                          />
                        </FormControl>
                      </Box>
                      <Box className="w-full md:w-2/12">
                        <Checkbox
                          name="isOfficialFile"
                          onChange={(e) => onChange(e, index, formIndex)}
                        >
                          Bản chính
                        </Checkbox>
                      </Box>
                    </Flex>
                  ))}
                </Box>
              ))}
            </Box>
          )}

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
              defaultValue={WORK_CONTENT[0].title}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select maxW="md" bg="#fff" {...field}>
                  {WORK_CONTENT.map((content) => (
                    <option value={content.title}>{content.title}</option>
                  ))}
                </Select>
              )}
            />

            <Button
              className="ml-4"
              leftIcon={<IoAdd color="#fff" />}
              variant="primary"
              onClick={addNewWorkRow}
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
