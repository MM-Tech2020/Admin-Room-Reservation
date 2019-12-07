import React, { Component } from "react";
import {
  List,
  Footer,
  FooterTab,
  ListItem,
  Text,
  Button,
  Body,
  Container,
  Content,
  View,
  Left,
  Right,
  Icon
} from "native-base";

import { FooterComponent } from "./footer-component";

import {
  State,
  selectReservationHour,
  getReservationDetails,
  loadDefaultPlayground
} from "../../state";
import { ReservationDto, PlaygroundDto } from "../../proxy/dtos/classes";

import * as _ from "lodash";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

class ReservationsListContainer extends Component {
  static mapStateToProps(state: State) {
    return {
      playground: state.selectedPlayground.current,
      reservedHours: state.selectedPlayground.reservedHours
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        selectReservationHour,
        getReservationDetails,
        loadDefaultPlayground
      },
      dispatch
    );
  }
  props: {
    reservedHours: ReservationDto[],
    playground: PlaygroundDto,
    selectReservationHour: (hour: number) => void,
    getReservationDetails: (reservationId: number) => void,
    loadDefaultPlayground: () => void
  };
  static navigationOptions = ({ navigation, state }) => {
    return {
      title: "Available Hours"
    };
  };

  dayHours = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24
  ];

  render() {
    // const hours = _.map(this.dayHours, dH => {
    //   let out = _.filter(
    //     this.props.reservations.reservationHours,
    //     r => r.hour == dH
    //   );
    //   if (out.length != 0) {
    //     return {
    //       date: this.props.reservations.date,
    //       payment: out[0].payment,
    //       hour: dH
    //     };
    //   }
    //   return {
    //     date: this.props.reservations.date
    //   };
    // });
    // const hours = _.filter(this.dayHours, h =>
    //   _.find(
    //     this.props.reservedHours,
    //     (hour: ReservationDto) => hour.reservationDetails.hour == h
    //   )
    // );
    var hours = this.dayHours;
    // this.props.reservedHours.forEach((reservation: ReservationDto) => {
    //   // hours = _.remove(hours, h => h == reservation.reservationDetails.hour);
    //   hours[reservation.reservationDetails.hour - 1] = reservation;
    // });
    _.forEach(this.props.reservedHours, reservation => {
      hours[reservation.reservationDetails.hour - 1] = reservation;
    });
    return (
      <Container>
        <Content>
          <List>
            {_.map(hours, (res, key) => {
              const btn = res.reservationDetails ? (
                <Text
                  onPress={() => {
                    this.props.getReservationDetails(res.id);
                    this.props.navigation.navigate("ViewReservation");
                  }}
                >
                  View
                </Text>
              ) : (
                <Text
                  onPress={() => {
                    this.props.selectReservationHour(res);
                    this.props.navigation.navigate("ConfirmReservation");
                  }}
                >
                  Reserve
                </Text>
              );
              return (
                <ListItem key={key} icon>
                  <Left>
                    <Text>
                      {key + 1 >= 12
                        ? `${
                            key + 1 - 12 == 0
                              ? 12 + " AM"
                              : key + 1 - 12 + " PM"
                          }`
                        : `${key + 1} AM`}
                    </Text>
                  </Left>
                  <Body>
                    <Text>
                      {"Price/Hour:"} {"\t"}{" "}
                      {key + 1 > this.props.playground.switchingHour &&
                      key + 1 <= this.props.playground.switchingHour + 12
                        ? `${this.props.playground.morningPrice} LE`
                        : `${this.props.playground.nightPrice} LE`}
                    </Text>
                  </Body>
                  <Right>
                    {btn}
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
        {/* <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                this.props.loadDefaultPlayground();
                this.props.navigation.navigate("DefaultPlayground");
              }}
            >
              <Text>Home</Text>
            </Button>
            <Button
              onPress={() => {
                this.props.navigation.navigate("PlaygroundsScreen");
              }}
            >
              <Text>Rooms</Text>
            </Button>

   
          </FooterTab>
        </Footer> */}

        <FooterComponent
          navigation={this.props.navigation}
          homeActive={false}
          myReservationsActive={true}
        />
      </Container>
    );
  }
}

export const ReservationsList = connect(
  ReservationsListContainer.mapStateToProps,
  ReservationsListContainer.mapDispatchToProps
)(ReservationsListContainer);
