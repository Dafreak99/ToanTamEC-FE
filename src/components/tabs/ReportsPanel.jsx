import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import report from '../../images/BM.png';
import friends from '../../images/friends.svg';
import ReportReview from '../modals/ReportReview';

function ReportsPanel() {
  const [docs] = useState([1]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Flex mb='1rem'>
        <Select placeholder='Tất cả biên bản' width='300px'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>

        <Box ml='auto'>
          <Button fontSize='14px' mr='1rem'>
            {' '}
            Chọn
          </Button>
          <Button fontSize='14px' variant='primary'>
            Tải xuống tất cả
          </Button>
        </Box>
      </Flex>

      <ReportReview {...{ isOpen, onClose }} />

      {docs.length > 0 ? (
        <Box height='70vh' overflow='scroll' overflowX='hidden'>
          <Grid
            templateColumns={{ base: 'repeat(2,1fr)', xl: 'repeat(4,1fr)' }}
            mt='2rem'
          >
            {Array.from({ length: 8 }, () => (
              <Flex
                flexDirection='column'
                alignItems='center'
                cursor='pointer'
                onClick={onOpen}
              >
                <Image src={report} />
                <Heading fontSize='md' fontWeight='400'>
                  BM9_Tenbieumau.docx
                </Heading>
                <Text fontSize='xs'>Ngày tạo: 15/02/2022</Text>
              </Flex>
            ))}
          </Grid>
        </Box>
      ) : (
        <Flex
          py='100px'
          justifyContent='center'
          alignItems='center'
          flexDir='column'
        >
          <img src={friends} alt='friend' className='h-56 mb-4' />
          <p>Chưa có dữ liệu</p>
        </Flex>
      )}
    </div>
  );
}

export default ReportsPanel;
