import React from 'react';
import {MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet'
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
                popupAnchor:[_iconsize/2,39]
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
        console.log(`demande de tracage d'itineraire de ${this.state.currentPosition} vers ${dest}`)

    }


    render() {
        const {nomPers} = this.props;
        const redOptions = { color: '#999999' }
        return (
            <div id="map">
                <MapContainer center={[this.state.currentPosition[0],this.state.currentPosition[1]-decallageCentrageCarte]} zoom={16} scrollWheelZoom={true}>
                    <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                    <Marker icon={GetIcon(1,30)}  position={[this.state.currentPosition[0]+decallageMarqueur,this.state.currentPosition[1]]}></Marker>
                    {this.state.sites.map( (e) => {
                        return <Marker icon={GetIcon(2,20, equivalent.themePicto.get(e.type))}  position={[e.coordonnes[0]+decallageMarqueur,(e.coordonnes[1])]}>
                                <Popup> A pretty CSS3 popup. <br />
                                    Easily customizable.<hr/>
                                    {console.log(e)}
                                    <input type="button" class="btn btn-primary" value="S'y rendre" onClick={ ()=>{this.generateItineraire(e.coordonnes)} }/>
                                </Popup>
                        </Marker>
                    }) }
                    <Circle center={this.state.currentPosition} pathOptions={redOptions} radius={500} />
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
