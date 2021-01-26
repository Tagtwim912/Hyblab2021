
let HttpProxyAgent = require( 'http-proxy-agent' );
const fetch = require('node-fetch');


const request = async function(adresse, op){
    let options = {
       // agent: new HttpProxyAgent( 'http://cache.ha.univ-nantes.fr:3128' ),
       ...op, 
    };
    console.log(adresse);
    return await fetch( adresse, options );
}

exports.request = request;