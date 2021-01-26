#!/bin/sh

  curl -X POST \
  'https://api.openrouteservice.org/v2/isochrones/foot-walking' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'Accept: application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8' \
  -H 'Authorization: 5b3ce3597851110001cf624829bf42551469445aa00ca476f174c648' \
  -d '{"locations":[[-1.55,47.21]],"range":[900,1]}' > test_ors.json
