import React, { useEffect, useState } from "react"
import './App.css';
import axios from "axios";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import { useAuthState } from './AuthProvider'

const defaultValues = {
  eventName: "",
  city: "",
  longitude: "",
  latitude: ""
}

const defaultEventVendor = {
  eventName: "",
  vendorName: ""
}

const Event = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const [eventVendors, setEventVendors] = useState([])
  const [inputEV, setInputEV] = useState(defaultEventVendor)


  const [inputs, setInputs] = useState(defaultValues)
  const [address, setAdress] = useState('')

  const { user } = useAuthState()


  const Item = ({ event, ...props }) =>
    (
      <div className="item" {...props}>
        <div onClick={(myEvent) => {
          myEvent.stopPropagation()
          const shouldDelete = window.confirm('delete event')
          if (shouldDelete) {
            handleDelete(event._id, myEvent)
          }
        }} style={{ cursor: 'pointer', fontSize: "20px", float: "left" }}>
          x
        </div>

        <p>{event.eventName}</p>
        <p>{event.city}</p>
      </div>
    )

  const Item2 = ({ vendorName , _id }) =>
    (
      <div className="item" style={{backgroundColor:"black"}}>
          <div onClick={(myEvent) => {
          myEvent.stopPropagation()
          const shouldDelete = window.confirm('delete event')
          if (shouldDelete) {
            handleEVendorDelete(_id)
          }
        }} style={{ cursor: 'pointer', fontSize: "20px", float: "left" }}>
          x
        </div>
        <p>{vendorName}</p>
      </div>
    )


  const getEvents = async () => {
    const res = await axios.get("/api/events")
    setEvents(res.data)
  }

  const getEventVendors = async () => {
    const res = await axios.get("/api/eventsVendor")
    setEventVendors(res.data)
  }

  const handleChange = address => {
    setAdress(address)
  }
  const handleSelect = address => {
    setAdress(address)
    console.log(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then((latLng) => setInputs({ ...inputs, city: address, latitude: latLng.lng, longitude: latLng.lat }))
      .catch(error => console.error('Error', error));
  }

  const handleDelete = async (eventId, event) => {
    const res = await axios.delete(`/api/events/${eventId}`)
    setEvents(res.data)
  }

  const handleEVendorDelete = async (eventId) => {
    const res = await axios.delete(`/api/eventsVendor/${eventId}`)
    setEventVendors(res.data)
  }

  const addEventVendor = async (event) => { //handle submit
    event.stopPropagation()
    event.preventDefault()
    const res = await axios.post("/api/eventsVendor", inputEV)
    setEventVendors(res.data)
    setInputEV(defaultEventVendor)
  }

  const handleSubmit = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    if (selectedEvent) {
      const res = await axios.put(`/api/events/${selectedEvent}`, inputs)
      setEvents(res.data)
    }
    else {
      const res = await axios.post("/api/events", inputs)
      setEvents(res.data)
    }
    setInputs(defaultValues)
    setSelectedEvent(null)
  }

  useEffect(() => { getEvents() }, [])
  useEffect(() => { getEventVendors() }, [])


  return (
    <div>
      <img style={{ width: "100%" }} src="https://i.postimg.cc/K8z4Jhnj/IMG-0737.jpg" alt="Untitled-Artwork" border="0" />


      <div className="container">
        {
          events.map((p) => {
            if (p.eventName === (user ? user.username : " ")) {
              return (<Item
                event={p}
                onClick={() => {
                  setSelectedEvent(p._id)
                  setAdress(p.city)
                  setInputs(p)
                }} />)
            }
          })
        }
      </div>

      <div style={{ paddingLeft: "30%" }}>
        <form //Create/Edit Event
          onSubmit={handleSubmit}
          className="w3-theme-d3 w3-container"
          style={{ width: "60%", padding: "25px", borderRadius: "25px" }}>

          <h2 style={{ textAlign: "center" }}>{selectedEvent ? "Edit Event" : "New Event"}</h2>


          <input
            type="text"
            placeholder="EventName"
            value={inputs.eventName}
            onChange={e => setInputs({ ...inputs, eventName: e.target.value })}
            className="w3-input"
            style={{ borderRadius: "25px" }}
          />

          <br />

          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input id="inputval" style={{ width: "100%", borderRadius: "25px" }}
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: "w3-input",
                  })}
                />
                <div className="autocomplete-dropdown-container" style={{ width: "100%" }}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: 'rgba(0, 0, 0, 0.5)', cursor: 'pointer' }
                      : { backgroundColor: '#008496', cursor: 'pointer' };

                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          <br />

          <input
            type="submit"
            value="Submit"
            className="w3-theme-d1 w3-btn"
            style={{ borderRadius: "25px", width: "100%" }}
          />
        </form>
      </div>

      <h2 style={{ textAlign: "center" }}>{selectedEvent ? "Edit Vendors" : "New Vendor"}</h2>

      <div className="item" style={{width:"42%",marginLeft:"30%"}}>
        <input
          type="text"
          placeholder="Add Vendor"
          className="w3-input"
          value={inputEV.vendorName}
          style={{ borderRadius: "25px" }}
          onChange={e =>{
            setInputEV({ ...inputEV, vendorName: e.target.value,eventName: (user ? user.username : " ") })
          }}
        />

        <br />

        <div style={{ backgroundColor: "blue", borderRadius: "100px" }}
          onClick={(myEvent) => {
            addEventVendor(myEvent)
          }}>+</div>

        <div className="container">
          {
            eventVendors.map((p) => { 
              if(p.eventName===(user ? user.username : "")){
            return(
              <Item2
              key={p._id}
              vendorName={p.vendorName}
              _id={p._id}
              />
            )}
          })
          }
        </div>
      </div>

    </div>
  )
}


export default Event;
