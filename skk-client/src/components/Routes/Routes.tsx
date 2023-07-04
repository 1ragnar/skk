import React, { useState, useCallback, useEffect } from "react";
import { IRoute, ISeat, RouteListItem } from "./RouteListItem/RouteListItem";
import { ISearchData, RouteSearchBar } from "./RouteSearchBar/RouteSearchBar";
import { List } from "@mui/material";
import PurchaseModal from "components/Modals/PurchaseModal/PurchaseModal";
import {
  BankCardModal,
  ICardData,
} from "components/Modals/BankCardModal.tsx/BankCardModal";
import { useAppContext } from "AppContext";
import { ISelectElement } from "components/CustomSelect/CustomSelect";
import moment from "moment";
import { Loading } from "components/Loading/Loading";
import { buyTicket, fetchData } from "./routeService";
import { useSnackbar } from "notistack";
import { getAvailableSeats } from "helpers";

export interface IRoutesProps {}

const Routes: React.FC<IRoutesProps> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state] = useAppContext();
  const [data, setData] = useState<{
    routes: IRoute[];
    loading: boolean;
  }>({
    routes: [],
    loading: true,
  });
  const [arrivalLocations, setArrivalLocations] = useState<ISelectElement[]>(
    []
  );
  const [isProcessingPayment, setIsProcessingPayment] =
    useState<boolean>(false);
  const [purchaseData, setPurchaseData] = useState<{
    isVisible: boolean;
    route?: IRoute;
  }>({ isVisible: false });

  const [bankCardModalData, setBankCardModalData] = useState<{
    isVisible: boolean;
    selectedSeat: ISeat | undefined;
  }>({
    isVisible: false,
    selectedSeat: undefined,
  });

  const [searchData, setSearchData] = useState<ISearchData>({
    arrivalLocation: "",
    departureTime: moment(new Date()).toDate(),
  });

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = useCallback(async (data?: ISearchData) => {
    try {
      let response = await fetchData(data);

      if (response) {
        setData({
          routes: response.routes,
          loading: false,
        });
        setArrivalLocations(response.arrivalLocations);
      }
    } catch (e) {
      enqueueSnackbar(
        "Something went wrong returning data.Please try again...",
        {
          variant: "error",
        }
      );
    }
  }, []);

  const onBuyPress = useCallback((route: IRoute) => {
    setPurchaseData({ isVisible: true, route: route });
  }, []);

  const onSubmitPayment = useCallback(
    async (cardData: ICardData, actions: any) => {
      try {
        if (bankCardModalData.selectedSeat) {
          setIsProcessingPayment(true);
          await buyTicket({
            cardData: cardData,
            selectedSeat: bankCardModalData.selectedSeat,
            user: state.user,
          });

          await handleFetchData(searchData);
        } else {
          enqueueSnackbar("Please select the seat", {
            variant: "warning",
          });
        }
      } catch (e) {
        enqueueSnackbar("Error occurred during payment processing", {
          variant: "error",
        });
      } finally {
        actions.setSubmitting(false);
      }
    },
    [bankCardModalData, searchData]
  );

  const handleOnBuyPress = useCallback((route: IRoute) => {
    if (getAvailableSeats(route.bus.seats) === 0) {
      enqueueSnackbar("There are no available seats", {
        variant: "warning",
      });
    } else {
      onBuyPress(route);
    }
  }, []);

  if (data.loading) {
    return <Loading text={"Loading routes"} />;
  }

  return (
    <>
      <RouteSearchBar
        arrivalLocations={arrivalLocations}
        onSearch={(searcData) => {
          setSearchData(searcData);
          handleFetchData(searcData);
        }}
      />
      <List style={{ marginTop: 20 }}>
        {data.routes.map((route: IRoute, index) => (
          <RouteListItem
            key={index}
            route={route}
            onBuyPress={() => {
              handleOnBuyPress(route);
            }}
          />
        ))}
      </List>
      {purchaseData.isVisible && purchaseData.route && (
        <PurchaseModal
          isVisible={purchaseData.isVisible}
          route={purchaseData.route}
          onClose={() =>
            setPurchaseData({ isVisible: false, route: undefined })
          }
          onBuy={(selectedSeat) => {
            setPurchaseData({ route: undefined, isVisible: false });

            setBankCardModalData({
              isVisible: true,
              selectedSeat: selectedSeat,
            });
          }}
        />
      )}

      {bankCardModalData.isVisible && (
        <BankCardModal
          isVisible={bankCardModalData.isVisible}
          onClose={() => {
            setBankCardModalData({ isVisible: false, selectedSeat: undefined });
            setIsProcessingPayment(false);
          }}
          onSubmitPress={(cardData, actions) => {
            onSubmitPayment(cardData, actions);
          }}
          isProcessingPayment={isProcessingPayment}
        />
      )}
    </>
  );
};

export { Routes };
