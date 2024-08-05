// import React, { useEffect, useState } from 'react';
// import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
// import axios from 'axios';

// const MapPage = ({ tripId }) => {
//     const [tripData, setTripData] = useState(null);
//     const [directionsResponse, setDirectionsResponse] = useState(null);
//     const [error, setError] = useState(null);

//     const mapStyles = { height: "100vh", width: "100%" };

//     useEffect(() => {
//         // Fetch trip data from backend
//         const fetchTripData = async () => {
//             try {
//                 const response = await axios.get(`/api/trip/${tripId}`);
//                 setTripData(response.data);
//                 calculateRoute(response.data.itinerary);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };

//         fetchTripData();
//     }, [tripId]);

//     const calculateRoute = async (itinerary) => {
//         if (!window.google) {
//             console.error("Google Maps JavaScript API not loaded.");
//             return;
//         }

//         const directionsService = new window.google.maps.DirectionsService();
//         const waypoints = itinerary.map(place => ({
//             location: new window.google.maps.LatLng(place.lat, place.lng),
//             stopover: true
//         }));

//         try {
//             const result = await directionsService.route({
//                 origin: waypoints[0].location,
//                 destination: waypoints[waypoints.length - 1].location,
//                 waypoints: waypoints.slice(1, -1),
//                 travelMode: window.google.maps.TravelMode.DRIVING,
//             });

//             setDirectionsResponse(result);
//         } catch (error) {
//             console.error('Error calculating route:', error);
//         }
//     };

//     return (
//         <LoadScript
//             googleMapsApiKey="AIzaSyDgTeE01Ts-2d4lVBAPLH4aDUO8xaLZu28"
//         >
//             <GoogleMap
//                 mapContainerStyle={mapStyles}
//                 zoom={10}
//                 center={tripData ? { lat: tripData.itinerary[0].lat, lng: tripData.itinerary[0].lng } : { lat: 0, lng: 0 }}
//             >
//                 {tripData && tripData.itinerary.map((place, index) => (
//                     <Marker
//                         key={index}
//                         position={{ lat: place.lat, lng: place.lng }}
//                         label={`Day ${index + 1}`}
//                     />
//                 ))}
//                 {directionsResponse && (
//                     <DirectionsRenderer directions={directionsResponse} />
//                 )}
//             </GoogleMap>
//         </LoadScript>
//     );
// };

// export default MapPage;
