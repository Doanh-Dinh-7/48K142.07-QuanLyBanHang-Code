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
import { BsInfoCircle } from "react-icons/bs";

const ViewReceipt = ({ receipts, onDelete, onShowDetails }) => {
  return (
    <Flex
      direction={"column"}
      bg={"#dbdbdb"}
      width={"63vw"}
      alignItems={"center"}
      gap={"1"}
      overflowY={"auto"}
    >
      <Text fontWeight={"bold"}>Danh sách Phiếu nhập</Text>
      <Table
        bg="white"
        width="60vw"
        size="sm"
        fontSize={"1rem"}
        variant="striped"
      >
        <Thead>
          <Tr>
            <Th>Mã Hoá đơn</Th>
            <Th>Ngày lập</Th>
            <Th>Tổng tiền</Th>
            <Th>Tiền VAT</Th>
            <Th>Tổng cộng</Th>
            <Th>Mã nhà cung cấp</Th>
            <Th>Mã Nhân Viên</Th>
            <Th>Phương thức thanh toán</Th>
            <Th>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {receipts.map((receipt, key) => (
            <Tr key={key}>
              <Td>{receipt.MaPN}</Td>
              <Td>{receipt.NgayLap}</Td>
              <Td>{receipt.TongTien}</Td>
              <Td>{receipt.TienVAT}</Td>
              <Td>{receipt.TongCong}</Td>
              <Td>{receipt.MaNCC}</Td>
              <Td>{receipt.MaNV}</Td>
              <Td>
                {receipt.PhuongThucThanhToan === 1
                  ? "Chuyển khoản"
                  : "Tiền mặt"}
              </Td>
              <Td>
                <Flex gap="2" direction={"column"}>
                  <Button
                    size="sm"
                    leftIcon={<BsInfoCircle />}
                    colorScheme="yellow"
                    onClick={() => onShowDetails(receipt)}
                  >
                    Chi Tiết
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<RiDeleteBin2Line />}
                    colorScheme="red"
                    onClick={() => onDelete(receipt)} // Gọi hàm onDelete từ props
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

export default ViewReceipt;
