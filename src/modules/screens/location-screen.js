// import React from "react";
// import { LinearGradient, MapView, Marker } from "expo";
// import { connect } from "react-redux";

// import { Dispatch, bindActionCreators } from "redux";
// import {
//   Dimensions,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   Image,
//   ImageBackground
// } from "react-native";
// import {
//   Container,
//   Header,
//   Content,
//   Form,
//   Item,
//   Input,
//   View,
//   Thumbnail,
//   Text,
//   Spinner,
//   Label,
//   Button
// } from "native-base";
// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel
// } from "react-native-simple-radio-button";
// // import Images from "@assets/images";

// const screen = Dimensions.get("window");
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const current_radio_props = [{ label: "Current Location", value: 1 }];
// const address_radio_props = [{ label: "Enter Address", value: 2 }];
// const map_radio_props = [{ label: "Select from map", value: 3 }];

// export class locationContainer extends React.Component {
//   //   static mapDispatchToProps(dispatch: Dispatch) {
//   //     return bindActionCreators({}, dispatch);
//   //   }
//   //   static mapStatetToProps(state: State) {
//   //     return {
//   //     //   isCreated: state.cart.cart.isCreated
//   //     };
//   //   }
//   map = null;

//   state = {
//     region: {
//       latitude: -37.78825,
//       longitude: -122.4324,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA
//     },
//     ready: false,
//     marker: {
//       coordinate: {
//         latitude: -37.78825,
//         longitude: -122.4324,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA
//       }
//     },
//     addressType: 1,
//     address: ""
//   };

//   setRegion(region) {
//     if (this.state.ready) {
//       // this.refs.map.animateToRegion
//       setTimeout(() => {
//         this.refs.map.animateToRegion(region);
//         // this.map.animateToRegion(region);
//       }, 10);
//     }
//     this.setState({
//       region: region,
//       marker: region
//     });
//     this.props.setLocation(region.longitude, region.latitude);
//   }

//   componentDidMount() {
//     console.log("Component did mount");
//     this.getCurrentPosition();
//   }

//   getCurrentPosition() {
//     try {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const region = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//           };
//           console.log(region);
//           this.setRegion(region);
//         },
//         error => {
//           //TODO: better design
//           switch (error.code) {
//             case 1:
//               if (Platform.OS === "ios") {
//                 Alert.alert("Error Ios", "");
//               } else {
//                 Alert.alert("Error Android", "");
//               }
//               break;
//             default:
//               Alert.alert("Error", "");
//           }
//         }
//       );
//     } catch (e) {
//       alert(e.message || "");
//     }
//   }

//   onMapReady = e => {
//     if (!this.state.ready) {
//       this.setState({ ready: true });
//     }
//   };

//   onMapPress(e) {
//     this.setState({
//       marker: e.nativeEvent.coordinate
//     });
//   }
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.isCreated) {
//       nextProps.navigation.navigate("Home");
//     }
//   }
//   onRegionChange(region) {
//     this.setState({ region });
//   }
//   onEndMarkerEnd(e) {
//     console.log("marker after move", e);
//     this.setState({
//       marker: e.nativeEvent.coordinate,
//       addressType: 3
//     });

//     this.props.setLocation(
//       e.nativeEvent.coordinate.longitude,
//       e.nativeEvent.coordinate.latitude
//     );
//   }

//   onAddressChange(text) {
//     this.setState({ address: text, addressType: 2 });
//   }
//   render() {
//     const { region, filteredMarkers } = this.state;
//     const { children, renderMarker, setLocation } = this.props;

//     return (
//       <Container>
//         <Content contentContainerStyle={{ flex: 1 }}>
//           {/* <Text>{JSON.stringify(this.state)}</Text> */}
//           <View style={{ flex: 0.1 }}>
//             {this.state.addressType == 1 && (
//               <RadioForm
//                 isSelected={this.state.addressType == 1}
//                 radio_props={current_radio_props}
//                 onPress={value => {
//                   this.setState({ addressType: value });
//                 }}
//               />
//             )}

//             {(this.state.addressType == 2 || this.state.addressType == 3) && (
//               <RadioForm
//                 isSelected={this.state.value == 1}
//                 radio_props={current_radio_props}
//                 initial={-1}
//                 onPress={value => {
//                   this.setState({ addressType: value });
//                 }}
//               />
//             )}
//           </View>

//           <View style={{ flex: 0.1 }}>
//             {this.state.addressType == 3 && (
//               <RadioForm
//                 isSelected={this.state.addressType == 3}
//                 radio_props={map_radio_props}
//                 onPress={value => {
//                   this.setState({ addressType: value });
//                 }}
//               />
//             )}

//             {(this.state.addressType == 1 || this.state.addressType == 2) && (
//               <RadioForm
//                 isSelected={this.state.addressType == 3}
//                 radio_props={map_radio_props}
//                 initial={-1}
//                 onPress={value => {
//                   this.setState({ addressType: value });
//                 }}
//               />
//             )}
//           </View>
//           <View style={{ flex: 0.7 }}>
//             <MapView
//               key="AIzaSyCOXFwm9g-rxGXVag17ds4Kn2vBteixz38"
//               ref={map => {
//                 this.map = map;
//               }}
//               showsUserLocation={true}
//               followsUserLocation={false}
//               ref="map"
//               initialRegion={region}
//               renderMarker={renderMarker}
//               onMapReady={this.onMapReady}
//               style={StyleSheet.absoluteFillObject}
//               textStyle={{ color: "#bc8b00" }}
//               containerStyle={{
//                 backgroundColor: "white",
//                 borderColor: "#BC8B00"
//               }}
//             >
//               <MapView.Marker
//                 draggable
//                 onDragEnd={e => {
//                   this.onEndMarkerEnd(e);
//                 }}
//                 coordinate={{
//                   latitude: region.latitude,
//                   longitude: region.longitude
//                 }}
//                 key={"1"}
//               />
//               {(children && children) || null}
//             </MapView>
//           </View>
//         </Content>
//       </Container>
//     );
//   }
// }

// export const LocationScreen = connect(
//   null,
//   null
// )(locationContainer);

// var styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: null,
//     height: null
//   },
//   registerTextContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center"
//   }
// });
