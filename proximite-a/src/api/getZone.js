const request = require('./request');

const culture = [
    "tourism=museum",
    "amenity=cinema",
    "amenity=arts_centre",
    "amenity=theatre",
    "amenity=place_of_worship",
    "historic",
];

const fetard = [
    "amenity=nightclub",
    "amenity=bar",
    "amenity=biergarten",
    "amenity=fast_food",
    "amenity=pub",
];

const sportif = [
    "sport",
    "leisure=swimming_pool",
    "building=stadium",
    "building=sports_hall",
    "leisure=swimming_area",
    "leisure=sports_centre",
    "leisure=pitch",
    "shop=sports",
];

const famille = [
    "amenity=school",
    "amenity=kindergarten",
    "amenity=childcare",
    "leisure=playground",
];



const gourmet = [
    "shop=pastry",
    "amenity=restaurant",
]

const POINT_TYPES = {
    culture,
    fetard,
    gourmet,
    sportif,
    famille,
};


const getPointsInZoneForProfile =async function(zone, profil) {
    return await getPointsInZone(zone,[...POINT_TYPES[profil]/*, ...POINT_TYPES['tous']*/])
}

/**
 *
 * @param {*} zone
 * @param {Array} types
 */
const getPointsInZone =  async function(zone, types) {
    const query = buildQuery(types, zone);
    let res = await request.request(query, null);
    let json = await res.json();
    return json;
}

 const buildQuery = (types, zone) => {
    let query = "https://overpass-api.de/api/interpreter?data=[out:json];";
    let bbox = getBoxFromZone(zone);
    query += "node(" + bbox + ")->.all;(";
 
    // ajout des filtres de type de lieu
    types.forEach(element => {
        if(element && element !== "") {
            let filtre = "node.all[" + element + "];";
            query += filtre;
        }
    });

    query += ");out;";

    return query
}

//https://overpass-api.de/api/interpreter?data=[out:json];area(47.264113,%20-1.573835,%2047.264492,%20-1.573586);node[tourism];out;
const getBoxFromZone = (zone) => {
    let west=180, east=-180, north=-90, south=90;
    zone = zone[0];
    zone.forEach(point => {
        let longCoor = point[0];
        west = longCoor < west ? longCoor : west;
        east = longCoor > east ? longCoor : east;
        let latCoor = point[1];
        south = latCoor < south ? latCoor : south;
        north = latCoor > north ? latCoor : north;
    });
    return [south, west, north, east];
}
module.exports= {getPointsInZone, POINT_TYPES, getPointsInZoneForProfile };

