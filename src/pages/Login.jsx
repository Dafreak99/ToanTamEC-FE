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

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const renderError = (name, type = "required") => {
    if (name in errors && errors[name].type === type) {
      return <ErrorMessage />;
    }
  };

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
              {...register("password", { required: true })}
            />
            {renderError("password")}
          </FormControl>
          <FormControl mt={8}>
            <Button variant="primary" display="block" isFullWidth type="submit">
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
