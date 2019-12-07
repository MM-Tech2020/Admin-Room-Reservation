import { PlaygroundDto } from "../../proxy/dtos/classes";

export interface DataState {
  playgrounds: PlaygroundDto[] | null;
}

export const dataInitialState = {
  playgrounds: null
};
