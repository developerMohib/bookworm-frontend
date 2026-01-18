"use client"
import { axiosInstance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetcher = async (url: string) => {
  const {data} = await axiosInstance.get(url);
  return data.data;
};

export const useApiData = (key: string, url: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetcher(url),
    staleTime: 60 * 1000,
    retry: 1,
  });
};
