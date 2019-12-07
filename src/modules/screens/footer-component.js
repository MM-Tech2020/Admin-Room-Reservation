import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon, Text, Thumbnail } from "native-base";

export class FooterComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            active={this.props.homeActive}
            onPress={() => {
              //   this.props.loadDefaultPlayground();
              this.props.navigation.navigate("DefaultPlayground");
            }}
          >
            <Icon name="home" />
            <Text
              style={{
                fontSize: 8,
                alignContent: "center",
                alignItems: "center"
              }}
            >
              Home
            </Text>
          </Button>

          <Thumbnail
            small
            circular
            style={{
              alignSelf: "center",
              width: 80,
              height: 80,
              marginTop: -45
            }}
            source={require("../../../assets/icon.png")}
          />

          <Button
            active={this.props.myReservationsActive}
            onPress={() => {
              this.props.navigation.navigate("PlaygroundsScreen");
            }}
          >
            <Icon name="paper" />
            <Text
              style={{
                fontSize: 8,
                alignContent: "center",
                alignItems: "center"
              }}
            >
              Rooms
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
