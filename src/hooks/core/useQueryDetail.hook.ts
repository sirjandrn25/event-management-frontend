"use client";
import { DictionaryType } from "@/types/common.type";
import { APIResponse, ApiService } from "@/utils/api-service.utils";
import { useQuery } from "@tanstack/react-query";

interface UseQueryDetailProps {
  endPoint: string;
  searchParams?: DictionaryType;
}

interface GetQueryDetailReturnProps<TData>
  extends Omit<CustomQueryDetailReturnProps<TData>, "data"> {
  data: TData;
}
interface CustomQueryDetailProps<TData> {
  queryFunction: () => Promise<APIResponse<TData>>;
  extraQueryKey: any[];
  disableNetwork?: boolean;
}
interface CustomQueryDetailReturnProps<TData> {
  isLoading?: boolean;
  data: TData;
}
const useQueryDetail = <TData>({
  endPoint,
  searchParams,
}: UseQueryDetailProps): GetQueryDetailReturnProps<TData> => {
  const { data, isLoading } = useCustomQueryDetail({
    queryFunction: async () => {
      const service = new ApiService(endPoint);

      return await service.getOne();
    },
    extraQueryKey: [`detail of ${endPoint}`, searchParams],
    // disableNetwork: !session?.data?.access_token,
  });
  return { data: data as TData, isLoading };
};

const useCustomQueryDetail = <TData>({
  queryFunction,
  extraQueryKey,
  disableNetwork,
}: CustomQueryDetailProps<TData>): CustomQueryDetailReturnProps<TData> => {
  const { data, isLoading } = useQuery({
    queryKey: extraQueryKey,
    queryFn: queryFunction,
    enabled: !disableNetwork,
  });
  return { data: data?.data as TData, isLoading };
};

export default useQueryDetail;
