import {
  Box,
  Button,
  FormLabel,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Layout from "../components/Layout";

function Profile() {
  const [show, setShow] = useState(false);
  const { register, control, errors } = useForm();

  return (
    <Layout>
      <div className="w-full bg-white shadow-lg p-4">
        <Tabs>
          <TabList>
            <Tab
              _focus={{ boxShadow: "0 0 0 0 transparent" }}
              _selected={{ borderColor: "red.500" }}
            >
              <h3 className="h3">Tài khoản</h3>
            </Tab>
          </TabList>

          <div class="px-4">
            <h4 className="h4 mt-6">Thông tin tài khoản</h4>
            <hr className="mb-6" />

            <div className="">
              <div className="grid grid-cols-12 mt-4">
                <div className="col col-span-3">
                  <FormLabel htmlFor="userName">Tên người dùng:</FormLabel>
                </div>
                <div className="col col-span-3">
                  <Input id="text" type="text" placeholder="Tên người dùng" />
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col col-span-3">
                  <FormLabel htmlFor="oldPassword">Mật khẩu cũ:</FormLabel>
                </div>
                <div className="col col-span-3">
                  <InputGroup size="md">
                    <Input
                      id="oldPassword"
                      defaultValue="toantamec"
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement width="4.5rem">
                      <Box
                        as="span"
                        cursor="pointer"
                        marginLeft="2rem"
                        fontSize="1.2rem"
                        color="gray.400"
                        onClick={() => setShow(!show)}
                      >
                        {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </Box>
                    </InputRightElement>
                  </InputGroup>
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col col-span-3">
                  <FormLabel htmlFor="newPassword">Mật khẩu mới:</FormLabel>
                </div>
                <div className="col col-span-3">
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Mật khẩu dài 12-255 ký tự"
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col col-span-3">
                  <FormLabel htmlFor="reNewPassword">
                    Nhập lại mật khẩu:
                  </FormLabel>
                </div>
                <div className="col col-span-3">
                  <Input
                    id="reNewPassword"
                    type="password"
                    placeholder="Mật khẩu dài 12-255 ký tự"
                  />
                </div>
              </div>
            </div>

            <h4 className="h4 mt-6">Thông tin cá nhân</h4>
            <hr className="mb-6" />

            <div className="">
              <div className="grid grid-cols-12 mt-4">
                <div className="col col-span-3">
                  <FormLabel htmlFor="userName">Họ và tên:</FormLabel>
                </div>
                <div className="col col-span-3">
                  <Input
                    id="text"
                    type="text"
                    placeholder="Nguyễn Hoàng Phúc"
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col col-span-3">
                  <FormLabel htmlFor="oldPassword">Số điện thoại:</FormLabel>
                </div>
                <div className="col col-span-3">
                  <Input
                    id="oldPassword"
                    type="password"
                    placeholder="0987654321"
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col col-span-3">
                  <FormLabel htmlFor="newPassword">Email:</FormLabel>
                </div>
                <div className="col col-span-3">
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="hoangphuc@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col col-span-3">
                  <FormLabel htmlFor="reNewPassword">Chức vụ:</FormLabel>
                </div>
                <div className="col col-span-3">
                  <Controller
                    name="jobTitle"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} placeholder="Chọn chức vụ">
                        <option value="option1">
                          Chỉ huy trưởng công trình
                        </option>
                        <option value="option2">Kỹ thuật viên thi công</option>
                        <option value="option3">Giám sát viên</option>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end items-center mt-10">
                <Button variant="primary">Cập nhật</Button>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}

export default Profile;
