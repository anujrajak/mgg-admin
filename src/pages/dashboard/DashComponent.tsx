import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { RxArrowRight } from "react-icons/rx";
import { useFetchCategories } from "../../utils/apiUtils";
import { BiSolidCategory } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function DashComponent() {
  const { data, isLoading } = useFetchCategories();

  return (
    <SimpleGrid minChildWidth="120px" spacing="30px">
      <Card maxW="xs" borderRadius="3xl">
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                size="lg"
                bg="gray.100"
                icon={
                  <BiSolidCategory style={{ color: "red" }} fontSize="2rem" />
                }
              />
              <Box>
                <Heading size="sm"></Heading>
                {isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <Stat>
                    <StatLabel color="gray.800" fontWeight="semibold">
                      Total Categories
                    </StatLabel>
                    <StatNumber fontSize="3xl">{data.length}</StatNumber>
                    <Link to="category">
                      <StatHelpText>
                        <Flex flex="1" alignItems="center" textAlign="left">
                          <Text mr="1">View More</Text>
                          <RxArrowRight />
                        </Flex>
                      </StatHelpText>
                    </Link>
                  </Stat>
                )}
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
      </Card>
    </SimpleGrid>
  );
}
