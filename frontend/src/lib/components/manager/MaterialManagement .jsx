import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import ViewMaterial from "./material/ViewMaterial";
import { useEffect, useState } from "react";
import CreateMaterial from "./material/CreateMaterial";
import EditMaterial from "./material/EditMaterial";
import Activities from "./material/Activities";
import { BASE_URL } from "../../../App";

const MaterialManagement = () => {
  // const [materials, setMaterials] = useState([]);
  // const [materials, setMaterials] = useState([
  //   {
  //     id: "ING001",
  //     name: "Nguyên liệu 1",
  //     price: 100,
  //     quantity: 10,
  //     unit: "Ky",
  //   },
  //   {
  //     id: "ING002",
  //     name: "Nguyên liệu 2",
  //     price: 200,
  //     quantity: 20,
  //     unit: "Hop",
  //   },
  // ]);
  const [materials, setMaterials] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getMaterials = async () => {
      try {
        const res = await fetch(BASE_URL + "/nguyenlieu");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setMaterials(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMaterials();
  }, [refresh]);

  // Khi cần refresh lại dữ liệu
  const refreshData = () => {
    setRefresh((prev) => !prev);  
  };

  // Mở thông báo xác nhận xóa
  const handleDeleteConfirmation = (material) => {
    setSelectedMaterial(material);
    setIsDeleteAlertOpen(true);
  };

  const deleteMaterial2API = async (material) => {
    try {
      const res = await fetch(BASE_URL + "/nguyenlieu/" + material.MaNL, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        title: "Thành công",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refreshData();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteMaterial = () => {
    deleteMaterial2API(selectedMaterial);
    setIsDeleteAlertOpen(false);
    setSelectedMaterial(null);
  };

  return (
    <Flex direction="column">
      <Flex
        width="100vw"
        justifyContent="center"
        bg="#98b4cf"
        style={{ padding: "0.2rem 0" }}
      >
        <Heading fontSize="1.5rem">Quản Lý Nguyên Liệu</Heading>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Flex height="100vh" width={"100%"} justifyContent={"space-between"}>
          {/* Danh sách nguyên liệu */}
          <ViewMaterial
            materials={materials}
            onDelete={handleDeleteConfirmation}
            onEdit={(material) => {
              setEditingMaterial(material);
            }}
            onAdd={() => setIsCreating(true)}
          />

          {/* Hiển thị CreateMaterial hoặc EditMaterial dựa vào biến trạng thái isCreating và editingMaterial*/}
          {isCreating && (
            <CreateMaterial
              onInput={() => {
                refreshData();
                setIsCreating(false);
              }} // Nhận dữ liệu từ form
              onCancel={() => {
                setIsCreating(false);
              }}
            />
          )}
          {editingMaterial && (
            <EditMaterial
              material={editingMaterial} // Truyền dữ liệu nguyên liệu cần sửa
              onInput={() => {
                refreshData();
                setEditingMaterial(null);
              }} // Nhận dữ liệu từ form
              onCancel={() => {
                setEditingMaterial(null);
              }}
            />
          )}
          {/* Component xử lý */}
          <Activities
            materials={materials}
            // Component nằm ở vị trí bên phải màn hình rộng (phần còn lại)
          />
        </Flex>
      </Flex>

      {/* Thông báo xóa nguyên liệu */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa Nhân Viên
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn muốn xóa nguyên liệu **{selectedMaterial?.TenNL}**?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteAlertOpen(false)}>Hủy</Button>
              <Button colorScheme="red" onClick={handleDeleteMaterial} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default MaterialManagement;
