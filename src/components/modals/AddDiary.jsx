import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useProjects } from '../../hooks/useProjects';
import { useWorkContents } from '../../hooks/useWorkContents';
import { useAddWorkDiary } from '../../hooks/useWorkDiaries';
import Datepicker from '../../partials/actions/Datepicker';
import { axios } from '../../utils/axios';
import ErrorMessage from '../../utils/ErrorMessage';
import { showToast } from '../../utils/toast';

/**
 *
 * @children Pass in the button
 */

const AddDiary = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset,
    unregister,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState(1);
  const [step1Content, setStep1Content] = useState(null);
  const [workContents, setWorkContents] = useState([]);
  const [, setNum] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    auth: { _id, fullName },
  } = useSelector((state) => state.user);

  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const queryClient = useQueryClient();

  const onSuccess = (data) => {
    setLoading(false);
    queryClient.setQueryData('work-diaries', (oldData) => {
      return { data: [...oldData.data, data.data] };
    });

    setStep(1);
    onClose();
    reset({
      user: fullName,
    });
    setWorkContents([]);
  };

  const onError = (err) => {
    setLoading(false);
    console.log('Error', err);
    showToast('error', 'Lỗi khi thêm nhật ký');
  };

  const { data: WORK_CONTENT } = useWorkContents(null, onError);

  const { data: projects } = useProjects();
  const { mutate: addWorkDiary } = useAddWorkDiary(onSuccess, onError);

  useEffect(() => {
    setValue('user', fullName);
  }, [fullName]);

  const getFirstForm = (workTitle) => {
    return WORK_CONTENT.find((content) => content.name === workTitle).docs[0];
  };

  const checkRequired = () => {
    clearErrors('workContents');

    if (workContents.length === 0) {
      setError(`workContents`, { type: 'required' });
      return;
    }

    workContents.forEach((workContent, workIndex) => {
      workContent.docs.forEach((doc, docIndex) => {
        if (!doc.proof) {
          setError(`workContents[${workIndex}].docs[${docIndex}].proof`, {
            type: 'required',
          });
        }
      });
    });
  };

  const getForms = (name) => {
    const matchedContent = WORK_CONTENT.find(
      (content) => content.name === name,
    );

    return matchedContent.docs.map((eachContent) => {
      const belongTo = workContents.find((work) => work.name === name);

      const existed =
        belongTo.docs.findIndex((form) => form.name === eachContent.name) !==
        -1;

      return {
        ...eachContent,
        existed,
      };
    });
  };

  const addNewForm = (workTitle, doc) => {
    const forms = getForms(workTitle);

    if (forms.length === 1) {
      toast({
        status: 'warning',
        description: 'Nội dung công việc này chỉ có 1 loại biểu mẫu!',
        position: 'top-right',
      });
      return;
    }
    const index = workContents.findIndex((work) => work.name === workTitle);

    workContents[index].docs.push({
      ...doc,
      proof: null,
      draft: true,
    });
    setWorkContents(workContents);

    setNum(Math.random());
  };

  const addNewWorkRow = () => {
    const name = getValues('workContent');
    const existed = workContents.find(
      (workContent) => workContent.name === name,
    );

    if (existed) {
      toast({
        status: 'warning',
        position: 'top-right',
        description: 'Nội dung công việc đã tồn tại!',
      });
      return;
    }

    const { _id: workId } = WORK_CONTENT.find((work) => work.name === name);

    const newWorkContent = {
      name,
      _id: workId,
      docs: [
        {
          ...getFirstForm(name),
          proof: null,
          draft: true,
        },
      ],
    };
    setWorkContents([...workContents, newWorkContent]);
  };

  console.log(errors);

  const onSubmit = async (data) => {
    if (step === 1) {
      console.log(data.shift);

      setStep1Content(data);
      setStep(step + 1);
    } else if (step === 2) {
      checkRequired();

      if (Object.keys(errors).length === 0) {
        setLoading(true);

        const works = await Promise.all(
          workContents.map(async (workContent) => {
            return {
              ...workContent,
              docs: await Promise.all(
                workContent.docs.map(async (doc) => {
                  const formData = new FormData();
                  formData.append('proof', doc.proof);
                  formData.append('projectId', step1Content.project);
                  const {
                    data: { Location },
                  } = await axios.post('/upload', formData);

                  return {
                    ...doc,
                    proof: Location,
                  };
                }),
              ),
            };
          }),
        );

        addWorkDiary({
          ...step1Content,
          workingDate: format(step1Content.workingDate, 'yyyy-MM-dd'),
          workDiaryDetail: { workContents: works },
          user: _id,
          shift:
            typeof step1Content.shift === 'object' &&
            step1Content.shift.length === 2
              ? 2
              : +step1Content.shift,
        });
      }
    }
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: onOpen });
    }
    return child;
  });

  const renderError = (name, type = 'required') => {
    if (name in errors && errors[name].type === type) {
      return <ErrorMessage />;
    }

    return null;
  };

  const onChange = (e, workIndex, formIndex) => {
    const { name, value, checked, files } = e.target;
    let val;

    if (name === 'draft') {
      val = !checked;
    } else if (name === 'proof') {
      val = files[0];
    } else {
      val = value;
    }

    workContents[workIndex].docs[formIndex][name] = val;
    setNum(Math.random());
    setWorkContents(workContents);
  };

  const removeWorkContent = (index) => {
    const newContent = [...workContents];

    newContent.splice(index, 1);
    setWorkContents(newContent);

    for (let i = 0; i < workContents[index].docs.length; i++) {
      clearErrors(`workContents[${index}].docs[${i}].proof`, {
        type: 'required',
      });
    }
  };

  const removeForm = (workIndex, formIndex) => {
    const newContent = [...workContents];

    newContent[workIndex].docs.splice(formIndex, 1);

    newContent[workIndex].docs = [
      ...newContent[workIndex].docs.slice(0, formIndex),
      ...newContent[workIndex].docs.slice(formIndex),
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
              Họ và tên <span className='text-red-500'>*</span>
            </FormLabel>
            <Input
              ref={initialRef}
              disabled
              placeholder={fullName}
              {...register('user', { required: true })}
            />
            {renderError('user')}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>
              Ngày làm việc <span className='text-red-500'>*</span>
            </FormLabel>
            <Controller
              name='workingDate'
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
              Buổi làm việc <span className='text-red-500'>*</span>
            </FormLabel>
            <Controller
              name='shift'
              defaultValue='0'
              value='0'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <CheckboxGroup {...field}>
                  <Stack direction='row'>
                    <Checkbox value='0'>Sáng</Checkbox>
                    <Checkbox value='1'>Chiều</Checkbox>
                  </Stack>
                </CheckboxGroup>
              )}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>
              Công trình<span className='text-red-500'>*</span>
            </FormLabel>
            <Controller
              name='project'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select {...field}>
                  <option value={null} disabled selected>
                    Chọn công trình
                  </option>
                  {projects?.map(({ _id, name }) => (
                    <option value={_id}>{name}</option>
                  ))}
                </Select>
              )}
            />

            {renderError('workingLocation')}
          </FormControl>
        </>
      );
    }

    return (
      <Box>
        {errors?.workContents?.type === 'required' && (
          <Box w='md' mx='auto'>
            <Alert status='error' mb='2rem' borderRadius='md'>
              <AlertIcon />
              <AlertTitle>Vui lòng thêm nội dung công việc!</AlertTitle>
            </Alert>
          </Box>
        )}

        {workContents.length > 0 && WORK_CONTENT.length > 0 && (
          <Box maxH='400px' overflow='scroll' mb='2rem' px='0.5rem'>
            {workContents.map(({ name, docs }, index) => (
              <Box
                bg='#F8FAFC'
                border='1px solid #CBD5E0'
                borderRadius='md'
                mb='2rem'
              >
                <Flex
                  p='0.5rem 1rem'
                  justifyContent='space-between'
                  alignItems='center'
                  borderBottom='1px solid #CBD5E0'
                >
                  <Text fontSize='xs'>
                    {index + 1}. {name}
                  </Text>
                  <Flex>
                    <Menu>
                      <MenuButton type='button'>
                        <FaPlus className='mr-3' />
                      </MenuButton>
                      <MenuList>
                        {getForms(name).map((doc) => (
                          <MenuItem
                            isDisabled={doc.existed}
                            // Thêm biểu mẫu
                            onClick={() => addNewForm(name, doc)}
                          >
                            {doc.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>

                    <FaTrash onClick={() => removeWorkContent(index)} />
                  </Flex>
                </Flex>

                {docs.map((doc, docIndex) => {
                  return (
                    <Flex
                      p='0.5rem 1rem'
                      columnGap={{ base: 0, md: '1rem' }}
                      rowGap={{ base: '0.5rem', md: 0 }}
                      flexWrap='wrap'
                    >
                      <Box className='flex-auto w-full md:w-4/12'>
                        <FormControl>
                          <FormLabel htmlFor='name' className=''>
                            Loại biểu mẫu *
                          </FormLabel>

                          <Select
                            maxW='md'
                            bg='#fff'
                            name='name'
                            defaultValue={doc.name}
                            value={doc.name}
                            className={doc.name}
                            onChange={(e) => onChange(e, index, docIndex)}
                          >
                            {getForms(name).map((formOption) => (
                              <option
                                value={formOption.name}
                                className={formOption.name}
                              >
                                {formOption.name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box className='flex-auto w-full md:w-4/12'>
                        <FormControl>
                          <FormLabel htmlFor={`proof-${index}-${docIndex}`}>
                            Tệp đính kèm *
                          </FormLabel>
                          <label htmlFor={`proof-${index}-${docIndex}`}>
                            <Flex
                              alignItems='center'
                              bg='#fff'
                              p='6px 15px'
                              borderRadius='md'
                              border='1px solid'
                              borderColor={
                                errors?.workContents?.[index]?.docs?.[docIndex]
                                  ?.proof?.type === 'required'
                                  ? 'red.500'
                                  : '#CBD5E0'
                              }
                            >
                              <Box
                                mr='0.5rem'
                                fontSize='sm'
                                p='2px 5px'
                                bg='#E9EAEC'
                                borderRadius='md'
                              >
                                Tải tệp lên
                              </Box>
                              <Tooltip label={doc.proof?.name}>
                                <Text>
                                  {doc.proof?.name.slice(0, 20)}{' '}
                                  {doc.proof?.name && '...'}
                                </Text>
                              </Tooltip>
                            </Flex>
                          </label>
                          <Input
                            id={`proof-${index}-${docIndex}`}
                            type='file'
                            accept='.pdf, .jpg, .jpeg, .png, .webp'
                            display='none'
                            name='proof'
                            onChange={(e) => onChange(e, index, docIndex)}
                          />
                          {errors?.workContents?.[index]?.docs?.[docIndex]
                            ?.proof?.type === 'required' && <ErrorMessage />}
                        </FormControl>
                      </Box>
                      <Flex
                        className='flex-auto w-full md:w-3/12'
                        justifyContent='space-between'
                        alignItems='center'
                      >
                        <Checkbox
                          name='draft'
                          onChange={(e) => onChange(e, index, docIndex)}
                        >
                          Bản chính
                        </Checkbox>
                        <FaTrash onClick={() => removeForm(index, docIndex)} />
                      </Flex>
                    </Flex>
                  );
                })}
              </Box>
            ))}
          </Box>
        )}

        {WORK_CONTENT?.length > 0 && (
          <Flex
            justifyContent='center'
            alignItems='center'
            bg='#F8FAFC'
            p={{ base: '46px', md: '46px 0' }}
            border='1px dashed #CBD5E0'
            borderRadius='md'
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Controller
              name='workContent'
              control={control}
              defaultValue={WORK_CONTENT[0].name}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select maxW='md' bg='#fff' {...field}>
                  {WORK_CONTENT.map((content) => (
                    <option value={content.name}>{content.name}</option>
                  ))}
                </Select>
              )}
            />

            <Button
              marginLeft={{ base: 0, md: 4 }}
              marginTop={{ base: 4, md: 0 }}
              leftIcon={<IoAdd color='#fff' />}
              variant='primary'
              onClick={addNewWorkRow}
            >
              Thêm công việc
            </Button>
          </Flex>
        )}
      </Box>
    );
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
        size={step === 1 ? 'lg' : '5xl'}
      >
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader textAlign='center' fontSize='lg'>
            {step === 1 ? (
              'Thêm nhật ký công việc'
            ) : (
              <>
                Công trình {getValues('workingLocation')}
                <Text fontSize='sm' fontWeight='normal'>
                  Ngày: {format(getValues('workingDate'), 'dd/MM/yyyy')} -{' '}
                  {getValues('name')}
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
                <Button variant='primary' type='submit'>
                  Tiếp theo
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    unregister('workContents');
                  }}
                  mr={3}
                >
                  Trở về
                </Button>
                <Button variant='primary' disabled={loading} onClick={onSubmit}>
                  {loading && <Spinner fontSize='1rem' mr='8px' />} Lưu
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
