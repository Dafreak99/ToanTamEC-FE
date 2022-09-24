import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { GrAttachment } from 'react-icons/gr';

const UploadedPreview = ({ files, isOpen, onClose }) => {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
      >
        <ModalOverlay />
        <ModalContent as='form'>
          <ModalHeader textAlign='center'>Minh chứng đã tải lên</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box gap='1rem'>
              {files.map(({ url, name }) => (
                <Flex alignItems='center' mb='0.5rem'>
                  <Icon as={GrAttachment} fontSize='14px' mr='8px' />
                  <Text as='a' href={url} target='_blank' display='block'>
                    {name}
                  </Text>
                </Flex>
              ))}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadedPreview;
