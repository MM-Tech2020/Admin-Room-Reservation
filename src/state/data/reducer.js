import { AnyAction } from 'redux';

import {
  ADD_PLAYGROUNDS,
  LOAD_PLAYGROUNDS,
  FAILD_LOAD_PLAYGROUNDS,
  RESERVE_PLAYGROUND,
  CREATE_PLAYGROUND
} from './actions';
import { DataState, dataInitialState } from './state';

import * as _ from 'lodash';

export function dataReducer(
  state: DataState = dataInitialState,
  action: AnyAction
): DataState {
  switch (action.type) {
    case ADD_PLAYGROUNDS: {
      var playgroundsById = _.keyBy(action.payload, pg => pg.id);
      return {
        playgrounds: playgroundsById
      };
    }
    // case REMOVE_PLAYGROUND: {
    //   delete state.playgrounds[action.payload];
    //   return {
    //     ...state,
    //     playgrounds: state.playgrounds
    //   };
    // }

    case CREATE_PLAYGROUND: {
      return {
        ...state,
        playgrounds: {
          ...state.playgrounds,
          [action.payload.id]: action.payload
        }
      };
    }
    default:
      return state;
  }
}
