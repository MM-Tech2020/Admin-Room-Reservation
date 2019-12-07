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

class PayReservationContainer extends Component {
  constructor() {
    super();
  }
  static mapStateToProps(state: State) {
    return {};
  }
  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({ loadDefaultPlayground }, dispatch);
  }
  //---------------------------------------------

  props: {
    loadDefaultPlayground: () => void
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Button
              full
              primary
              onPress={() => {
                // this.props.confirmReservation(this.state);
                // this.props.navigation.navigate('PlaygroundsScreen');
              }}
            >
              <Text>Pay</Text>
            </Button>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              active
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

export const PayReservationScreen = connect(
  PayReservationContainer.mapStateToProps,
  PayReservationContainer.mapDispatchToProps
)(PayReservationContainer);
