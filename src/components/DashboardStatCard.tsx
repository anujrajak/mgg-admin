import {
  Avatar,
  Box,
  Card,
  Text,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import { BiSolidCategory } from "react-icons/bi";
import { RxArrowRight } from "react-icons/rx";
import { Link } from "react-router-dom";

interface IProps {
  isLoading?: boolean;
  label: string;
  value: string;
  route: string;
}

export default function DashboardStatCard(props: IProps) {
  const { isLoading, label, value, route } = props;
  return (
    <Card maxW="xs" borderRadius="3xl" boxShadow="xs">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              size="lg"
              bg="gray.100"
              icon={
                <BiSolidCategory style={{ color: "green" }} fontSize="2rem" />
              }
            />
            <Box>
              <Heading size="sm"></Heading>
              {isLoading ? (
                <Spinner size="sm" />
              ) : (
                <Stat>
                  <StatLabel color="gray.500" fontWeight="normal">
                    {label}
                  </StatLabel>
                  <StatNumber fontSize="3xl">{value || 0}</StatNumber>
                  <Link to={route}>
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
  );
}
