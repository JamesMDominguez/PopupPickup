import React from 'react';
import GoogleMapReact from 'google-map-react';

  const googleMap = () =>{
  const defaultProps = {
    center: {
      lat: 37.7749,
      lng: -122.4194
    },
    zoom: 11
  }

  
     
    const Marker = (defaultProps) => {
      return <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" style={{ height: '50px', width: "50px"}} alt="marker"/>
    }
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '500px', width: '90%',paddingLeft:"10%",marginBottom:"50px",marginTop:"30px"}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyDGYlDVAd8hRSEoIhWZEkaWJDzxKZfHuq4" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Marker
            lat={37.6879}
            lng={-122.4702}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    )
  }


export default googleMap;