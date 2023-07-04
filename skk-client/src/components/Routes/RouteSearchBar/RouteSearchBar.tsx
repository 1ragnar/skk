import React, { useState } from "react";
import { Button } from "@mui/material";
import moment from "moment";
import {
  CustomSelect,
  ISelectElement,
} from "components/CustomSelect/CustomSelect";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  FilterField,
  FilterFieldsContainer,
  RootContainer,
  SearchButton,
  SearchButtonContainer,
} from "./styles";

export type IRouteSearchBarProps = {
  onSearch: (searchData: ISearchData) => void;
  isFilterDisabled?: boolean;
  arrivalLocations: ISelectElement[];
};

export interface ISearchData {
  arrivalLocation: string;
  departureTime: Date;
}

const RouteSearchBar: React.FC<IRouteSearchBarProps> = ({
  onSearch,
  isFilterDisabled = false,
  arrivalLocations,
}) => {
  const [searchData, setSearchData] = useState<ISearchData>({
    arrivalLocation: "",
    departureTime: moment(new Date()).toDate(),
  });

  return (
    <RootContainer>
      <FilterFieldsContainer>
        <FilterField>
          <CustomSelect
            data={[{ id: 0, name: "Sisak" }]}
            disabled={true}
            heading={"Departure location"}
            value={"Sisak"}
            onValueChange={(value: string) => {}}
          />
        </FilterField>
        <FilterField>
          <CustomSelect
            data={arrivalLocations}
            disabled={isFilterDisabled}
            heading={"Arrival locations"}
            value={searchData.arrivalLocation}
            onValueChange={(value: string) => {
              setSearchData({ ...searchData, arrivalLocation: value });
            }}
          />
        </FilterField>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disablePast
            format="dd/MM/yyyy"
            disabled={isFilterDisabled}
            value={searchData.departureTime}
            onChange={(e: any) => {
              setSearchData({ ...searchData, departureTime: e });
            }}
            label="Departure time"
          />
        </LocalizationProvider>
      </FilterFieldsContainer>

      <SearchButtonContainer>
        <SearchButton
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => {
            onSearch(searchData);
          }}
        >
          Search
        </SearchButton>
      </SearchButtonContainer>
    </RootContainer>
  );
};

export { RouteSearchBar };
