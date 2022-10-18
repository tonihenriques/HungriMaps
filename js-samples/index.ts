/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


import { MarkerClusterer } from "@googlemaps/markerclusterer";

//const markerCluster = new MarkerClusterer({ map, markers });

let map: google.maps.Map;
let service: google.maps.places.PlacesService;
let infowindow: google.maps.InfoWindow;


let marker;
var locations = {};
const  markers: any = [];

function initMap(): void {
  const sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: sydney,
    zoom: 15,
  });

//Locação Atual

const locationButton = document.createElement("button");
locationButton.textContent = "LOCALIZAÇÃO ATUAL";
  locationButton.classList.add("custom-map-control-button");
 map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infowindow.setPosition(pos);
          infowindow.setContent("Você está aqui!");
          infowindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infowindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infowindow, map.getCenter()!);
    }
  });

  
//locação fim

 
  

  service = new google.maps.places.PlacesService(map);

  var locations = [
    'Caeté, Rua Quitandinha 345',
    'Caeté, Rua Dama da Noite 245',
    'Caeté, Rua Gualter Duarte 103',
    'Caeté, Centro 52'
  ]

   var querys;
  var request;

  var lalong: any = [];

  for(var i = 0; i < locations.length; i++){
    querys = locations[i];
    request = { 
      query: querys,
      //query: "Museum of Contemporary Art Australia",
      fields: ["name", "formatted_address", "place_id", "geometry"],
    };    

    service.findPlaceFromQuery(
      
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          
          for (let i = 0; i < results.length; i++) { 
             const markerOptions = {
              map: map,
              position: results[0].geometry!.location!,
              icon: './img/custom_pin.png',
              title: "Família (Em necessidades)",
            }              
            const markers = createMarker(markerOptions);
           
          }
          
          var LatLng = results[0].geometry!.location!;         
          lalong.push(LatLng);

          const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          const markers = lalong.map((position, i) => {
            const label = labels[i % labels.length];
            var title = "Família (Em necessidades)";
            const marker = new google.maps.Marker({
              position,
              label,
              
            });
        
            marker.addListener("click", () => {
              infowindow.setContent(title);
              infowindow.open(map, marker);
            });
        
            return marker;
          });

          const clustererOptions = { imagePath: './img/m' }
          new MarkerClusterer({ markers, map, });  

          map.setCenter(results[0].geometry!.location!);

        }

      }
    );   
    
    
  } 


  function handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const markers = locationsList.map((position, i) => {
    const label = labels[i % labels.length];
    const marker = new google.maps.Marker({
      position,
      label,
    });

    marker.addListener("click", () => {
      infowindow.setContent(label);
      infowindow.open(map, marker);
    });

    return marker;
  });

  new MarkerClusterer({ markers, map });  

}//initMap-end

function createMarker(markerOptions) {
  //if (!place.geometry || !place.geometry.location) return;

  marker = new google.maps.Marker({ map, position: markerOptions.position, });

  const markers: any = [];
    
  markers.push(marker);

  const contentString =
  '<div id="content">' +
  '<div id="siteNotice">' +
  "</div>" +
  '<h1 id="firstHeading" class="firstHeading">Família</h1>' +
  '<div id="bodyContent">' +
  "<p><b>Familia</b>, em dificuldades <b>Necessidade</b>, Sexta Básica, " +
  "familia de 05 filhos com mae e sem auxilio paterno. </p>" 
  "(last visited June 22, 2009).</p>" +
  "</div>" +
  "</div>";

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
 
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });

  return markers;
}


const locationsList = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
];


declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
