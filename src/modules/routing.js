import { createStackNavigator } from "react-navigation";

import {
  confirmReservationScreen,
  CreatePlaygroundScreen,
  LoginScreen,
  PayReservationScreen,
  PitchScreen,
  PlaygroundsScreen,
  ReservationsList,
  ViewReservationScreen
} from "./screens/index";

export const Navigator = createStackNavigator(
  {
    PlaygroundsScreen: { screen: PlaygroundsScreen },
    PitchScreen: { screen: PitchScreen },
    DefaultPlayground: { screen: PitchScreen },
    ReservationsList: { screen: ReservationsList },
    CreatePlayground: { screen: CreatePlaygroundScreen },
    ConfirmReservation: { screen: confirmReservationScreen },
    PayReservation: { screen: PayReservationScreen },
    ViewReservation: { screen: ViewReservationScreen },
    LoginScreen: { screen: LoginScreen }
    // LocationScreen: { screen: LocationScreen }
  },
  {
    initialRouteName: "LoginScreen"
  }
);
