import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Spinner } from 'native-base';

import {
  State,
  addPlayground,
  removePlayground,
  selectPlayground,
  loadPlaygrounds,
  loadDefaultPlayground
} from './state';
import { PlaygroundDto } from './proxy/dtos/classes';

class StartupClass extends Component {
  static mapStateToProps(state: State) {
    return {
      playgrounds: state.data.playgrounds,
      defaultPlayground: state.selectedPlayground.current
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        loadPlaygrounds,
        loadDefaultPlayground
      },
      dispatch
    );
  }
  //---------------------------
  props: {
    playgrounds: PlaygroundDto[],
    defaultPlayground: PlaygroundDto,
    loadPlaygrounds: () => void,
    loadDefaultPlayground: () => void
  };

  componentDidMount() {
    // this.props.loadPlaygrounds();
    // this.props.loadDefaultPlayground();
  }

  render() {
    return this.props.children;
    // this.props.playgrounds && this.props.defaultPlayground ? (
    //   this.props.children
    // ) : (
    //   <Spinner style={{ marginTop: 250 }} />
    // );
  }
}

export const Startup = connect(
  StartupClass.mapStateToProps,
  StartupClass.mapDispatchToProps
)(StartupClass);
