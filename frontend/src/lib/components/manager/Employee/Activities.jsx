import { Button, Flex, Text } from "@chakra-ui/react";
import { IoMdAddCircleOutline } from "react-icons/io";

const Activities = ({ onAdd, onSave }) => {
  return (
    <Flex
      direction={"column"}
      width={"15vw"}
      bg={"#dbdbdb"}
      alignItems={"center"}
      gap={"7"}
    >
      <Text fontWeight={"bold"}>Xử lý</Text>

      {/* Nút "Thêm" */}
      <Flex direction={"column"} minWidth={"10vw"}>
        <Button
          fontSize={"1.5rem"}
          leftIcon={<IoMdAddCircleOutline />}
          colorScheme="blue"
          variant="solid"
          onClick={onAdd} // Gọi hàm onAdd từ props
        >
          Thêm
        </Button>
      </Flex>

      {/* Nút "Lưu" */}
      <Flex direction={"column"} minWidth={"10vw"}>
        <Button
          fontSize={"1.5rem"}
          colorScheme="green"
          variant="solid"
          onClick={onSave} // Gọi hàm onSave từ props
        >
          {"Lưu"} {/* Hiển thị "Lưu" cho cả 2 trường hợp */}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Activities;
