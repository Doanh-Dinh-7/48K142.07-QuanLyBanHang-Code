import {
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Box,
  RadioGroup,
  HStack,
  Radio,
  Button,
} from "@chakra-ui/react";
import HighlandLogo from "../images/HighlandLogo.png";
const LoginPage = () => {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      minH={"100vh"}
      justifyContent={"center"}
    >
      <Flex
        direction={"column"}
        gap={"7"}
        alignItems={"center"}
        border={"1rem solid #788899"}
        style={{ padding: "2rem 5rem" }}
      >
        <Image
          bg={"yellow.200"}
          p={"1rem"}
          borderRadius={"1vw"}
          src={HighlandLogo}
          width={"20vw"}
        />
        <FormControl isRequired>
          <form action="/home">
            <Flex direction={"column"} gap={"5"}>
              <Box>
                <FormLabel>Tài Khoản</FormLabel>
                <Input placeholder="Tài khoản" type="text" />
              </Box>
              <Box>
                <FormLabel>Mật khẩu</FormLabel>
                <Input placeholder="Mật khẩu" type="password" />
              </Box>
              <RadioGroup>
                <HStack spacing="5vw">
                  <Radio value="QuanLy">Quản Lý</Radio>
                  <Radio value="NhanVien">Nhân Viên</Radio>
                </HStack>
              </RadioGroup>
              <Button colorScheme="yellow" size="lg" type="submit">
                Đăng nhập
              </Button>
            </Flex>
          </form>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
