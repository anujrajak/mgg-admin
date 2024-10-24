import { SimpleGrid } from "@chakra-ui/react";
import { useFetchBlogs, useFetchCategories } from "../../utils/apiUtils";
import DashboardStatCard from "../../components/DashboardStatCard";
import { isEmpty } from "lodash";
import { BiSolidCategory, BiSolidOffer } from "react-icons/bi";
import { GrArticle } from "react-icons/gr";
import { GiShoppingBag } from "react-icons/gi";

export default function DashComponent() {
  const { data: categories, isLoading: isLoadingCategories } =
    useFetchCategories();
  const { data: blogData, isLoading: isLoadingBlogs } = useFetchBlogs("blog");
  const { data: dealData, isLoading: isLoadingDeals } = useFetchBlogs("deal");
  const { data: productData, isLoading: isLoadingProducts } =
    useFetchBlogs("product");

  return (
    <SimpleGrid minChildWidth="120px" spacing="30px">
      <DashboardStatCard
        isLoading={isLoadingCategories}
        label="Total Categories"
        icon={<BiSolidCategory style={{ color: "green" }} fontSize="2rem" />}
        value={!isEmpty(categories) ? categories.length : 0}
        route="category"
      />
      <DashboardStatCard
        isLoading={isLoadingBlogs}
        label="Total Blog"
        icon={<GrArticle style={{ color: "green" }} fontSize="2rem" />}
        value={!isEmpty(blogData) ? blogData.length : 0}
        route="blog"
      />
      <DashboardStatCard
        isLoading={isLoadingDeals}
        label="Total Deals"
        icon={<BiSolidOffer style={{ color: "green" }} fontSize="2rem" />}
        value={!isEmpty(dealData) ? dealData.length : 0}
        route="deal"
      />
      <DashboardStatCard
        isLoading={isLoadingProducts}
        label="Total Products"
        icon={<GiShoppingBag style={{ color: "green" }} fontSize="2rem" />}
        value={!isEmpty(productData) ? productData.length : 0}
        route="product"
      />
    </SimpleGrid>
  );
}
