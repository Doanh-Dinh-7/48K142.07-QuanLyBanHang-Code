import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TfiPencilAlt } from "react-icons/tfi";
import { IoMdAddCircleOutline } from "react-icons/io";

const ViewProduct = ({ products, onDelete, onEdit, onAdd }) => {
  return (
    <Flex
      direction={"column"}
      bg={"#dbdbdb"}
      width={"70vw"}
      alignItems={"center"}
      gap={"5"}
    >
      <Text fontWeight={"bold"}>Danh sách sản phẩm</Text>
      <Button
        position={"absolute"}
        marginTop={"0.5rem"}
        marginRight={"-44vw"}
        size="sm"
        leftIcon={<IoMdAddCircleOutline />}
        colorScheme="blue"
        onClick={onAdd} // Gọi hàm onAdd từ props
      >
        Thêm
      </Button>
      <Table
        bg="white"
        width="50vw"
        size="sm"
        fontSize={"1rem"}
        variant="striped"
      >
        <Thead>
          <Tr>
            <Th>Mã sản phẩm</Th>
            <Th>Tên</Th>
            <Th>Giá</Th>
            <Th>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((emp) => (
            <Tr key={emp.id}>
              <Td>{emp.id}</Td>
              <Td>{emp.name}</Td>
              <Td>{emp.price}</Td>
              <Td>
                <Flex gap="2">
                  <Button
                    size="sm"
                    leftIcon={<TfiPencilAlt />}
                    colorScheme="yellow"
                    onClick={() => onEdit(emp)} // Gọi hàm onEdit từ props
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<RiDeleteBin2Line />}
                    colorScheme="red"
                    onClick={() => onDelete(emp)} // Gọi hàm onDelete từ props
                  >
                    Xóa
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default ViewProduct;
