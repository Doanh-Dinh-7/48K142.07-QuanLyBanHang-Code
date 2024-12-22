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
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TfiPencilAlt } from "react-icons/tfi";

const ViewEmployee = ({ employees, onDelete, onEdit }) => {
  return (
    <Flex
      direction={"column"}
      bg={"#dbdbdb"}
      width={"55vw"}
      alignItems={"center"}
      gap={"5"}
    >
      <Text fontWeight={"bold"}>Danh sách nhân viên</Text>
      <Box
        bg="white"
        width="50vw"
        border="1px solid #ccc"
        borderRadius="md"
        overflow="hidden"
      >
        <Table size="sm" fontSize="1rem" variant="striped" width="100%">
          <Thead>
            <Tr>
              <Th>Mã nhân viên</Th>
              <Th>Tên</Th>
              <Th>Ngày sinh</Th>
              <Th>Giới tính</Th>
              <Th>Địa chỉ</Th>
              <Th>Ngày vào làm</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
        </Table>
        <Box maxHeight="65vh" overflowY="auto">
          <Table size="sm" fontSize="1rem" variant="striped" width="100%">
            <Tbody>
              {employees.map((emp) => (
                <Tr key={emp.MaNV}>
                  <Td>{emp.MaNV}</Td>
                  <Td>{emp.HoTenNV}</Td>
                  <Td>{emp.NgaySinh}</Td>
                  <Td>{emp.GioiTinh === "1" ? "Nam" : "Nữ"}</Td>
                  <Td
                    maxWidth="150px"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    <Tooltip label={emp.DiaChi} hasArrow>
                      {emp.DiaChi}
                    </Tooltip>
                  </Td>
                  <Td>{emp.NgayVaoLam}</Td>
                  <Td>
                    <Flex gap="2" direction={"column"}>
                      <Button
                        size="sm"
                        leftIcon={<TfiPencilAlt />}
                        colorScheme="yellow"
                        onClick={() => onEdit(emp)}
                      >
                        Sửa
                      </Button>
                      <Button
                        size="sm"
                        leftIcon={<RiDeleteBin2Line />}
                        colorScheme="red"
                        onClick={() => onDelete(emp)}
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
      </Box>
    </Flex>
  );
};

export default ViewEmployee;
