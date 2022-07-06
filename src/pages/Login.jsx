import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import logo from "../images/company-logo.svg";
import bg from "../images/bg.png";
import ErrorMessage from "../utils/ErrorMessage";
import { login } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../utils/toast";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const { isLoading, auth } = useSelector((state) => state.user);
  const [formLoading, setFormLoading] = useState(false);
  const onSubmit = async (formData) => {
    setFormLoading(true);

    const resultAction = await dispatch(login(formData));

    if (login.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      cookies.set("accessToken", user.token);
    } else {
      console.log(resultAction);
      showToast("error", "Lỗi", resultAction.payload.error);
    }
    setFormLoading(false);
  };

  const renderError = (name, type = "required") => {
    if (name in errors && errors[name].type === type) {
      return <ErrorMessage />;
    }
  };

  if (isLoading) {
    return (
      <Flex
        h="100vh"
        w="100vw"
        justifyContent="center"
        alignItems="center"
      ></Flex>
    );
  }
  if (auth) {
    return <Navigate to="/du-an" />;
  }

  return (
    <Flex h="100vh" overflow="hidden">
      <Flex
        w="40%"
        flexDir="column"
        px={{ base: "3rem", xl: "4rem" }}
        justifyContent="center"
      >
        <Box as="img" src={logo} alt="logo" height="100px" mb="5rem" />
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>
              Tên người dùng <span className="text-red-500">*</span>
            </FormLabel>
            <Input
              placeholder="Nhập tên người dùng"
              {...register("username", { required: true })}
            />
            {renderError("username")}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>
              Mật khẩu <span className="text-red-500">*</span>
            </FormLabel>
            <Input
              placeholder="Nhập mật khẩu"
              type="password"
              {...register("password", { required: true })}
            />
            {renderError("password")}
          </FormControl>
          <FormControl mt={8}>
            <Button
              variant="primary"
              display="block"
              isFullWidth
              type="submit"
              disabled={formLoading}
            >
              ĐĂNG NHẬP
            </Button>
          </FormControl>
        </Box>
      </Flex>
      <Box
        w="60%"
        backgroundImage={bg}
        bgRepeat="no-repeat"
        bgSize="cover"
      ></Box>
    </Flex>
  );
};

export default Login;
