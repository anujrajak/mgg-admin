import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BiSolidCategory } from "react-icons/bi";

import { useFetchCategories } from "../../utils/apiUtils";
import { CreateCategory } from "./CreateCategory";

import { map, orderBy } from "lodash";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateCategories } from "../../redux/slice/categorySlice";

function CategoryPage() {
  const dispatch = useDispatch();

  // Ref: in order to get all categories data
  const { data, isLoading } = useFetchCategories();

  useEffect(() => {
    dispatch(
      updateCategories({
        data: data || [],
        isLoading,
      })
    );
  }, [data, dispatch, isLoading]);

  const sortedData = orderBy(data, ["sequence"], ["asc"]);

  const columns: string[] = [
    "Sequence",
    "Name",
    "Description",
    "Parent",
    "Type",
  ];

  return (
    <Card>
      <CardHeader>
        <Flex p="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar bg="red.500" icon={<BiSolidCategory fontSize="1.5rem" />} />

            <Box>
              <Heading size="md">Category Details</Heading>
            </Box>
          </Flex>
          <CreateCategory />
        </Flex>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                {map(columns, (item: string, i: string) => (
                  <Th key={`${item}-${i}`}>{item}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <Center h="100px" color="white">
                  <Spinner />
                </Center>
              ) : (
                map(sortedData, (r, i) => {
                  return (
                    <Tr key={`${r.name}-${i}`}>
                      <Td>{r.sequence}</Td>
                      <Td>{r.name}</Td>
                      <Td>{r.description}</Td>
                      <Td>{r?.parentCategory?.name || ""}</Td>
                      <Td>{r.categoryType}</Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}

export default CategoryPage;
