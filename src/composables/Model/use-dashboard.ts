/*
# Query Composable

* バックエンドに通信し、OpenAPI <-> DataModelの変換を行う
* DataModelはOpenAPIに一致しても良い
  * とにかくContainerComponentに直接OpenAPIの定義を参照させないようにして、OpenAPI側の
    交通整理タスクに耐性を持たせる
  * DataModelとOpenAPIが一致していない場合は各Composableで変換処理が必要

## DataModelとOpenAPIが一致しない場合とは

* OpenAPIで定義できない形式をDataModel側で持たせたい場合
  * OpenAPIではstringだけど、DataModelでDateにする等
* OpenAPIはrequiredだけどDataModel的にrequiredにしたくない場合
  * バックエンドに問い合わせて初めて確定する情報など。id・lastmodifyとか。

## ファイルの単位

第一セグメントごとに1ファイルかな？
/dashboard/** -> use-dashboard
/scenario/** -> use-scenario

*/
import { computed, unref } from "vue";
import axios from "axios";
import { useMutation, useQuery, UseQueryOptions, UseMutationOptions } from "vue-query"; 
import { MaybeRef } from "@vueuse/core";
//import OpenAPI
import { 
  GetDashboards200Response, 
  ErrorResponse, 
  PostDashboards200Response, 
  PostDashboardsRequest,
  GetDashboardsId200Response,
  DeleteDashboardsIdResponse,
  PutDashboardsId200Response,
  PutDashboardsIdRequest,
} from "@/types/dashboard";
import _clonedeep from "lodash.clonedeep"

export type DashboardPanel = {
  id: string;
  name: string | undefined;
  type: "kpi" | "timeseries" | "ranking";
  datasetId: string | undefined;
}
//define DataModel
export type Dashboard = {
  id: number | undefined;
  name: string | undefined;
  panels: DashboardPanel[];
}
//DataModelとOpenAPIを完全に一致させる場合
// import { Dashboard as ApiDashboard } from "@/generated/craft/response/dashboard"
// export type Dashboard = ApiDashboard //完全に一致

//一覧
export const useFetchDashboards = (options?: UseQueryOptions<GetDashboards200Response, ErrorResponse>)=>{
  const { data, isLoading, isError, error } = useQuery<
    GetDashboards200Response, 
    ErrorResponse
  >('Dashboards', async ()=>{
    const { data } = await axios.get('/dashboards');
    return data;
  }, options);

  const dashboards = computed<Dashboard[]|undefined>(()=>data.value)
  const errorReason = computed(()=>error.value?.code)

  return {
    data,
    dashboards,
    isLoading,
    isError,
    error,
    errorReason,
  }
}

//新規作成
export const useCreateDashboard = (options?: UseMutationOptions<PostDashboards200Response, ErrorResponse, PostDashboardsRequest, void>)=>{
  const { mutate, data, isLoading, isError, error } = useMutation<
    PostDashboards200Response, 
    ErrorResponse,
    PostDashboardsRequest,
    void
  >(async ()=>{
    const { data } = await axios.post('/dashboards');
    return data;
  }, options)

  const dashboard = computed<Dashboard|undefined>(()=>data.value)
  const errorReason = computed(()=>error.value?.code)

  return {
    mutate,
    data,
    dashboard,
    isLoading,
    isError,
    error,
    errorReason,
  }
}

//参照
export const useFetchDashboard = (id: MaybeRef<number>, options?: UseQueryOptions<GetDashboardsId200Response, ErrorResponse>)=>{
  const { data, isLoading, isError, error } = useQuery<
    GetDashboardsId200Response, 
    ErrorResponse
  >(['Dashboard', computed(()=>unref(id))], async ()=>{
    const { data } = await axios.get(`/dashboards/${unref(id)}`);
    return data;
  }, options)

  const dashboard = computed<Dashboard|undefined>(()=>data.value)
  const errorReason = computed(()=>error.value?.code)

  return {
    data,
    dashboard,
    isLoading,
    isError,
    error,
    errorReason,
  }
}

//更新
export const useUpdateDashboard = (source: MaybeRef<Dashboard>, options?: UseMutationOptions<PutDashboardsId200Response, ErrorResponse, PutDashboardsIdRequest, void>)=>{
  const { mutate, data, isLoading, isError, error } = useMutation<
    PutDashboardsId200Response, 
    ErrorResponse,
    PutDashboardsIdRequest,
    void
  >(async ()=>{
    const { data } = await axios.put(`/dashboards/${unref(source).id}`, unref(source));
    return data;
  }, options)

  const dashboard = computed<Dashboard|undefined>(()=>data.value)
  const errorReason = computed(()=>error.value?.code)

  return {
    mutate,
    data,
    dashboard,
    isLoading,
    isError,
    error,
    errorReason,
  }
}

//削除
export const useRemoveDashboard = (id: MaybeRef<number>, options?: UseMutationOptions<DeleteDashboardsIdResponse, ErrorResponse, void, void>)=>{
  const { mutate, data, isLoading, isError, error } = useMutation<
    DeleteDashboardsIdResponse, 
    ErrorResponse,
    void,
    void
  >(async ()=>{
    const { data } = await axios.delete(`/dashboards/${unref(id)}`);
    return data;
  }, options)

  const errorReason = computed(()=>error.value?.code)
  
  return {
    mutate,
    data,
    isLoading,
    isError,
    error,
    errorReason,
  }
}
