import {
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useFetchCategories } from "../../utils/apiUtils";

export default function DashComponent() {
  const { data, isLoading } = useFetchCategories();
  return isLoading ? (
    <Spinner />
  ) : (
    <Stat>
      <StatLabel>Categories Count</StatLabel>
      <StatNumber>{data.length}</StatNumber>
      <StatHelpText>Total categories count</StatHelpText>
    </Stat>
  );
}
