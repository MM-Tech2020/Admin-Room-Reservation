import { PlaygroundDto } from "../../proxy/dtos/classes";
import { HttpClient } from "../../services/http-client/http-client-service";
import {
  LOAD_PLAYGROUNDS,
  FAILD_LOAD_PLAYGROUNDS,
  ADD_PLAYGROUNDS,
  RESERVE_PLAYGROUND,
  CREATE_PLAYGROUND
} from "./actions";

import { State } from "../state";

export async function loadPlaygrounds() {
  return async (dispatch, getState) => {
    const state: State = getState();
    var response = await HttpClient.httpFetch(
      `/Admin/playground/${state.authorization.token.organizationId}`,
      {
        method: "GET"
      }
    );

    if (response.status != 200) {
      dispatch({
        type: FAILD_LOAD_PLAYGROUNDS
      });
    }
    var playgrounds = await response.json();
    dispatch({
      type: ADD_PLAYGROUNDS,
      payload: playgrounds
    });
  };
}

export function addPlayground(playground: PlaygroundDto) {
  return {
    type: ADD_PLAYGROUND,
    payload: playground
  };
}

export function removePlayground(id: number) {
  return {
    type: REMOVE_PLAYGROUND,
    payload: id
  };
}

export async function createPlayground(createPlaygroundModel: any) {
  debugger;
  return async (dispatch, getState) => {
    const state: State = getState();
    let i = 0;
    var list = [
      "https://image.shutterstock.com/z/stock-photo-business-people-discussing-together-in-conference-room-during-meeting-at-office-1499996621.jpg",
      "https://image.shutterstock.com/z/stock-photo-business-people-discussing-together-in-conference-room-during-meeting-at-office-1499996621.jpg",
      "https://image.shutterstock.com/z/stock-photo-business-people-discussing-together-in-conference-room-during-meeting-at-office-1499996621.jpg",
      "https://image.shutterstock.com/z/stock-photo-business-people-discussing-together-in-conference-room-during-meeting-at-office-1499996621.jpg"
    ];
    createPlaygroundModel.image = list[i++];
    var response = await HttpClient.httpFetch(
      `/Admin/playground/${state.authorization.token.organizationId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(createPlaygroundModel)
      }
    );
    var id = await response.text();
    debugger;
    createPlaygroundModel.id = id;
    dispatch({
      type: CREATE_PLAYGROUND,
      payload: createPlaygroundModel
    });
  };
}
