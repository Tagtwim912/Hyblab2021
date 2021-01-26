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

/*
let result =  addresstocoordinates('41 Boulevard Albert Einstein 44300 Nantes')
    .then(data => {console.log(data)});
*/
exports.addresstocoordinates = addresstocoordinates;