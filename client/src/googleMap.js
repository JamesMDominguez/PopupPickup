import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class googleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.7749,
      lng: -122.4194
    },
    zoom: 11
  };

  render() {
    const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
      <div className="autocomplete-root">
        <input {...getInputProps()} />
        <div className="autocomplete-dropdown-container">
          {<div>Loading...</div>}
          {suggestions.map(suggestion => (
            <div {...getSuggestionItemProps(suggestion)}>
              <span>{suggestion.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
     
    
    const Marker = props => {
      return <div style={{ height: '50px', width: "50px",backgroundColor:"red"}}></div>
    }
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '500px', width: '90%',paddingLeft:"10%",marginBottom:"50px",marginTop:"30px"}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyDGYlDVAd8hRSEoIhWZEkaWJDzxKZfHuq4" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={37.6879}
            lng={-122.4702}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default googleMap;