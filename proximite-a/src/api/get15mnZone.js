'use strict';

const request = require('./request');

/**
 * Renvoie un polygone définissant ce qui peut être atteint
 * en 15 minutes selon un mode de transport donné.

 * position: [longitude, latitude]
 * (ex.: [-1.55, 47.21] pour 1.55 ouest, 47.21 nord)

 * modeTransport: peut être "foot-walking", "wheelchair",
 * "cycling-regular", "cycling-electric" ou "cycling-road"
 * en ce qui nous concerne.
 */
let get15mnZone = async function(position, modeTransport = 'foot-walking') {
    try {
        const data = await request.request(`https://api.openrouteservice.org/v2/isochrones/${modeTransport}`, {
            method: 'POST',
            body: `{"locations":[[${position}]],"range":[900]}`,
            headers: {
                'Authorization': '5b3ce3597851110001cf624829bf42551469445aa00ca476f174c648',
                'Content-Type': 'application/json'
            }});

        const response = await data.json();
        let polygon = response.features[0].geometry.coordinates;
        return polygon;
    } catch (e) {
        console.error(e);
    }
}

//get15mnZone([1, 47], 'foot-walking');
module.exports = {get15mnZone};

