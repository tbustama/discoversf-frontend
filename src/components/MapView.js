import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { connect } from "react-redux";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      zoom={props.selectRestaurant ? 18 : 12}
      center={
        props.selectRestaurant
          ? {
              lat: parseFloat(props.selectRestaurant.location.split(" ")[0]),
              lng: parseFloat(props.selectRestaurant.location.split(" ")[1]),
            }
          : { lat: 37.781923992215, lng: -122.42456411044803 }
      }
    >
      {props.selectRestaurant && (
        <Marker
          position={{
            lat: parseFloat(props.selectRestaurant.location.split(" ")[0]),
            lng: parseFloat(props.selectRestaurant.location.split(" ")[1]),
          }}
        />
        // <InfoWindow
        //   position={{
        //     lat: parseFloat(props.selectRestaurant.location.split(" ")[0]),
        //     lng: parseFloat(props.selectRestaurant.location.split(" ")[1]),
        //   }}
        // >
        //   <h5 id="user-title">{props.selectRestaurant.name}</h5>
        // </InfoWindow>
      )}
    </GoogleMap>
  ))
);
const mapStateToProps = (state) => {
  return {
    selectRestaurant: state.RestaurantReducer.mapRestaurant,
  };
};

export default connect(mapStateToProps)(MyMapComponent);
