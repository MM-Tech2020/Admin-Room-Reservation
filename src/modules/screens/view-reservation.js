import React, { Component } from "react";
import {
  View,
  Footer,
  FooterTab,
  Container,
  Header,
  Button,
  Icon,
  Body,
  Right,
  Left,
  Title,
  SubTitle,
  Text,
  Label,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Image,
  Spinner
} from "native-base";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { State, reservePlayground, cancelReservation } from "../../state";
import { PlaygroundDto, ReservationDto } from "../../proxy/dtos/classes";
import * as _ from "lodash";

class ViewReservationContainer extends Component {
  static mapStateToProps(state: State) {
    return {
      reservation: state.selectedPlayground.currentReservation
    };
  }
  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({ cancelReservation }, dispatch);
  }

  props: {
    reservation: ReservationDto,
    cancelReservation: (reservationId: number) => void
  };
  render() {
    return (
      <Container>
        <Content>
          {this.props.reservation ? (
            <Card>
              <CardItem header>
                <Text>
                  Reservation Id:{"\t"}
                  {this.props.reservation.id}
                </Text>
              </CardItem>
              <CardItem header>
                <Text>
                  Mobile:{"\t"}
                  {this.props.reservation.user.phone}
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  Name:{"\t"}
                  {this.props.reservation.user.name}
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  Paid amount:{"\t"}
                  {this.props.reservation.reservationDetails.paid}
                </Text>
              </CardItem>
              <CardItem footer>
                <Text>
                  Total price:{"\t"}
                  {this.props.reservation.reservationDetails.totalPrice}
                </Text>
              </CardItem>
              <Button
                full
                onPress={() => {
                  this.props.cancelReservation(this.props.reservation.id);
                  this.props.navigation.navigate("PlaygroundsScreen");
                }}
              >
                <Text>Cancel</Text>
              </Button>
            </Card>
          ) : (
            <Spinner />
          )}
        </Content>
        <Footer>
          <FooterTab>
            <Button
              active
              onPress={() => {
                this.props.navigation.navigate("PlaygroundsScreen");
              }}
            >
              <Text>Home</Text>
            </Button>
            <Button>
              <Text>Reservations</Text>
            </Button>

            {/* <Button >
                            <Text>Navigate</Text>
                        </Button>
                        <Button>
                            <Text>Contact</Text>
                        </Button> */}
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export const ViewReservationScreen = connect(
  ViewReservationContainer.mapStateToProps,
  ViewReservationContainer.mapDispatchToProps
)(ViewReservationContainer);
