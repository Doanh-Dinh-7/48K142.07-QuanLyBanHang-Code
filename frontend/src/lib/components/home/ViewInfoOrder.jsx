import { Button, Flex, Grid, Stack, Text } from "@chakra-ui/react";
import { default as VNnum2words } from "vn-num2words"; // Thư viện hỗ trợ tiếng Việt
import { BsCashCoin, BsCashStack } from "react-icons/bs";

const ViewInfoOder = ({ order }) => {
  // Tính tổng thành tiền
  const totalAmount = order.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );

  // Chuyển tổng thành tiền thành chữ tiếng Việt
  let totalInWords = VNnum2words(totalAmount); // Loại bỏ dấu phẩy trong chữ
  return (
    <>
      <Flex
        direction={"column"}
        bg={"#dbdbdb"}
        width={"45vw"}
        alignItems={"center"}
        gap={"1"}
        p={"3"}
      >
        <Text fontWeight={"bold"}>Thông tin đơn hàng</Text>
        <Stack bg="white" width="40vw" height={"50vh"}>
          <Grid templateColumns="repeat(4, 1fr)" gap={"2"} textAlign={"center"}>
            {/* Các thành phần bao gồm tên sản phẩm, số lượng, đơn giá, thành tiền. */}

            <Text fontWeight="bold" color={"red"}>
              Tên sản phẩm
            </Text>
            <Text fontWeight="bold" color={"red"}>
              Số lượng
            </Text>
            <Text fontWeight="bold" color={"red"}>
              Đơn giá
            </Text>
            <Text fontWeight="bold" color={"red"}>
              Thành tiền
            </Text>

            {/* Duyệt qua mảng order và hiển thị thông tin */}
            {order.map((product, index) => (
              <>
                <Text>{product.name}</Text>
                <Text>{product.quantity}</Text>
                <Text>{product.price.toLocaleString()} VND</Text>{" "}
                {/* Đơn giá */}
                <Text>
                  {(product.quantity * product.price).toLocaleString()} VND
                </Text>{" "}
                {/* Tính thành tiền */}
              </>
            ))}
          </Grid>
        </Stack>
        <Flex
          direction={"column"}
          alignContent={"center"}
          gap={"5"}
          width={"40vw"}
          marginTop={"5"}
        >
          <Text color={"red"} fontWeight={"bold"}>
            Tổng Tiền:{" "}
            <Text as="span" fontSize={"3xl"} marginLeft={"1vw"}>
              {totalAmount.toLocaleString()} VND
            </Text>
          </Text>

          <Text fontWeight="bold" mt={2} textAlign="left">
            Bằng chữ:{" "}
            <Text as="span" marginLeft={"1vw"}>
              {totalInWords} đồng
            </Text>
          </Text>

          <Flex justifyContent={"center"} alignContent={"center"}>
            <Button
              textAlign={"center"}
              bg={"green.400"}
              onClick={""}
              alignContent={"center"}
            >
              <BsCashStack style={{ marginRight: "1vw" }} />
              <Text>Thanh Toán</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ViewInfoOder;
