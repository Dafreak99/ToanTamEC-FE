import { Box, Flex, Icon, Input, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { FiTrash, FiUpload } from 'react-icons/fi';

const FileUpload = ({ name, onChange, editProof }) => {
  const [files, setFiles] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (editProof?.length > 0) {
      setFiles(
        editProof.map(({ name, url, file }) => {
          return {
            name,
            url,
            file,
          };
        }),
      );
    }
  }, [editProof]);

  const handleOnChange = (e) => {
    const fls = [...files];

    if (e.target.files.length > 0) {
      for (const file of e.target.files) {
        const url = URL.createObjectURL(file);

        fls.push({ name: file.name, url, file });
      }
    }

    const element = { ...e, uploadedFiles: fls };
    setFiles(fls);

    onChange(element);
    e.target.value = '';
  };

  const removeFile = (i) => {
    const fls = [...files.slice(0, i), ...files.slice(i + 1)];

    setFiles(fls);

    setFiles((prevState) => {
      return [...prevState.slice(0, i), ...prevState.slice(i + 1)];
    });

    const element = { target: { name: 'proof' }, uploadedFiles: fls };

    onChange(element);
  };

  return (
    <Box
      bg='#fff'
      p='6px 15px'
      borderRadius='md'
      border='1px solid'
      borderColor='#CBD5E0'
    >
      <label htmlFor={name}>
        <Box
          mr='0.5rem'
          fontSize='sm'
          p='2px 5px'
          bg='#E9EAEC'
          borderRadius='md'
          minW='min -content'
        >
          <Icon as={FiUpload} /> Tải tệp lên
        </Box>
      </label>
      {files.length > 0 && (
        <Box mt='0.5rem'>
          {files.map(({ name, url }, i) => (
            <Flex alignItems='flex-start' mb='2'>
              {/* <Icon as={ImAttachment} fontSize='12px' mr='2px' /> */}

              <Tooltip label={name}>
                <Text
                  as='a'
                  href={url}
                  target='_blank'
                  wordBreak='break-all'
                  fontSize='sm'
                  lineHeight='1'
                  color='green.600'
                  flex={1}
                >
                  {name.length > 30 ? `${name.slice(0, 30)}...` : name}
                </Text>
              </Tooltip>
              <Icon
                as={FiTrash}
                cursor='pointer'
                onClick={() => removeFile(i)}
              />
            </Flex>
          ))}
        </Box>
      )}

      <Input
        id={name}
        ref={inputRef}
        type='file'
        accept='.pdf, .jpg, .jpeg, .png, .webp'
        display='none'
        name='proof'
        multiple
        onChange={handleOnChange}
      />
    </Box>
  );
};

export default FileUpload;
