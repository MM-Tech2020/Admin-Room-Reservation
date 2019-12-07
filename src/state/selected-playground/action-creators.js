import {
  SELECT_PLAYGROUND,
  RESERVE_PLAYGROUND,
  FAILD_LOAD_PLAYGROUND_DETAILS,
  CONFIRM_RESERVATION,
  FAILD_CONFIRM_RESERVATIONS,
  SELECT_RESERVATION_HOUR,
  GET_RESERVATION_DETAILS,
  FAILD_GET_RESERVATION_DETAILS,
  TRY_CANCEL_RESERVATION,
  RESERVATION_CANCELED,
  FAILD_CANCEL_RESERVATION
} from "./actions";
import { PlaygroundDto } from "../../proxy/dtos/classes";
import { HttpClient } from "../../services/http-client/http-client-service";
import { State } from "..";

import * as _ from "lodash";

export async function selectPlayground(playgroundId: number) {
  return async (dispatch, getState) => {
    const state: State = getState();

    dispatch({
      type: SELECT_PLAYGROUND,
      payload: state.data.playgrounds[playgroundId]
    });
    var response = await HttpClient.httpFetch(`/playground/${playgroundId}`, {
      method: "GET"
    });
    if (response.status != 200) {
      dispatch({
        type: FAILD_LOAD_PLAYGROUND_DETAILS
      });
    }
    var playgroundDetails = await response.json();
    dispatch({
      type: SELECT_PLAYGROUND,
      payload: playgroundDetails
    });
  };
}

export async function loadDefaultPlayground() {
  return async (dispatch, getState) => {
    const state: State = getState();

    var response = await HttpClient.httpFetch(
      `/admin/defaultplayground/${state.authorization.token.organizationId}`,
      {
        method: "GET"
      }
    );
    if (response.status != 200) {
      dispatch({
        type: FAILD_LOAD_PLAYGROUND_DETAILS
      });
    }
    var playgroundDetails = await response.json();
    dispatch({
      type: SELECT_PLAYGROUND,
      payload: playgroundDetails
    });
  };
}

export function reservePlayground(date: string) {
  return {
    type: RESERVE_PLAYGROUND,
    payload: date
  };
}

export async function confirmReservation(reservationModel: any) {
  return async (dispatch, getState) => {
    const state: State = getState();
    reservationModel.playgroundId = state.selectedPlayground.current.id;
    reservationModel.date = state.selectedPlayground.reservationDate;
    reservationModel.hour = state.selectedPlayground.selectedHour;
    var response = await HttpClient.httpFetch(
      `/admin/reservations/${state.authorization.token.adminId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(reservationModel)
      }
    );
    if (response.status != 200) {
      dispatch({
        type: FAILD_CONFIRM_RESERVATIONS
      });
    }
    dispatch({
      type: CONFIRM_RESERVATION
    });
  };
}

export function selectReservationHour(hour: number) {
  return {
    type: SELECT_RESERVATION_HOUR,
    payload: hour
  };
}

export async function getReservationDetails(reservationId: number) {
  return async dispatch => {
    var response = await HttpClient.httpFetch(
      `/admin/reservations/${reservationId}`,
      { method: "GET" }
    );
    if (response.status != 200) {
      dispatch({
        type: FAILD_GET_RESERVATION_DETAILS
      });
    }
    var reservation = await response.json();
    dispatch({
      type: GET_RESERVATION_DETAILS,
      payload: reservation
    });
  };
}

export async function cancelReservation(reservationId: number) {
  return async dispatch => {
    dispatch({
      type: TRY_CANCEL_RESERVATION
    });
    var response = await HttpClient.httpFetch(
      `/admin/reservations/${reservationId}`,
      { method: "DELETE" }
    );
    if (response.status != 200) {
      dispatch({
        type: FAILD_CANCEL_RESERVATION
      });
    }

    dispatch({
      type: RESERVATION_CANCELED
    });
  };
}
