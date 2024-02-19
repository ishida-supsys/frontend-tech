
export type ErrorResponse = {
  code: string;
  reason: string;
  detail?: string;
}

export type DashboardPanel = {
  id: string;
  name: string;
  type: "kpi" | "timeseries" | "ranking";
  datasetId: string;
}

export type Dashboard = {
  id: number;
  name: string;
  panels: DashboardPanel[];
}

export type GetDashboards200Response = Dashboard[];
export type PostDashboards200Response = Dashboard;
export type PostDashboardsRequest = Dashboard;
export type GetDashboardsId200Response = Dashboard;
export type PutDashboardsIdRequest = Dashboard;
export type PutDashboardsId200Response = Dashboard;
export type DeleteDashboardsIdResponse = Dashboard;
