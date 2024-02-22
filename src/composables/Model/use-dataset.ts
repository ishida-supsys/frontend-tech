/**
 * Query Composable
 */

import { computed, unref } from "vue";
import axios from "axios";
import { useMutation, useQuery, UseQueryOptions, UseMutationOptions, useQueries } from "vue-query";
import { MaybeRef } from "@vueuse/core";
import {
  GetDatasets200Response,
  ErrorResponse,
  PostDatasets200Response,
  PostDatasetsRequest,
  GetDatasetsId200Response,
  DeleteDatasetsIdResponse,
  PutDatasetsId200Response,
  // PutDatasetsIdRequest,
} from "@/types/dataset";
import _clonedeep from "lodash.clonedeep";

export type Dataset = {
  id: string;
  name: string;
};

export const useFetchDatasetList = (options?: UseQueryOptions<GetDatasets200Response, ErrorResponse>) => {
  const { data, isLoading, isError, error } = useQuery<GetDatasets200Response, ErrorResponse>(
    "datasets",
    async () => {
      const response = await axios.get("/datasets");
      return response.data;
    },
    options
  );

  const datasets = computed<Dataset[]|undefined>(() => data.value);
  const errorReason = computed<string | undefined>(() => error.value?.code);

  return { data, isLoading, isError, error, datasets, errorReason };
};

export const useCreateDataset = (options?: UseMutationOptions<PostDatasets200Response, ErrorResponse, PostDatasetsRequest, void>) => {
  const {  mutate, data, isLoading, isError, error } = useMutation<PostDatasets200Response, ErrorResponse, PostDatasetsRequest, void>(
    async (data) => {
      const response = await axios.post("/datasets", data);
      return response.data;
    },
    options
  );

  const dataset = computed<Dataset | undefined>(() => data.value);
  const errorReason = computed<string | undefined>(() => error.value?.code);

  return {
    mutate,
    data,
    isLoading,
    isError,
    error,
    dataset,
    errorReason,
  };
}

export const useFetchDataset = (id: MaybeRef<string>, options?: UseQueryOptions<GetDatasetsId200Response, ErrorResponse>) => {
  const { data, isLoading, isError, error } = useQuery<GetDatasetsId200Response, ErrorResponse>(
    ["datasets", id],
    async () => {
      const response = await axios.get(`/datasets/${unref(id)}`);
      return response.data;
    },
    options
  );

  const dataset = computed<Dataset | undefined>(() => data.value);
  const errorReason = computed<string | undefined>(() => error.value?.code);

  return { data, isLoading, isError, error, dataset, errorReason };
}
export const useFetchDatasets = (ids: MaybeRef<string[]>, options?: UseQueryOptions<GetDatasetsId200Response, ErrorResponse>) => {
  const dataRefQuery = computed<UseQueryOptions<GetDatasetsId200Response, ErrorResponse>[]>(() =>
    unref(ids).map((id) => {
      return {
        queryKey: ["datasets", id],
        queryFn: async () => {
          const response = await axios.get(`/datasets/${id}`);
          return response.data;
        },
        ...options,
      };
    })
  );
  const dataList = useQueries(dataRefQuery);
  const datasets = computed<(Dataset|undefined)[]>(() => dataList.map((data) => data.data));
  const isLoading = computed(() => dataList.some((data) => data.isLoading));
  const isError = computed(() => dataList.some((data) => data.isError));
  const errors =  computed(() => dataList.map((data) => data.error));
  const errorReasons = computed(() => dataList.map((data) => data.error?.code));

  return {
    dataList,
    datasets,
    isLoading,
    isError,
    errors,
    errorReasons,
  };
}


export const useUpdateDataset = (dataset: MaybeRef<Dataset>, options?: UseMutationOptions<PutDatasetsId200Response, ErrorResponse, void, void>) => {
  const { mutate, data, isLoading, isError, error } = useMutation<PutDatasetsId200Response, ErrorResponse, void, void>(
    async () => {
      const response = await axios.put(`/datasets/${unref(dataset).id}`, unref(dataset));
      return response.data;
    },
    options
  );

  const errorReason = computed<string | undefined>(() => error.value?.code);

  return {
    mutate,
    data,
    isLoading,
    isError,
    error,
    errorReason,
  };
}

export const useDeleteDataset = (options?: UseMutationOptions<DeleteDatasetsIdResponse, ErrorResponse, string, void>) => {
  const { mutate, data, isLoading, isError, error } = useMutation<DeleteDatasetsIdResponse, ErrorResponse, string, void>(
    async (id) => {
      const response = await axios.delete(`/datasets/${id}`);
      return response.data;
    },
    options
  );

  const dataset = computed<Dataset | undefined>(() => data.value);
  const errorReason = computed<string | undefined>(() => error.value?.code);

  return {
    mutate,
    data,
    isLoading,
    isError,
    error,
    dataset,
    errorReason,
  };
}
