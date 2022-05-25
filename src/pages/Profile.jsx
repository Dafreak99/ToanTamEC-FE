import {
  FormLabel,
  Grid,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";

function Profile() {
  return (
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
                <FormLabel htmlFor="userName">Tên người dùng</FormLabel>
              </div>
              <div className="col col-span-3">
                <Input id="text" type="text" placeholder="Tên người dùng" />
              </div>
            </div>
            <div className="grid grid-cols-12 mt-4">
              <div className="col col-span-3">
                <FormLabel htmlFor="oldPassword">Mật khẩu cũ</FormLabel>
              </div>
              <div className="col col-span-3">
                <Input
                  id="oldPassword"
                  type="password"
                  placeholder="************"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 mt-4">
              <div className="col col-span-3">
                <FormLabel htmlFor="newPassword">Mật khẩu mới</FormLabel>
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
                <Input id="text" type="text" placeholder="Nguyễn Hoàng Phúc" />
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
                <Input
                  id="reNewPassword"
                  type="password"
                  placeholder="Kỹ thuật viên"
                />
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default Profile;
