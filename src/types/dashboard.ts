
export type ErrorResponse = {
  code: string;
  reason: string;
  detail?: string;
}

export type Dashboard = {
  id: number;
  name: string;
}

export type GetDashboards200Response = Dashboard[];
export type PostDashboards200Response = Dashboard;
export type GetDashboardsId200Response = Dashboard;
export type PutDashboardsIdRequest = Dashboard;
export type PutDashboardsId200Response = Dashboard;
export type DeleteDashboardsIdResponse = Dashboard;
