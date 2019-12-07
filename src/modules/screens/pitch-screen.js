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
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { NavigationStackScreenOptions } from "react-navigation";
import { MySideDrawer } from "../components/drawer";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import {
  State,
  reservePlayground,
  loadPlaygrounds,
  loadDefaultPlayground
} from "../../state";
import { PlaygroundDto } from "../../proxy/dtos/classes";
import * as _ from "lodash";
import { FooterComponent } from "./footer-component";

class PitchScreenContainer extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: null
    };
  }
  static mapStateToProps(state: State) {
    return {
      playgrounds: state.data.playgrounds,
      playground: state.selectedPlayground.current
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        reservePlayground,
        loadPlaygrounds,
        loadDefaultPlayground
      },
      dispatch
    );
  }
  // -----------------------------------------------------
  props: {
    playground: PlaygroundDto,
    reservePlayground: (date: string) => void,
    loadPlaygrounds: () => void,
    loadDefaultPlayground: () => void
  };

  static navigationOptions = ({ navigation, state }) => {
    const { params = {} } = navigation.state;

    return {
      title: params.title
    };
  };

  componentDidMount() {
    if (!this.props.playground) {
      this.props.loadPlaygrounds();
      this.props.loadDefaultPlayground();
    }
  }

  render() {
    // const reservationDates = _.map(this.props.playground.reservations, r => {
    //   return { date: r.date, marked: true };
    // });
    // let markedDates = _.keyBy(_.uniq(reservationDates), r => r.date);
    // if (this.state.selectedDate) {
    //   if (markedDates[this.state.selectedDate])
    //     markedDates[this.state.selectedDate].selected = true;
    //   else markedDates[this.state.selectedDate] = { selected: true };
    // }

    var selectedDate = this.state.selectedDate
      ? {
          [this.state.selectedDate]: { selected: true }
        }
      : null;
    return this.props.playgrounds && this.props.playground ? (
      <Container>
        <Content>
          <Card>
            {console.log(this.props.playground)}
            <CardItem cardBody>
              <Thumbnail
                source={{
                  uri: this.props.playground
                    ? this.props.playground.imageUrl
                    : " "
                }}
                style={{ height: 100, width: null, flex: 1 }}
                square
              />
            </CardItem>
            <CardItem cardBody style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="projector"
                  type="MaterialCommunityIcons"
                  style={{ padding: 4 }}
                />
                <Icon name="hdd" type="AntDesign" style={{ padding: 4 }} />
                <Icon name="chair" type="FontAwesome5" style={{ padding: 4 }} />
                <Icon name="wifi" style={{ padding: 4 }} />
                <Text style={{ fontSize: 30 }}>|</Text>
              </View>
              <Calendar
                markedDates={selectedDate}
                // markedDates={markedDates}
                onDayPress={day => {
                  this.setState({ selectedDate: day.dateString });
                }}
              />
              <Button
                onPress={() => {
                  this.props.reservePlayground(this.state.selectedDate);
                  this.props.navigation.navigate("ReservationsList");
                }}
                full
              >
                <Text>Reserve</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
        {/* <Footer>
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
              <Text>Rooms</Text>
            </Button>
          </FooterTab>
        </Footer> */}

        <FooterComponent
          navigation={this.props.navigation}
          homeActive={true}
          myReservationsActive={false}
        />
      </Container>
    ) : (
      <Spinner style={{ marginTop: 250 }} />
    );
  }
}

export const PitchScreen = connect(
  PitchScreenContainer.mapStateToProps,
  PitchScreenContainer.mapDispatchToProps
)(PitchScreenContainer);
