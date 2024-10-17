import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "../configs/axiosInstance";
import { apiConstant } from "../enum/apiConstant";

const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get(apiConstant.ADMIN_CATEGORIES);
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const useFetchCategories = () =>
  useQuery(apiConstant.ADMIN_CATEGORIES, fetchCategories);

export const createCategory = async (payload: any) => {
  try {
    const response = await axiosInstance.post(
      apiConstant.ADMIN_CATEGORIES_CREATE,
      {
        ...payload,
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
  }
};
export const useCreateCategory = () => useMutation(createCategory);

export const publishBlog = async (payload: any) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("category", payload.category);
  formData.append("tags", payload.tags);
  formData.append("body", payload.body);
  formData.append("thumbnail", payload.thumbnail);

  const response = await axiosInstance.post(
    apiConstant.ADMIN_BLOGS_CREATE_POST,
    formData
  );

  return response;
};
export const usePublishBlog = () => useMutation(publishBlog);

export const fetchBlogs = async () => {
  try {
    const response = await axiosInstance.get(apiConstant.ADMIN_BLOGS_ALL);
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const useFetchBlogs = () =>
  useQuery(apiConstant.ADMIN_BLOGS_ALL, fetchBlogs);
