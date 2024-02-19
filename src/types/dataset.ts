
export type ErrorResponse = {
  code: string;
  reason: string;
  detail?: string;
}

export type Dataset = {
  id: string;
  name: string;  
}

export type GetDatasets200Response = Dataset[];
export type PostDatasets200Response = Dataset;
export type GetDatasetsId200Response = Dataset;
export type PutDatasetsIdRequest = Dataset;
export type PutDatasetsId200Response = Dataset;
export type DeleteDatasetsIdResponse = Dataset;
