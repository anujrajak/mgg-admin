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
import { ReactElement } from "react";

import { RxArrowRight } from "react-icons/rx";
import { Link } from "react-router-dom";

interface IProps {
  isLoading?: boolean;
  label: string;
  value: string;
  icon: ReactElement;
  route: string;
}

export default function DashboardStatCard(props: IProps) {
  const { isLoading, label, value, route, icon } = props;
  return (
    <Card maxW="xs" borderRadius="3xl" boxShadow="xs">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar size="lg" bg="gray.100" icon={icon} />
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
