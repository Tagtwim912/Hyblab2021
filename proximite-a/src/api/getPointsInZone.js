
function getZone(position, transportation) {
    let polygon = null;
    // TODO
    return polygon;
}

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

const tourisme = [
    "tourism",
    "historic",
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

const tous = [
    "\"restaurant\"",
    "amenity=give_box",
    "amenity=marketplace",
    "amenity=toilets",
    "amenity=hospital",
];

export const POINT_TYPES = [
    culture,
    fetard,
    tourisme,
    sportif,
    famille,
    tous
];

/**
 *
 * @param {*} zone
 * @param {Array} types
 */
export const getPointsInZone = (zone, types) => {
    const query = buildQuery(types, zone);
}

export const buildQuery = (types, zone) => {
    let query = "http://overpass-api.de/api/interpreter?data=[out:json];";
    let area = "name=Nantes";
    query += "area[" + area + "];("
 
    // ajout des filtres par type de lieu
    types.forEach(categorie => {
        categorie.forEach(element => {
            if(element && element !== "") {
                let filtre = "node(area)[" + element + "];";
                query += filtre;
            }
        });
    });

    query += ");out;";

    return query
}