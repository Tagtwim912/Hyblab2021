'use strict'
const request = require('./request');


let addresstocoordinates = async function(adresse){
    let adresse2 = adresse.replace(/\s/g, '+');
    const url = `http://api-adresse.data.gouv.fr/search/?q=${adresse2}`;
    let response =await request.request(url);
    let data = await response.json();
    let coordinates = {latitude: data.features[0].geometry.coordinates[1], longitude: data.features[0].geometry.coordinates[0]}
    return coordinates;
}

let coordinatestoaddress = async function(coordinates){
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${coordinates.longitude}&lat=${coordinates.latitude}`;
    let response = await request.request(url);
    let data = await response.json();
    console.log(data.features[0].properties.name);
    let finalresult = {rue: data.features[0].properties.name, codepostal: data.features[0].properties.postcode, ville: data.features[0].properties.city }
    return finalresult;
}

/*
let result =  addresstocoordinates('Paris France')
    .then(data => {console.log(data)});
*/
module.exports = {addresstocoordinates, coordinatestoaddress};