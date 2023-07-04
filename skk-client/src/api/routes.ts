import { IRoute } from "components/Routes/RouteListItem/RouteListItem";
import { api } from "./base";
import { AxiosResponse } from "axios";

interface ISearchResponse {
  routes: IRoute[];
  arrivalLocations: string[];
}

const search = (data: {
  arrival_location?: string;
  departure_time?: Date;
}): Promise<AxiosResponse<ISearchResponse>> => api.post("/routes/search", data);

export { search };
