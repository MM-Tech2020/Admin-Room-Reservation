import React, { Component } from "react";
import {
  Drawer,
  Container,
  Button,
  Icon,
  Body,
  Right,
  Left,
  Text,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail
} from "native-base";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import * as _ from "lodash";

import {
  State,
  Playground,
  addPlayground,
  removePlayground,
  selectPlayground
} from "../../state";

class HomeScreenContainer extends Component {
  static mapStateToProps(state: State) {
    return {
      playgrounds: state.data.playgrounds
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        addPlayground,
        removePlayground,
        selectPlayground
      },
      dispatch
    );
  }
  // -----------------------------------------------------
  props: {
    playgrounds: Playground[],
    addPlayground: (playground: Playground) => void,
    removePlayground: (id: number) => void,
    selectPlayground: (playground: Playground) => void
  };

  componentDidMount() {
    // this.navigation.setParams({
    //     openDrawer: this.openDrawer
    // }
    this.props.navigation.setParams({
      openDrawer: this.openDrawer.bind(this)
    });
  }
  static navigationOptions = ({ navigation, state }) => {
    return {
      title: "Home",
      headerRight: (
        <Button
          onPress={() => {
            navigation.state.params.openDrawer();
          }}
          transparent
        >
          <Icon name="menu" />
        </Button>
      )
    };
  };

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer() {
    this.drawer._root.open();
  }
  render() {
    return (
      <Container>
        <Drawer
          style={{ flex: 1 }}
          side="right"
          ref={ref => {
            this.drawer = ref;
          }}
          content={<Text>Side-Bar</Text>}
          onClose={() => this.closeDrawer()}
        >
          <Content>
            <List>
              {_.map(this.props.playgrounds, (playground, id) => {
                if (
                  playground.gameType == "Business" ||
                  playground.gameType == "Team"
                ) {
                  return (
                    <ListItem
                      style={{ flex: 1 }}
                      key={id}
                      onPress={() => {
                        this.props.selectPlayground(playground);
                        this.props.navigation.navigate("PitchScreen");
                      }}
                    >
                      <Card>
                        <CardItem>
                          <Left>
                            <Body>
                              <Text>{playground.gameType}</Text>
                              <Text note>Type: {playground.groundType}</Text>
                            </Body>
                          </Left>
                          <Body>
                            <Text note>{playground.address}</Text>
                            <Text note>Size: {playground.size}</Text>
                          </Body>
                        </CardItem>
                        <CardItem cardBody>
                          <Thumbnail
                            source={require("../../themes/imgs/playground.jpg")}
                            style={{ height: 50, width: null, flex: 1 }}
                            square
                          />
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Button transparent>
                              <Icon active name="thumbs-up" />
                              <Text>12 Likes</Text>
                            </Button>
                          </Left>
                          <Body>
                            <Button transparent>
                              <Icon active name="chatbubbles" />
                              <Text>4 Comments</Text>
                            </Button>
                          </Body>
                          <Right>
                            <Text>11h ago</Text>
                          </Right>
                        </CardItem>
                      </Card>
                    </ListItem>
                  );
                }
              })}
            </List>
          </Content>
        </Drawer>
      </Container>
    );
  }
}

export const HomeScreen = connect(
  HomeScreenContainer.mapStateToProps,
  HomeScreenContainer.mapDispatchToProps
)(HomeScreenContainer);
