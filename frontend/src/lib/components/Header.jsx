import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1200px"}>
      <Flex justify={"space-between"} align={"center"} py={4}>
        <Flex gap={"4"}>
          <Breadcrumb separator=" ">
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/manager">Quản Lý</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/statics">Thống kê</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
        </Button>
      </Flex>
    </Container>
  );
};

export default Header;
