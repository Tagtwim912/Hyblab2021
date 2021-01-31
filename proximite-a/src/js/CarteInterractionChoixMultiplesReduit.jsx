import React from 'react';
import '../css/AcceuilCarte.css'
import Etiquette from './Etiquette'
import iconAdresse from '../img/position-icon.svg'
import logo from '../img/LOGO OK_logo principal.png'
import personnage from '../img/Perso-hyblab-03.png'
import pied from '../img/picto moyen de transport-pied.png'
import velo from '../img/picto moyen de transport-vélo.png'
import fauteil from '../img/picto moyen de transport-fauteuil.png'
import trottinette from '../img/picto moyen de transport-trotinette.png'
import skate from '../img/picto moyen de transport-skate.png'
import roller from '../img/picto moyen de transport-roller.png'
import equiv from './equivalent.js'
import fond from '../img/HOVER-moyen de transport-tache-02.png'

class CarteInterractionChoixMultiplesReduit extends  React.Component {
    state={
        themeId:this.props.data.themeId,
        moyenId:this.props.data.moyenId,
        sites:this.props.data.sites,
        adresse:this.props.data.adresse,
        selected:[]
    };



    handleCheck =(e)=>{
        let newSelected = this.state.selected
        if(e.target.checked === true && !this.state.selected.includes(e.target.value)){
            newSelected.push(e.target.value)
        }
        else if (e.target.checked === false && this.state.selected.includes(e.target.value)){
            newSelected.pop(e.target.value)
        }
        this.setState({selected:newSelected})
    }

    render() {
        const { onPreviousPhase, nomPers} = this.props;
        const hoverStyle = {
            backgroundImage: `url(${fond})`
        };
        return (
            <div id="mainContainerInterraction">
                <div id="containerInterraction2" class="containersInterraction">
                    <div class="phase2Top">
                        <div class="phase2TopLeft">
                            <img src={logo} id="containerInterractionLogoP2"/>
                            <div id="textContainerTopLeft">
                                <span id="helloText"><b>Hello</b> {nomPers}</span>
                                <div class="d-flex align-items-center">
                                    <img src={iconAdresse} width={17} height={50} class="m-1"/>
                                    <div class="horizontalAlign">
                                        <span>{this.state.adresse.rue}</span>
                                        <span>{this.state.adresse.codepostal} {this.state.adresse.ville}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="phase2TopRight">
                            <img src={personnage} width={190}/>
                        </div>
                    </div>
                    <hr/>

                    <div class="sectionReduire">
                        <input class="btn btnPurple" onClick={onPreviousPhase} value="Agrandir"/>
                    </div>
                </div>
            </div>
        );
    }
}
export default CarteInterractionChoixMultiplesReduit;
