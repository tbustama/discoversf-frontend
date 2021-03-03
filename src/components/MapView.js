import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 37.797, lng: -122.4194 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: 37.79, lng: -122.4194 }} />
      )}
    </GoogleMap>
  ))
);

export default MyMapComponent;
