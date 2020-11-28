import React, { useEffect, useState } from "react"
import './App.css';
import axios from "axios";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';

const defaultValues = {
  eventName: "",
  city: "",
  longitude: "",
  latitude: "",
  vendor:[]
}

const Event = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const [inputs, setInputs] = useState(defaultValues)
  const [address, setAdress] = useState('')
  const [thisVendor, setThisvendor] = useState([])
   


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
        <h4>Vendors:</h4>
        <div>{event.vendor.map(p=>
            <p style={{display:"inline"}}>{p} </p>
          )}</div>
      </div>
    )



  const getEvents = async () => {
    const res = await axios.get("/api/events")
    setEvents(res.data)
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

  return (
    <div>
      <img style={{ width: "100%" }} src="https://i.postimg.cc/K8z4Jhnj/IMG-0737.jpg" alt="Untitled-Artwork" border="0" />


      <div className="container">
        {
          events.map(p => (
            <Item
              event={p}
              onClick={() => {
                setSelectedEvent(p._id)
                setInputs(p)
              }}
            />
          ))
        }
      </div>
      <div style={{ paddingLeft: "30%" }}>
        <form //login
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

                <h2 style={{ textAlign: "center" }}>{selectedEvent?"Add Vendors":"Edit Vendors"}</h2>

          <input
            type="text"
            placeholder="Vendor Name"
            value={thisVendor}
            onChange={e => setThisvendor(e.target.value)}
            className="w3-input"
            style={{ borderRadius: "25px",marginBottom:"10px" }}
          />


          <div onClick={(p)=>{ 
          inputs.vendor.push(thisVendor)
          setThisvendor('')
        }} style={{ backgroundColor: "#9A2A32",height:"20px",marginBottom:"10px" , textAlign: "center", borderRadius: "25px" }}>+</div>

        <div>
          {      
        inputs.vendor.map( (p)=> 
        <div style={{backgroundColor:"black",paddingLeft:"2%",borderRadius: "25px"}}>
        <div 
        style={{cursor: 'pointer', float: "left", paddingTop:"5px"}} 
        onClick={(myEvent)=>{
          myEvent.stopPropagation()
          const shouldDelete = window.confirm('delete event')
          if (shouldDelete) {
            p.vendor.pop()
          }
        }}
        >x</div>
        <h3 style={{paddingLeft:"5%"}}>{p}</h3>
        </div>
        )
          }
       </div>

          <input
            type="submit"
            value="Submit"
            className="w3-theme-d1 w3-btn"
            style={{ borderRadius: "25px", width: "100%" }}
          />

        </form>
      </div>

    </div>
  )
}


export default Event;
