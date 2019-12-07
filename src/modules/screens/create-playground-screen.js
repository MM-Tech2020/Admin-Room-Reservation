import React, { Component } from "react";
import {
  View,
  Footer,
  FooterTab,
  Container,
  Header,
  Button,
  Icon,
  Text,
  Label,
  Content,
  Form,
  Input,
  Item,
  Picker,
  Switch
} from "native-base";
import { NavigationStackScreenOptions } from "react-navigation";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { MySideDrawer } from "../components/drawer";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { PlaygroundDto } from "../../proxy/dtos/classes";
import { locationContainer, LocationScreen } from "./location-screen";
import {
  State,
  reservePlayground,
  createPlayground,
  loadDefaultPlayground
} from "../../state";

import * as _ from "lodash";

class CreatePlaygroundContainer extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      image: "",
      latitude: "",
      longitude: "",
      address: "",
      gameType: "",
      number: 0,
      groundTypeId: 2,
      size: "",
      morningPrice: 300,
      nightPrice: 200,
      switchingHour: 6,
      name: "",
      wifi: false,
      room: false
    };
  }

  static mapStateToProps(state: State) {
    return {};
  }
  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      { createPlayground, loadDefaultPlayground },
      dispatch
    );
  }
  //----------------------------------------------
  props: {
    createPlayground: createPlaygroundModel => void,
    loadDefaultPlayground: () => void
  };

  static navigationOptions = ({ navigation, state }) => {
    return {
      title: "Create Room"
    };
  };

  setLocation = (longitude, latitude) => {
    this.setState({ longitude, latitude });
  };

  onValueChange(value: string) {
    this.setState({
      groundTypeId: value
    });
  }
  onGameChange(value: string) {
    this.setState({
      gameType: value
    });
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item abc>
              <Label>MeetingRoomName:</Label>
              <Input
                onChangeText={txt => {
                  this.setState({
                    name: txt
                  });
                }}
              />
            </Item>
            <Item abc>
              <Label>Number</Label>
              <Input
                keyboardType="numeric"
                onChangeText={txt => {
                  this.setState({
                    number: txt
                  });
                }}
              />
            </Item>
            <Item abc>
              <Label>Address</Label>
              <Input
                onChangeText={txt => {
                  this.setState({
                    address: txt
                  });
                }}
              />
            </Item>

            <Item abc>
              <Label>MeetingRoomType</Label>
              <Picker
                iosHeader="Select Your Meeting Type"
                mode="dropdown"
                placeholder="Select Your Meeting Type"
                selectedValue={this.state.gameType}
                onValueChange={this.onGameChange.bind(this)}
              >
                <Item label="BussinessMeeting" value="Business" />
                <Item label="TeamMeeting" value="Team" />
              </Picker>
            </Item>
            {/* <Item floatingLable>
              <Label>Location</Label>
              <Input
                onChangeText={txt => {
                  this.setState({
                    currentPlayground: {
                      location: txt
                    }
                  });
                }}
              />
            </Item> */}

            {/* <Item abc>
              <Label>Ground type</Label>
              <Picker
                iosHeader="Select GroundType"
                mode="dropdown"
                placeholder="Select groundType"
                selectedValue={this.state.groundTypeId}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Item label="Trtan" value="1" />
                <Item label="Negeela" value="2" />
              </Picker>
            </Item> */}
            <Item abc>
              <Label>Size</Label>
              <Input
                keyboardType="numeric"
                onChangeText={txt => {
                  this.set;
                  this.setState({
                    size: parseFloat(txt)
                  });
                }}
              />
            </Item>
            {/* <Item abc>
              <Label>Morning Price</Label>
              <Input
                keyboardType="numeric"
                onChangeText={txt => {
                  this.setState({
                    morningPrice: parseFloat(txt)
                  });
                }}
              />
            </Item>
            <Item abc>
              <Label>Night Price</Label>
              <Input
                keyboardType="numeric"
                onChangeText={txt => {
                  this.setState({
                    nightPrice: parseFloat(txt)
                  });
                }}
              />
            </Item>
            <Item abc>
              <Label>Switching Hour</Label>
              <Input
                keyboardType="numeric"
                onChangeText={txt => {
                  this.setState({
                    switchingHour: parseFloat(txt)
                  });
                }}
              />
            </Item>
            <Item abc>
              <Label>Switching Hour</Label>
              <Input
                keyboardType="numeric"
                onChangeText={txt => {
                  this.setState({
                    switchingHour: parseFloat(txt)
                  });
                }}
              />
            </Item> */}
            <Item style={{ padding: 20 }}>
              <Label>Projector</Label>
              <Switch
                value={this.state.wifi}
                onValueChange={value => this.setState({ wifi: value })}
              />
              <Label>Confernece Kit </Label>
              <Switch
                value={this.state.room}
                onValueChange={value => this.setState({ room: value })}
              />
            </Item>
            {/* <View>
              <LocationScreen setLocation={this.setLocation} />
            </View> */}

            <Button
              full
              primary
              onPress={() => {
                console.log("playground", this.state);
                this.props.createPlayground(this.state);
                this.props.navigation.navigate("PlaygroundsScreen");
              }}
            >
              <Text> Create</Text>
            </Button>
          </Form>
        </Content>
        <Footer>
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
        </Footer>
      </Container>
    );
  }
}

export const CreatePlaygroundScreen = connect(
  CreatePlaygroundContainer.mapStateToProps,
  CreatePlaygroundContainer.mapDispatchToProps
)(CreatePlaygroundContainer);
