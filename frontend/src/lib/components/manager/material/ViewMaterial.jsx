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
  Box,
} from "@chakra-ui/react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TfiPencilAlt } from "react-icons/tfi";
import { IoMdAddCircleOutline } from "react-icons/io";

const ViewMaterial = ({ materials, onDelete, onEdit, onAdd }) => {
  // với đơn vị tính: Ky = Ký, Hop = Hộp, Thung = Thùng
  const unit = {
    "Ky        ": "Ký",
    "Hop       ": "Hộp",
    "Thung     ": "Thùng",
  };

  return (
    <Flex
      direction={"column"}
      bg={"#dbdbdb"}
      width={"55vw"}
      alignItems={"center"}
      gap={"5"}
    >
      <Text fontWeight={"bold"}>Danh sách nguyên liệu</Text>
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
      <Box
        width="50vw"
        maxHeight="70vh" // Chiều cao tối đa của bảng
        overflowY="auto" // Thêm thanh cuộn dọc
        bg="white"
        borderRadius="md"
        boxShadow="sm"
      > 
        <Table
          bg="white"
          width="50vw"
          size="sm"
          fontSize={"1rem"}
          variant="striped"
        >
          <Thead>
            <Tr>
              <Th>Mã nguyên liệu</Th>
              <Th>Tên</Th>
              <Th>Số lượng</Th>
              <Th>Giá nhập</Th>
              <Th>Đơn vị tính</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {materials.map((mat) => (
              <Tr key={mat.MaNL}>
                <Td>{mat.MaNL}</Td>
                <Td>{mat.TenNL}</Td>
                <Td>{mat.SoLuong}</Td>
                <Td>{mat.DonGiaNhap}</Td>
                <Td>{unit[mat.DonViTinh]}</Td>
                <Td>
                  <Flex gap="2">
                    <Button
                      size="sm"
                      leftIcon={<TfiPencilAlt />}
                      colorScheme="yellow"
                      onClick={() => onEdit(mat)} // Gọi hàm onEdit từ props
                    >
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<RiDeleteBin2Line />}
                      colorScheme="red"
                      onClick={() => onDelete(mat)} // Gọi hàm onDelete từ props
                    >
                      Xóa
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default ViewMaterial;
