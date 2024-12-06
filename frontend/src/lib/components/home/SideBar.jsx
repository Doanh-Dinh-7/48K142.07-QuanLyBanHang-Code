import { Button, Flex, Text } from "@chakra-ui/react";

const SideBar = () => {
  return (
    <>
      <Flex
        direction={"column"}
        gap={"5"}
        alignItems={"center"}
        bg={"#b1e0e5"}
        minHeight={"85vh"}
        p={"3"}
      >
        <Text fontWeight={"bold"}>Xử lý</Text>
        <Flex direction={"column"} gap={"5"} minWidth={"10vw"}>
          <Button>
            <Text style={{ fontSize: "2vh", padding: "2vh 0" }}>Gọi món</Text>
          </Button>
        </Flex>
      </Flex>
      <Flex></Flex>
    </>
  );
};

export default SideBar;
