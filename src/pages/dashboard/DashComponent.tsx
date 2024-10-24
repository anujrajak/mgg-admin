import { SimpleGrid } from "@chakra-ui/react";
import { useFetchCategories } from "../../utils/apiUtils";
import DashboardStatCard from "../../components/DashboardStatCard";
import { isEmpty } from "lodash";

export default function DashComponent() {
  const { data, isLoading } = useFetchCategories();

  return (
    <SimpleGrid minChildWidth="120px" spacing="30px">
      <DashboardStatCard
        isLoading={isLoading}
        label="Total Categories"
        value={!isEmpty(data) ? data.length : 0}
        route="category"
      />
    </SimpleGrid>
  );
}
