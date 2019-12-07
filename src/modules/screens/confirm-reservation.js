import React, { Component } from "react";

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  Button,
  Item,
  Input,
  Form,
  Label
} from "native-base";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { State, confirmReservation, loadDefaultPlayground } from "../../state";
import { PlaygroundDto } from "../../proxy/dtos/classes";

class ConfirmReservationContainer extends Component {
  constructor() {
    super();
    this.state = {
      userMobile: "",
      userFullName: "",
      paidAmount: 0,
      duration: 1
    };
  }

  static mapStateToProps(state: State) {
    return {
      selectedPlayground: state.selectedPlayground.current,
      selectedHour: state.selectedPlayground.selectedHour
    };
  }
  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        confirmReservation,
        loadDefaultPlayground
      },
      dispatch
    );
  }
  //--------------------------------------

  props: {
    selectedPlayground: PlaygroundDto,
    selectedHour: number,
    confirmReservation: reservationModel => void,
    loadDefaultPlayground: () => void
  };
  static navigationOptions = ({ navigation, state }) => {
    return {
      title: "Confirm Reservation"
    };
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLable>
              <Label>Mobile Number</Label>
              <Input
                onChangeText={txt => {
                  this.setState({
                    userMobile: txt
                  });
                }}
              />
            </Item>
            <Item floatingLable>
              <Label>Full Name</Label>
              <Input
                onChangeText={txt => {
                  this.setState({
                    userFullName: txt
                  });
                }}
              />
            </Item>
            <Item floatingLable>
              <Label>Paid Amount</Label>
              <Input
                keyboardType="numeric"
                onChangeText={txt => {
                  this.setState({
                    paidAmount: parseFloat(txt)
                  });
                }}
              />
            </Item>
            <Item floatingLable>
              <Label>Duration</Label>
              <Input
                // defaultValue={this.state.duration.toString()}
                keyboardType="numeric"
                onChangeText={txt => {
                  this.setState({
                    duration: parseFloat(txt)
                  });
                }}
              />
            </Item>
            <Item floatingLable>
              <Label>Total Price</Label>
              <Label>
                {this.state.duration *
                  (this.props.selectedHour >
                    this.props.selectedPlayground.switchingHour &&
                  this.props.selectedHour <
                    this.props.selectedPlayground.switchingHour + 12
                    ? this.props.selectedPlayground.morningPrice
                    : this.props.selectedPlayground.nightPrice)
                // (this.props.selectedHour + this.state.duration <
                // this.props.selectedPlayground.switchingHour
                //   ? (this.props.selectedHour +
                //       this.state.duration -
                //       this.props.selectedPlayground.switchingHour) *
                //     (this.props.selectedPlayground.nightPrice -
                //       this.props.selectedPlayground.morningPrice)
                //   : 0)
                }
              </Label>
            </Item>

            <Button
              full
              primary
              onPress={() => {
                this.props.confirmReservation(this.state);
                this.props.loadDefaultPlayground();
                this.props.navigation.navigate("DefaultPlayground");
              }}
            >
              <Text> Confim</Text>
            </Button>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              active
              onPress={() => {
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
              <Text>Play grounds</Text>
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

export const confirmReservationScreen = connect(
  ConfirmReservationContainer.mapStateToProps,
  ConfirmReservationContainer.mapDispatchToProps
)(ConfirmReservationContainer);
