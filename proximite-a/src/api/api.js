'use strict';

const express = require('express');
const { lazy } = require('react');
const { response } = require('../../server');

const addresstocoordinates = require('./adresstocoordinates');
const get15minzone = require('./get15mnZone');
const getzone = require('./getZone');

module.exports = function () {

    const app = new express();

    app.get('/adresse/*', function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        addresstocoordinates.addresstocoordinates(path[2])
            .then(data => {res.json(data)});

    })

    app.get('/coordinates/*', async function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        let coordinates = path[2].split('_');
        coordinates = {latitude: coordinates[0], longitude: coordinates[1]};
        let data = await addresstocoordinates.coordinatestoaddress(coordinates);
        res.json(data);
    })

    app.get('/get15minzone/*/*/', function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        let coordinates = path[2].split('_');
        coordinates= coordinates.map(x => parseFloat(x));
        get15minzone.get15mnZone(coordinates, path[3])
            .then(data => {res.json(data)});
    })

    app.get('/getlocationsforprofile/*/*/*', async function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        let coordinates = await addresstocoordinates.addresstocoordinates(path[2]);
        coordinates = [coordinates.longitude, coordinates.latitude];
        let polygon = await get15minzone.get15mnZone(coordinates, path[3]);
        let points = await getzone.getPointsInZoneForProfile(polygon, path[4]);
        const elements = points.elements;
        console.log(points.elements);
        let finalresult = {};
        if (elements.length <6) {
            finalresult.lieux = elements;
        }
        else {
            let result = [];
            for (let i = 0; i < 6; i++) {
                let indice = Math.floor(Math.random() * (elements.length));
                result.push(elements[indice]);
                elements.splice(indice,1);
            }
            finalresult.lieux = result;
        }
        let theme_surprise='';

        switch (path[4]) {
            case 'culture':
                theme_surprise='sportif'
                break;
        
            default:
                theme_surprise = 'culture';
                break;
        }


        let  surprise  = await getzone.getPointsInZoneForProfile(polygon, theme_surprise);
        let elements_surprise = surprise.elements;
        finalresult.surprise = elements_surprise[Math.floor(Math.random() * (elements_surprise.length))];
        res.json(finalresult);
        
    })

    app.get('/getlocations/*/*/*', async function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        const path = decodeURI(req.url).split('/');
        let coordinates = await addresstocoordinates.addresstocoordinates(path[2]);
        coordinates = [coordinates.longitude, coordinates.latitude];
        let polygon = await get15minzone.get15mnZone(coordinates, path[3]);
        let typeslieux = path[4].split('-');
        let points = await getzone.getPointsInZone(polygon, typeslieux);
        const elements = points.elements;
        console.log(points.elements);
        let finalresult = {};
        if (elements.length <6) {
            finalresult.lieux = elements;
        }
        else {
            let result = [];
            for (let i = 0; i < 6; i++) {
                let indice = Math.floor(Math.random() * (elements.length));
                result.push(elements[indice]);
                elements.splice(indice,1);
            }
            finalresult.lieux = result;
        }
        let  surprise  = await getzone.getPointsInZoneForProfile(polygon, 'culture');
        let elements_surprise = surprise.elements;
        finalresult.surprise = elements_surprise[Math.floor(Math.random() * (elements_surprise.length))];
        res.json(finalresult);
    })


    return app;

};
