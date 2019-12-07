import React from "react";
import { StyleSheet, View } from "react-native";
import { Root } from "native-base";
import { createAppContainer } from "react-navigation";
import { connect } from "react-redux";
import { Font } from "expo";
import { createStore, Store, applyMiddleware, bindActionCreators } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";

import { State, reducer } from "./src/state";
import { Navigator } from "./src/modules/routing";
import { Startup } from "./src/startup";

const AppContainer = createAppContainer(
  connect(
    state => state,
    dispatch => bindActionCreators({}, dispatch)
  )(Navigator)
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    // await Font.loadAsync({
    //   Roboto: require("native-base/Fonts/Roboto.ttf"),
    //   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    // });
    this.setState({ loading: false });
  }
  store: Store<State> = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(promiseMiddleware, thunkMiddleware))
  );

  render() {
    if (this.state.loading) {
      return <Root />;
    }
    return (
      <Provider store={this.store}>
        <Startup>
          <Root>
            <AppContainer />
          </Root>
        </Startup>
      </Provider>
    );
  }
}
