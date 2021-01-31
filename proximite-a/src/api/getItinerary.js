'use strict';

const request = require('./request');

// using example : getItinerary('foot-walking', [8.681495,49.41461],[8.687872,49.420318])
const getItinerary = async function(modeTransport, startPoint, endPoint) {
    try {

        const data = await request.request(`https://api.openrouteservice.org/v2/directions/${modeTransport}/geojson`, {
            method: 'POST',
            body: `{"coordinates":[[${startPoint}],[${endPoint}]]}`,
            headers: {
                'Authorization': '5b3ce3597851110001cf624829bf42551469445aa00ca476f174c648',
                'Content-Type': 'application/json'
            }
        });
            
        const response = await data.json();
        let itinerary = response.features[0].geometry.coordinates;
        return itinerary;
    } catch (e) {
        console.error('getItinerary', e);
    }
}

module.exports = {getItinerary};
