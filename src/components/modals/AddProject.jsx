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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProject, updateProject } from '../../features/project/projectSlice';
import Datepicker from '../../partials/actions/Datepicker';
import ErrorMessage from '../../utils/ErrorMessage';
/**
 *
 * @children Pass in the button
 */

const AddProject = ({ children, project }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (project) {
      const { name, location, startedAt, comment, code } = project;

      reset({
        code,
        name,
        location,
        startedAt,
        comment,
      });
    }
  }, [project]);

  const onSubmit = async (formData) => {
    console.log(formData);
    setLoading(true);

    if (project) {
      await dispatch(updateProject({ id: project._id, formData }));
    } else {
      console.log('er');
      await dispatch(addProject(formData));
    }

    setLoading(false);
    onClose();
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
        <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader textAlign='center'>Thông tin dự án</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                Mã dự án <span className='text-red-500'>*</span>
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder='Mã dự án'
                {...register('code', { required: true })}
              />
              {renderError('code')}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Tên dự án <span className='text-red-500'>*</span>
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder='Tên dự án'
                {...register('name', { required: true })}
              />
              {renderError('name')}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Địa điểm <span className='text-red-500'>*</span>
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder='Địa điểm'
                {...register('location', { required: true })}
              />
              {renderError('location')}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Thời điểm khởi công <span className='text-red-500'>*</span>
              </FormLabel>

              <Controller
                name='startedAt'
                control={control}
                defaultValue={project?.startedAt || new Date()}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Datepicker
                    defaultDate={project?.startedAt || new Date()}
                    onChange={field.onChange}
                  />
                )}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Căn cứ nghiệm thu<span className='text-red-500'>*</span>
              </FormLabel>
              <Textarea
                placeholder='Nhập căn cứ nghiệm thu'
                {...register('comment', { required: true })}
              />
              {renderError('comment')}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Hủy
            </Button>
            <Button
              background='primary'
              color='white'
              type='submit'
              disabled={loading}
            >
              {project ? 'Lưu' : 'Tạo'} dự án
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProject;
