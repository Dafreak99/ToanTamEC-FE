import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import report from '../../images/BM.png';
import friends from '../../images/friends.svg';

function ReportsPanel() {
  let [docs] = useState([1]);

  return (
    <div>
      <Select placeholder='Tất cả biên bản' width='300px'>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>
      {docs.length > 0 ? (
        <Box height='70vh' overflow='scroll' overflowX='hidden'>
          <Grid templateColumns='repeat(4,1fr)' mt='2rem'>
            {Array.from({ length: 8 }, () => (
              <Flex flexDirection='column' alignItems='center'>
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
