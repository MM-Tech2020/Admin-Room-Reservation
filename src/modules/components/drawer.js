import React, { Component } from "react";

import { List, ListItem, Text } from "native-base";

export class MySideDrawer extends Component {
  render() {
    return (
      <List>
        <ListItem onPress={() => {}}>
          <Text>Create Pitch</Text>
        </ListItem>
      </List>
    );
  }
}
