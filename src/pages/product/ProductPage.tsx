import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MarkdownEditor from "../blog/MarkdownEditor";
import { GiShoppingBag } from "react-icons/gi";
import { useRef, useState } from "react";
import { useFetchBlogs, useFetchCategories } from "../../utils/apiUtils";
import { isEmpty, map } from "lodash";
import { apiConstant, postType } from "../../enum/apiConstant";
import axios from "axios";

export default function ProductPage() {
  const toast = useToast();

  const { data: categoryData, isLoading: isCategoryLoading } =
    useFetchCategories();
  const { data, isLoading } = useFetchBlogs(postType.PRODUCT);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const columns: string[] = ["no.", "title", "created date", "likes", "status"];

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dealCode, setDealCode] = useState("");
  const [dealLink, setDealLink] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const inputRef = useRef(null);
  const inputImgRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
      } else {
        alert("Please select a valid image file.");
        setSelectedFile("");
      }
    }
  };

  const handleFeaturedImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith("image/")) {
        setFeaturedImage(file);
      } else {
        alert("Please select a valid image file.");
        setFeaturedImage("");
      }
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleImageButtonClick = () => {
    inputImgRef.current.click();
  };

  const publishProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("postType", postType.PRODUCT);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("body", body);
      formData.append("thumbnail", selectedFile);
      formData.append("featuredImage", featuredImage);
      formData.append("dealCode", dealCode);
      formData.append("dealLink", dealLink);

      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL +
          apiConstant.ADMIN_BLOGS_CREATE_PRODUCT_POST,
        formData,
        {
          headers: {
            deviceIdentifier: import.meta.env.DEVICE_IDENTIFIER,
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      toast({ title: "Blog published successfully.", status: "success" });
      return res;
    } catch (error) {
      toast({
        title: "Error occured " + error.response.data.message,
        status: "error",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <Flex p="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar bg="red.500" icon={<GiShoppingBag fontSize="1.5rem" />} />
            <Box>
              <Heading size="md">Products</Heading>
            </Box>
          </Flex>
          <>
            <IconButton
              ref={btnRef}
              colorScheme="teal"
              onClick={onOpen}
              variant="ghost"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
            <Drawer
              size="xl"
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create Product</DrawerHeader>

                <DrawerBody>
                  <>
                    <FormControl mb="4">
                      <FormLabel>Title*</FormLabel>
                      <Input
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Deal Code*</FormLabel>
                      <Input
                        type="text"
                        value={dealCode}
                        placeholder="Deal code"
                        onChange={(e) => setDealCode(e.target.value)}
                      />
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Deal Link*</FormLabel>
                      <Input
                        type="text"
                        value={dealLink}
                        placeholder="Deal link"
                        onChange={(e) => setDealLink(e.target.value)}
                      />
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Article*</FormLabel>
                      <MarkdownEditor body={body} setBody={setBody} />
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Thumbnail Image</FormLabel>
                      <Input
                        type="file"
                        ref={inputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }} // Hide the default input
                      />
                      <Button onClick={handleButtonClick}>
                        {selectedFile ? selectedFile.name : "Choose File"}
                      </Button>
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Featured Image</FormLabel>
                      <Input
                        type="file"
                        ref={inputImgRef}
                        onChange={handleFeaturedImageFileChange}
                        style={{ display: "none" }} // Hide the default input
                      />
                      <Button onClick={handleImageButtonClick}>
                        {featuredImage ? featuredImage.name : "Choose File"}
                      </Button>
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Category</FormLabel>
                      {isCategoryLoading ? (
                        <Spinner />
                      ) : (
                        <Select
                          placeholder="Select parent name"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option>Select</option>
                          {map(categoryData, (item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Tags</FormLabel>
                      <Input
                        type="text"
                        value={tags}
                        placeholder="tags"
                        onChange={(e) => setTags(e.target.value)}
                      />
                    </FormControl>
                  </>
                </DrawerBody>

                <DrawerFooter>
                  <Button colorScheme="blue" mr={3} onClick={publishProduct}>
                    Publish Product
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        </Flex>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                {map(columns, (th, i) => (
                  <Th key={`${th}-${i}`}>{th}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <Center h="100px" color="white">
                  <Spinner />
                </Center>
              ) : (
                map(data, (r, i) => (
                  <Tr key={`${r._id}-${i}`}>
                    <Td>{i + 1}</Td>
                    <Td>{r.title}</Td>
                    <Td>{r.createdAt}</Td>
                    <Td>{r.likes}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
            {data && isEmpty(data) && (
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th>No data found.</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Tfoot>
            )}
          </Table>
        </TableContainer>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
