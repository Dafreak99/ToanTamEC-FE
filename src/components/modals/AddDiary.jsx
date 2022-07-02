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
  CheckboxGroup,
  Tooltip,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
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

const AddDiary = ({ children, onSubmit: parentOnSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState(1);
  const [step1Content, setStep1Content] = useState(null);
  const [workContents, setWorkContents] = useState([]);
  const [num, setNum] = useState(0);

  const initialRef = React.useRef();
  const finalRef = React.useRef();

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
        "KHTC theo thời gian",
      ],
    },
  ];

  const addNewWorkRow = () => {
    const title = getValues("workContent");
    const existed = workContents.find(
      (workContent) => workContent.title === title
    );

    if (existed) {
      toast({
        status: "warning",
        position: "top-right",
        description: "Nội dung công việc đã tồn tại!",
      });
      return;
    }

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
    if (step === 1) {
      setStep1Content(data);
      setStep(step + 1);
    } else if (step === 2) {
      checkRequired();

      if (Object.keys(errors).length === 0) {
        // Change status here
        parentOnSubmit({ ...step1Content, workContents, status: "green" });
        onClose();
        reset();
        setWorkContents([]);
        setStep(1);
      }
    }
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

  const getForms = (title) => {
    const matchedContent = WORK_CONTENT.find(
      (content) => content.title === title
    );

    return matchedContent.forms.map((eachContent) => {
      const belongTo = workContents.find((work) => work.title === title);

      const existed =
        belongTo.forms.findIndex((form) => form.formType === eachContent) !==
        -1;

      return {
        title: eachContent,
        existed,
      };
    });
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

    if (name === "isOfficialFile") {
      val = checked;
    } else if (name === "attachedFile") {
      val = files[0];
    } else {
      val = value;
    }

    workContents[workIndex].forms[formIndex][name] = val;
    setNum(Math.random());
    setWorkContents(workContents);
  };

  const checkRequired = () => {
    clearErrors("workContents");

    if (workContents.length === 0) {
      setError(`workContents`, { type: "required" });
      return;
    }

    workContents.forEach((workContent, workIndex) => {
      workContent.forms.forEach((form, formIndex) => {
        if (!form.attachedFile) {
          setError(
            `workContents[${workIndex}].forms[${formIndex}].attachedFile`,
            { type: "required" }
          );
        }
      });
    });
  };

  const removeWorkContent = (index) => {
    let newContent = [...workContents];

    newContent.splice(index, 1);
    setWorkContents(newContent);

    for (let i = 0; i < workContents[index].forms.length; i++) {
      clearErrors(`workContents[${index}].forms[${i}].attachedFile`, {
        type: "required",
      });
    }
  };

  const removeForm = (workIndex, formIndex) => {
    let newContent = [...workContents];

    newContent[workIndex].forms.splice(formIndex, 1);

    newContent[workIndex].forms = [
      ...newContent[workIndex].forms.slice(0, formIndex),
      ...newContent[workIndex].forms.slice(formIndex),
    ];
    setWorkContents(newContent);
    setNum(Math.random());
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
              placeholder="Tự fill???"
              {...register("name", { required: true })}
            />
            {renderError("name")}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>
              Ngày làm việc <span className="text-red-500">*</span>
            </FormLabel>
            <Controller
              name="workingDate"
              control={control}
              defaultValue={step1Content?.workingDate || new Date()}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Datepicker
                  onChange={field.onChange}
                  defaultDate={step1Content?.workingDate || new Date()}
                />
              )}
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
                <CheckboxGroup {...field}>
                  <Stack direction="row">
                    <Checkbox value="morning">Sáng</Checkbox>
                    <Checkbox value="afternoon">Chiều</Checkbox>
                  </Stack>
                </CheckboxGroup>
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
          {errors?.workContents?.type === "required" && (
            <Box w="md" mx="auto">
              <Alert status="error" mb="2rem" borderRadius="md">
                <AlertIcon />
                <AlertTitle>Vui lòng thêm nội dung công việc!</AlertTitle>
              </Alert>
            </Box>
          )}
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
                        <MenuButton type="button">
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

                      <FaTrash onClick={() => removeWorkContent(index)} />
                    </Flex>
                  </Flex>

                  {forms.map((form, formIndex) => {
                    return (
                      <Flex
                        p="0.5rem 1rem"
                        columnGap={{ base: 0, md: "1rem" }}
                        rowGap={{ base: "0.5rem", md: 0 }}
                        flexWrap="wrap"
                      >
                        <Box className="flex-auto w-full md:w-4/12">
                          <FormControl>
                            <FormLabel htmlFor="formType" className="">
                              Loại biểu mẫu *
                            </FormLabel>

                            <Select
                              maxW="md"
                              bg="#fff"
                              name="formType"
                              defaultValue={form.formType}
                              value={form.formType}
                              className={form.formType}
                              onChange={(e) => onChange(e, index, formIndex)}
                            >
                              {getForms(title).map((form) => (
                                <option
                                  value={form.title}
                                  className={form.formType}
                                >
                                  {form.title}
                                </option>
                              ))}
                              {form.formType}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box className="flex-auto w-full md:w-4/12">
                          <FormControl>
                            <FormLabel
                              htmlFor={`attachedFile-${index}-${formIndex}`}
                            >
                              Tệp đính kèm *
                            </FormLabel>
                            <label
                              htmlFor={`attachedFile-${index}-${formIndex}`}
                            >
                              <Flex
                                alignItems="center"
                                bg="#fff"
                                p="6px 15px"
                                borderRadius="md"
                                border="1px solid"
                                borderColor={
                                  errors?.workContents?.[index]?.forms?.[
                                    formIndex
                                  ]?.attachedFile?.type === "required"
                                    ? "red.500"
                                    : "#CBD5E0"
                                }
                              >
                                <Box
                                  mr="0.5rem"
                                  fontSize="sm"
                                  p="2px 5px"
                                  bg="#E9EAEC"
                                  borderRadius="md"
                                >
                                  Tải tệp lên
                                </Box>
                                <Tooltip label={form.attachedFile?.name}>
                                  <Text>
                                    {form.attachedFile?.name.slice(0, 20)}{" "}
                                    {form.attachedFile?.name && "..."}
                                  </Text>
                                </Tooltip>
                              </Flex>
                            </label>
                            <Input
                              id={`attachedFile-${index}-${formIndex}`}
                              type="file"
                              accept=".xls,.xlsx"
                              display="none"
                              name="attachedFile"
                              onChange={(e) => onChange(e, index, formIndex)}
                            />
                            {errors?.workContents?.[index]?.forms?.[formIndex]
                              ?.attachedFile?.type === "required" && (
                              <ErrorMessage />
                            )}
                          </FormControl>
                        </Box>
                        <Flex
                          className="flex-auto w-full md:w-3/12"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Checkbox
                            name="isOfficialFile"
                            onChange={(e) => onChange(e, index, formIndex)}
                          >
                            Bản chính
                          </Checkbox>
                          <FaTrash
                            onClick={() => removeForm(index, formIndex)}
                          />
                        </Flex>
                      </Flex>
                    );
                  })}
                </Box>
              ))}
            </Box>
          )}

          <Flex
            justifyContent="center"
            alignItems="center"
            bg="#F8FAFC"
            p={{ base: "46px", md: "46px 0" }}
            border="1px dashed #CBD5E0"
            borderRadius="md"
            flexDirection={{ base: "column", md: "row" }}
          >
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
              marginLeft={{ base: 0, md: 4 }}
              marginTop={{ base: 4, md: 0 }}
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
            {step === 1 ? (
              <>
                <Button onClick={onClose} mr={3}>
                  Hủy
                </Button>
                <Button variant="primary" type="submit">
                  Tiếp theo
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setStep(step - 1)} mr={3}>
                  Trở về
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                  Lưu
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDiary;
