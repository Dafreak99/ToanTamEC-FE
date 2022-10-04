import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Datepicker from '../../partials/actions/Datepicker';
import ErrorMessage from '../ErrorMessage';

/**
 *
 * @children Pass in the button
 */

const TotalDetailsCellModal = ({
  isOpen,
  onClose,
  onSubmit: parentOnSubmit,
}) => {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    parentOnSubmit(data);
    onClose();
    reset();
  };

  const renderError = (name, type = 'required') => {
    if (name in errors && errors[name].type === type) {
      return <ErrorMessage />;
    }

    return null;
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader textAlign='center'>Chi tiết</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl display='flex' justify='between' alignItems='center'>
            <FormLabel className='w-1/3'>Ngày:</FormLabel>
            <Controller
              name='date'
              className='w-2/3'
              control={control}
              defaultValue={new Date()}
              rules={{
                required: true,
              }}
              render={({ field }) => <Datepicker onChange={field.onChange} />}
            />
          </FormControl>

          <FormControl
            display='flex'
            justify='between'
            alignItems='center'
            mt={4}
          >
            <FormLabel className='w-1/3'>Số lượng</FormLabel>
            <Input
              className='2/3'
              type='number'
              ref={initialRef}
              w='max-content'
              {...register('quantity', {
                required: true,
                valueAsNumber: true,
              })}
            />
          </FormControl>
          {renderError('quantity')}

          <FormControl
            display='flex'
            justify='between'
            alignItems='center'
            mt={4}
          >
            <FormLabel className='w-1/3'>Đánh giá</FormLabel>
            <Controller
              className='2/3'
              name='assessment'
              control={control}
              defaultValue='blank'
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack direction='column'>
                    <Radio value='blank'>Chưa nghiệm thu</Radio>
                    <Radio value='passed'>Nghiệm thu đạt</Radio>
                    <Radio value='failed'>Nghiệm thu chưa đạt</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Nguyên nhân</FormLabel>
            <Textarea
              ref={initialRef}
              _placeholder='Nhập nguyên nhân'
              {...register('reason', { required: true })}
            />
          </FormControl>
          {renderError('reason')}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Hủy
          </Button>
          <Button background='primary' color='white' type='submit'>
            Lưu
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TotalDetailsCellModal;
