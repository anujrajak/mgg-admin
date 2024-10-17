import {
  Card,
  CardBody,
  Heading,
  Stack,
  Image,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

function ProfilePage() {
  const userInfo = useSelector((state) => state.userInformation);
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Name
              </Heading>
              <Text pt="2" fontSize="sm">
                {userInfo.fullname}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Email
              </Heading>
              <Text pt="2" fontSize="sm">
                {userInfo.email}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Stack>
    </Card>
  );
}

export default ProfilePage;
