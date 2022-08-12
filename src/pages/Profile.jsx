import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Tab,
  TabList,
  Tabs,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';

function Profile() {
  const [show, setShow] = useState(false);
  const { control } = useForm();
  const user = useSelector((state) => state.user.auth);

  return (
    <Layout>
      <div className='w-full bg-white shadow-lg p-4'>
        <Tabs>
          <TabList>
            <Tab
              _focus={{ boxShadow: '0 0 0 0 transparent' }}
              _selected={{ borderColor: 'red.500' }}
            >
              <h3 className='h3'>Tài khoản</h3>
            </Tab>
          </TabList>

          <div className='px-4'>
            <h4 className='h4 mt-6'>Thông tin tài khoản</h4>
            <hr className='mb-6' />

            <div className=''>
              <div className='grid grid-cols-12 mt-4'>
                <div className='col col-span-3'>
                  <FormLabel htmlFor='userName'>Tên người dùng:</FormLabel>
                </div>
                <div className='col col-span-3'>
                  <Input id='text' type='text' placeholder='Tên người dùng' value={user.username} contentEditable />
                </div>
              </div>
              <div className='grid grid-cols-12 mt-4'>
                <div className='col col-span-3'>
                  <FormLabel htmlFor='oldPassword'>Mật khẩu cũ:</FormLabel>
                </div>
                <div className='col col-span-3'>
                  <InputGroup size='md'>
                    <Input
                      id='oldPassword'
                      // defaultValue='toantamec'
                      placeholder='Nhập mật khẩu hiện tại'
                      type={show ? 'text' : 'password'}
                    />
                    <InputRightElement width='4.5rem'>
                      <Box
                        as='span'
                        cursor='pointer'
                        marginLeft='2rem'
                        fontSize='1.2rem'
                        color='gray.400'
                        onClick={() => setShow(!show)}
                      >
                        {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </Box>
                    </InputRightElement>
                  </InputGroup>
                </div>
              </div>
              <div className='grid grid-cols-12 mt-4'>
                <div className='col col-span-3'>
                  <FormLabel htmlFor='newPassword'>Mật khẩu mới:</FormLabel>
                </div>
                <div className='col col-span-3'>
                  <Input
                    id='newPassword'
                    type='password'
                    placeholder='Mật khẩu dài 12-255 ký tự'
                  />
                </div>
              </div>
              <div className='grid grid-cols-12 mt-4'>
                <div className='col col-span-3'>
                  <FormLabel htmlFor='reNewPassword'>
                    Nhập lại mật khẩu:
                  </FormLabel>
                </div>
                <div className='col col-span-3'>
                  <Input
                    id='reNewPassword'
                    type='password'
                    placeholder='Mật khẩu dài 12-255 ký tự'
                  />
                </div>
              </div>
            </div>

            <h4 className='h4 mt-6'>Thông tin cá nhân</h4>
            <hr className='mb-6' />

            <div className=''>
              <div className='grid grid-cols-12 mt-4'>
                <div className='col col-span-3'>
                  <FormLabel htmlFor='fullName'>Họ và tên:</FormLabel>
                </div>
                <div className='col col-span-3'>
                  <Input
                    id='fullName'
                    type='text'
                    placeholder='Họ và tên'
                    value={user.fullName}
                  />
                </div>
              </div>
              <div className='grid grid-cols-12 mt-4'>
                <div className='col col-span-3'>
                  <FormLabel htmlFor='phoneNumber'>Số điện thoại:</FormLabel>
                </div>
                <div className='col col-span-3'>
                  <Input
                    id='phoneNumber'
                    type='text'
                    placeholder='Số điện thoại'
                    value={user.phoneNumber}
                  />
                </div>
              </div>
              <div className='grid grid-cols-12 mt-4'>
                <div className='col col-span-3'>
                  <FormLabel htmlFor='email'>Email:</FormLabel>
                </div>
                <div className='col col-span-3'>
                  <Input
                    id='email'
                    type='text'
                    placeholder='Email'
                    value={user.email}
                  />
                </div>
              </div>
              <div className='grid grid-cols-12 mt-4'>
                <div className='col col-span-3'>
                  <FormLabel htmlFor='reNewPassword'>Chức vụ:</FormLabel>
                </div>
                <div className='col col-span-3'>
                  <Controller
                    name='jobTitle'
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} placeholder='Chọn chức vụ'>
                        <option value='option1'>
                          Chỉ huy trưởng công trình
                        </option>
                        <option value='option2'>Kỹ thuật viên thi công</option>
                        <option value='option3'>Giám sát viên</option>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className='flex justify-end items-center mt-10'>
                <Button variant='primary'>Cập nhật</Button>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}

export default Profile;
