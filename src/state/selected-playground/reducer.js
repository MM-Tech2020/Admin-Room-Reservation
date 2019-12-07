import { AnyAction } from "redux";
import {
  SELECT_PLAYGROUND,
  RESERVE_PLAYGROUND,
  CONFIRM_RESERVATION,
  SELECT_RESERVATION_HOUR,
  GET_RESERVATION_DETAILS,
  FAILD_LOAD_PLAYGROUND_DETAILS,
  FAILD_CANCEL_RESERVATION,
  RESERVATION_CANCELED,
  TRY_CANCEL_RESERVATION
} from "./actions";
import * as _ from "lodash";

import {
  SelectedPlaygroundState,
  SelectedPlaygroundInitialState
} from "./state";

export function selectedPlaygroundReducer(
  state: SelectedPlaygroundState = SelectedPlaygroundInitialState,
  action: AnyAction
): SelectedPlaygroundState {
  switch (action.type) {
    case SELECT_PLAYGROUND: {
      return {
        ...state,
        current: action.payload
      };
    }
    case RESERVE_PLAYGROUND: {
      // const res = _.keyBy(state.current.reservations, r => r.date);
      // const selectedResHours = _.keyBy(
      //   res[action.payload].reservationHours,
      //   resH => resH.hour
      // );
      // res[action.payload].reservationHours = selectedResHours;

      const reservedHours = _.filter(
        state.current.reservations,
        r =>
          parseInt(r.date.split(" ")[0].split("/")[0]) ==
            parseInt(action.payload.split("-")[1]) &&
          parseInt(r.date.split(" ")[0].split("/")[1]) ==
            parseInt(action.payload.split("-")[2])
      );
      return {
        ...state,
        reservationDate: action.payload,
        // selectedReservation: res[action.payload],
        reservedHours: reservedHours
      };
    }
    case SELECT_RESERVATION_HOUR: {
      return {
        ...state,
        selectedHour: action.payload
      };
    }
    case GET_RESERVATION_DETAILS: {
      return {
        ...state,
        currentReservation: action.payload
      };
    }
    case TRY_CANCEL_RESERVATION:
    case RESERVATION_CANCELED:
    case FAILD_CANCEL_RESERVATION:
    case CONFIRM_RESERVATION:
    default:
      return state;
  }
}
