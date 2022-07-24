import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillSave } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { GiSaveArrow } from 'react-icons/gi';
import report from '../../images/BM.png';
import DatePicker from '../../partials/actions/Datepicker';
import TimePicker from '../../partials/actions/TimePicker';

const ReportReview = ({ isOpen, onClose, onSubmit: parentOnSubmit }) => {
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

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size='5xl'
    >
      <ModalOverlay />
      <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
        <ModalCloseButton />
        <ModalBody p='4rem' pb='0'>
          <Grid gridTemplateColumns='repeat(12, 1fr)'>
            <Box gridColumn='span 4'>
              <Image src={report} alt='report' />
            </Box>
            <Box gridColumn='span 8'>
              <Heading fontSize='18px' mb='12px'>
                Tên biểu mẫu
              </Heading>
              <List fontSize='sm' spacing={4}>
                <ListItem>
                  <strong>Công việc:</strong> Nghiệm thu đào đất hố móng neo
                </ListItem>
                <ListItem
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <strong>Thời gian bắt đầu nghiệm thu:</strong>
                  <Flex alignItems='center'>
                    <TimePicker />
                    <Box mx='0.5rem'>ngày:</Box> <DatePicker />
                  </Flex>
                </ListItem>
                <ListItem
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <strong>Thời gian kết thúc nghiệm thu:</strong>
                  <Flex alignItems='center'>
                    <TimePicker />
                    <Box mx='0.5rem'>ngày:</Box> <DatePicker />
                  </Flex>
                </ListItem>

                <ListItem
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Box as='strong' w='65%'>
                    Địa điểm nghiệm thu:
                  </Box>
                  <Input
                    ml='1rem'
                    type='text'
                    placeholder='Nhập địa điếm'
                    {...register('location', { type: 'required' })}
                  />
                </ListItem>
                <ListItem>
                  <strong>Thành viên nghiệm thu:</strong>
                  <Grid gridTemplate='repeat(2,1fr)' mt='0.5rem' pl='1rem'>
                    <Flex mb='0.5rem' alignItems='center'>
                      <Text w='65%'>Chỉ huy trưởng công trình:</Text>
                      <Input
                        type='text'
                        placeholder='Nhập chỉ huy trưởng'
                        {...register('location', { type: 'required' })}
                      />
                    </Flex>
                    <Flex alignItems='center'>
                      <Text w='65%'>Kỹ thuật viên thi công trực tiếp:</Text>
                      <Input
                        type='text'
                        placeholder='Nhập kỹ thuật viên'
                        {...register('location', { type: 'required' })}
                      />
                    </Flex>
                  </Grid>
                </ListItem>
                <ListItem>
                  <strong>Ngày tạo:</strong> 23/12/2022 12:12:12
                </ListItem>
                <ListItem>
                  <strong>Người tạo:</strong> hoang phuc
                </ListItem>
                <ListItem display='flex' mt='2rem !important'>
                  <Button
                    leftIcon={<FaTrash color='#000' />}
                    mr='1rem'
                    variant='ghost'
                  >
                    Xoá
                  </Button>

                  <Button leftIcon={<AiFillSave color='#000' />}>Lưu</Button>

                  <Button
                    leftIcon={<GiSaveArrow color='#fff' />}
                    ml='auto'
                    background='primary'
                    color='white'
                    variant='solid'
                  >
                    Tải xuống
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReportReview;
