import {
  Box,
  Button,
  Flex,
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
  Spinner,
  Text,
} from '@chakra-ui/react';
import { getMonth } from 'date-fns';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useUpdateDraftDoc } from '../../hooks/useWorkDiaryDetail';
import ErrorMessage from '../../utils/ErrorMessage';
import { showToast } from '../../utils/toast';

/**
 *
 * @children Pass in the button
 */

const UploadOfficialProof = ({ isOpen, onOpen, onClose, selectedInfo }) => {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [proof, setProof] = useState(null);
  const [error, setError] = useState(false);
  const { endDate } = useSelector((state) => state.date);

  const queryClient = useQueryClient();

  const onError = (err) => {
    console.log(err);
    showToast('Lỗi khi tải bản chính lên!');
  };

  const onSuccess = ({ data }) => {
    queryClient.invalidateQueries([
      'actual-working-dates',
      getMonth(new Date(endDate)),
    ]);

    queryClient.setQueryData(['work-diaries', endDate], (oldData) => {
      const index = oldData.data.findIndex(
        (workDiary) => workDiary._id === data._id,
      );

      return {
        data: [
          ...oldData.data.slice(0, index),
          data,
          ...oldData.data.slice(index + 1),
        ],
      };
    });

    setProof(null);
    onClose();
  };

  const { mutate, isLoading } = useUpdateDraftDoc(onSuccess, onError);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!proof) {
      setError(true);
      return;
    }

    mutate({ ...selectedInfo, proof });
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as='form' onSubmit={onSubmit}>
          <ModalHeader textAlign='center'>Tải lên bản chính</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor='proof'>Tệp đính kèm *</FormLabel>
              <label htmlFor='proof'>
                <Flex
                  alignItems='center'
                  bg='#fff'
                  p='6px 15px'
                  borderRadius='md'
                  border='1px solid'
                  borderColor={error ? 'red.500' : '#CBD5E0'}
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
                  <Text>{proof?.name}</Text>
                </Flex>
              </label>
              <Input
                id='proof'
                type='file'
                accept='.pdf, .jpg, .jpeg, .png, .webp'
                display='none'
                name='proof'
                onChange={(e) => {
                  setProof(e.target.files[0]);
                  setError(false);
                }}
              />
              {error && <ErrorMessage />}
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
              disabled={isLoading}
            >
              {isLoading && <Spinner fontSize='1rem' mr='8px' />} Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadOfficialProof;
