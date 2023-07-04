import api from "api";
import { ISelectElement } from "components/CustomSelect/CustomSelect";
import { ICardData } from "components/Modals/BankCardModal.tsx/BankCardModal";
import { IUser } from "types";
import { IRoute, ISeat } from "./RouteListItem/RouteListItem";
import { ISearchData } from "./RouteSearchBar/RouteSearchBar";

export interface IFetchDataResponse {
  routes: IRoute[];
  arrivalLocations: ISelectElement[];
}

export const fetchData = (data?: ISearchData): Promise<IFetchDataResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchObject = data
        ? {
            arrival_location: data.arrivalLocation,
            departure_time: data.departureTime,
          }
        : {};

      let res = await api.routes.search(searchObject);

      return resolve({
        routes: res.data.routes,
        arrivalLocations: transformArrayToObjectArray(
          res.data.arrivalLocations
        ),
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const buyTicket = (data: {
  cardData: ICardData;
  selectedSeat: ISeat;
  user: number;
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ticket = await api.tickets.buy({
        seat: data.selectedSeat,
        user: data.user,
      });

      //I didn't store bank card data in database because it is not the best practice to do so; better option use third-party payment gateway

      return resolve({
        ticket: ticket,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const transformArrayToObjectArray = (
  strings: string[]
): ISelectElement[] => {
  return strings.map((str, index) => ({ id: index + 1, name: str }));
};
