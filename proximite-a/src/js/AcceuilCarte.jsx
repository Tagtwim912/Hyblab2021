import React from 'react';
import {MapContainer, TileLayer, Marker, Popup, Polygon, Polyline} from 'react-leaflet'
import '../css/AcceuilCarte.css'
import CarteInterractionChoixLieu from './CarteInterractionChoixLieu'
import PopupAnnonce from './PopupAnnonce'
import CarteInterractionChoixMultiples from './CarteInterractionChoixMultiples'
import CarteInterractionChoixMultiplesReduit from './CarteInterractionChoixMultiplesReduit'
import L from "leaflet"
import {getPosition} from "leaflet/src/dom/DomUtil";
import equivalent from './equivalent.js'
const decallageCentrageCarte = 0.004;
const decallageMarqueur = 0.0005;
const redOptions = { color: '#00d66f' }

function GetIcon(type, _iconsize, theme){
    switch (type) {
        case 1: //position actuelle
            return L.icon({
                iconUrl : require("../img/pictogrammes_maison.png").default,
                iconSize: [_iconsize, 39],
                iconAnchor:[_iconsize/2,39],
                popupAnchor:[0,-39]
            });
            break
        case 2: //site
            return L.icon({
                iconUrl : theme.default,
                iconSize: [_iconsize, 39],
                iconAnchor:[_iconsize/2,39],
                popupAnchor:[0,-39]
            });
            break
    }
}




class AcceuilCarte extends  React.Component {
    state={
        popupPhase : 2,
        currentPosition: this.props.data.coords,
        sites:this.props.data.sites,
        adresse:this.props.data.adresse,
        moyenId:this.props.data.moyenId,
        nomPers:this.props.data.nomPers,
        perimetre: this.props.data.perimetre,
        itineraire: [],
    };




    getPhase(nom){
        switch (this.state.popupPhase) {
            case 0:
                return null;
            case 1:
                return <CarteInterractionChoixLieu data={this.state} nomPers={nom.nomPers} onNextPhase={this.nextPhase}/>;
            case 2:
                return <CarteInterractionChoixMultiples data={this.state} nomPers={nom.nomPers} onSetMoyen={this.updateMoyen} onNextPhase={this.nextPhase}/>;
            case 3:
                return <CarteInterractionChoixMultiplesReduit data={this.state} nomPers={nom.nomPers} onSetMoyen={this.updateMoyen} onPreviousPhase={this.previousPhase}/>;
        }
    };

    nextPhase = () =>{
        const newPopupPhase = this.state.popupPhase+1;
        this.setState({popupPhase:newPopupPhase })
    };
    previousPhase = () =>{
        const newPopupPhase = this.state.popupPhase-1;
        this.setState({popupPhase:newPopupPhase })
    };

    updateMoyen = (e) => {
        this.setState({ moyenId: e })
        this.props.onSetMoyen(e)
    };

    generateItineraire = (dest) => {
        let moyenTransport = ['foot-walking', 'foot-walking', 'cycling-regular', 'wheelchair', 'cycling-road', 'cycling-regular', 'cycling-regular'][this.state.moyenId];
        fetch(`http://localhost:8080/proximite-a/api/getItinerary/${moyenTransport}/${[this.props.data.coords[1],this.props.data.coords[0]]}/${[dest[1],dest[0]]}`)
        .then(itineraire=> itineraire.json())
        .then(itineraire => {
            console.log(itineraire)
            let newA=[];
            itineraire.forEach((l) => {
                newA.push([l[1],l[0]])
            });
            this.setState({itineraire:newA});
        })
    };

    getPolyne = () => {
        if(typeof this.state.itineraire !== 'undefined' && this.state.itineraire.length > 0){
            return <Polyline positions={[this.state.itineraire]} pathOptions={redOptions}/>
        }
    }

    getPolygone = () => {
        if(typeof this.state.perimetre !== 'undefined' && this.state.perimetre.length > 0){
            return <Polygon positions={this.state.perimetre} pathOptions={redOptions} />
        }
    }

    render() {
        console.log("render Acceil")
        console.log(this.state)
        const {nomPers} = this.props;
        return (
            <div id="map">
                <MapContainer center={[this.state.currentPosition[0],this.state.currentPosition[1]-decallageCentrageCarte]} zoom={16} scrollWheelZoom={true}>
                    <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                    <Marker icon={GetIcon(1,30)}  position={[this.state.currentPosition[0]+decallageMarqueur,this.state.currentPosition[1]]}></Marker>
                    {this.state.sites.map( (e) => {
                        return <Marker icon={GetIcon(2,30, equivalent.themePicto.get(e.type))}  position={[e.coordonnes[0]+decallageMarqueur,(e.coordonnes[1])]}>
                            <Popup>
                                <b>{e.titre}</b>
                                <hr/>
                                <input type="button" class="btn btn-primary" value="S'y rendre" onClick={ ()=>{this.generateItineraire(e.coordonnes)} }/>
                            </Popup>
                        </Marker>
                    }) }
                    <Polygon positions={this.state.perimetre} pathOptions={redOptions} />
                    {this.getPolygone()}
                    {this.getPolyne()}
                </MapContainer>

                <PopupAnnonce/>
                {this.getPhase({nomPers})}
                <div id="containerButtonsMapNavigation">
                    <a href="https://www.google.com/" class="buttonMapNavigation">Ouvrir l’itinéraire avec GoogleMaps</a>
                    <input type="button" class="buttonMapNavigation" value="Télécharger la carte en PDF"/>
                    <input type="button" class="buttonMapNavigation" value="Crédits"/>
                </div>
            </div>
        );
    }



}
export default AcceuilCarte;