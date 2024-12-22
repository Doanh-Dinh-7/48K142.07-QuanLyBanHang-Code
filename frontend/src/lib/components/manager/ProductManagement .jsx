import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import CreateProduct from "./product/CreateProduct";
import ViewProduct from "./product/ViewProduct";
import EditProduct from "./product/EditProduct";
import { BASE_URL } from "../../../App";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [refresh, setRefresh] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(BASE_URL + "/sanpham");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [refresh]);

  // Khi cần refresh lại dữ liệu
  const refreshData = () => {
    setRefresh((prev) => !prev);
  };

  // Mở thông báo xác nhận xóa
  const handleDeleteConfirmation = (product) => {
    setSelectedProduct(product);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteProduct2API = () => {
    try {
      fetch(BASE_URL + "/sanpham/" + selectedProduct.MaSP, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Xóa sản phẩm không thành công");
        }
        toast({
          title: "Thành công",
          description: "Xóa sản phẩm thành công",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refreshData();
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleteAlertOpen(false);
      setSelectedProduct(null);
    }
  };

  return (
    <Flex direction="column">
      <Flex
        width="100vw"
        justifyContent="center"
        bg="#ffbfc0"
        style={{ padding: "0.2rem 0" }}
      >
        <Heading fontSize="1.5rem">Quản Lý Sản Phẩm</Heading>
      </Flex>
      <Flex height="100vh">
        <ViewProduct
          products={products}
          onDelete={handleDeleteConfirmation}
          onEdit={(product) => {
            setEditingProduct(product);
          }}
          onAdd={() => setIsCreating(true)}
        />
        {isCreating && (
          <CreateProduct
            onInput={() => {
              refreshData();
              setIsCreating(false);
            }}
            onCancel={() => {
              setIsCreating(false);
            }}
          />
        )}
        {editingProduct && (
          <EditProduct
            product={editingProduct}
            onInput={() => {
              refreshData();
              setEditingProduct(null);
            }}
            onCancel={() => {
              setEditingProduct(null);
            }}
          />
        )}
      </Flex>
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa Sản Phẩm
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn có chắc muốn xóa sản phẩm **{selectedProduct?.TenSP}** không?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteAlertOpen(false)}>Hủy</Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteProduct2API}
                ml={3}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default ProductManagement;
