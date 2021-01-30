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

class CarteInterractionChoixMultiples extends  React.Component {
    state={
        themeId:this.props.data.themeId,
        moyenId:this.props.data.moyenId,
        sites:this.props.data.sites
    };


    handleChange = (e) => {
        this.setState({
            moyenId: parseInt(e.target.value,10)
        });
    };
    render() {
        equiv.forEach((l,r) => console.log(l,r));
        const {onNextPhase, nomPers} = this.props;
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
                                        <span>4 Rue Sainte Catherine</span>
                                        <span>44000 Nantes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="phase2TopRight">
                            <img src={personnage} width={190}/>
                        </div>
                    </div>
                    <hr/>
                    <div class="phase2Middle">
                        <div class="titlePhase2Section">Moyen de déplacement</div>
                        <div class="container" >
                            <div className="row" on onChange={this.handleChange}>


                                <div class="col">
                                    <input type="radio" name="moyen" id="pied" value='1' className="input-hidden" defaultChecked={this.state.moyenId === this.value}/>
                                    <label htmlFor="pied">
                                        <img class="imgPictogram" src={pied} alt="pied"/>
                                    </label>
                                </div>

                                <div class="col">
                                    <input type="radio" name="moyen" id="velo" value='2' className="input-hidden" defaultChecked={this.state.moyenId === this.value}/>
                                    <label htmlFor="velo">
                                        <img class="imgPictogram" src={velo} alt="velo"/>
                                    </label>
                                </div>


                                <div className="col">
                                    <input type="radio" name="moyen" id="fauteil" value='3' className="input-hidden" defaultChecked={this.state.moyenId === this.value}/>
                                    <label htmlFor="fauteil">
                                        <img className="imgPictogram" src={fauteil} alt="fauteil"/>
                                    </label>
                                </div>

                                <div className="col">
                                    <input type="radio" name="moyen" id="trottinette" value='4' className="input-hidden" defaultChecked={this.state.moyenId === this.value}/>
                                    <label htmlFor="trottinette">
                                        <img className="imgPictogram" src={trottinette} alt="trottinette"/>
                                    </label>
                                </div>

                                <div className="col">
                                    <input type="radio" name="moyen" id="skate" value='5' className="input-hidden" defaultChecked={this.state.moyenId === this.value}/>
                                    <label htmlFor="skate">
                                        <img className="imgPictogram" src={skate} alt="skate"/>
                                    </label>
                                </div>

                                <div className="col">
                                    <input type="radio" name="moyen" id="roller" value='6' className="input-hidden" defaultChecked={this.state.moyenId === this.value}/>
                                    <label htmlFor="roller">
                                        <img className="imgPictogram" src={roller} alt="roller"/>
                                    </label>
                                </div>
                            </div>

                            <div className="titlePhase2Section">Type de route à éviter</div>
                            <div className="container">
                                <div className="row">
                                    <div className="col form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="inlineRadioOptions"
                                               id="inlineRadio1" value="option1"/>
                                            <label className="form-check-label" htmlFor="inlineRadio1">Escaliers</label>
                                    </div>
                                    <div className="col form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="inlineRadioOptions"
                                               id="inlineRadio2" value="option2"/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">Dénivelés</label>
                                    </div>
                                </div>
                            </div>

                            <div className="titlePhase2Section">Cocher ou décocher les choix du thème</div>
                            <div className="container" id="containerPictograms">
                                <div className="row">
                                    <div className="col form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="inlineRadioOptions"
                                               id="inlineRadio1" value="option1"/>
                                        <label className="form-check-label" htmlFor="inlineRadio1">Escaliers</label>
                                    </div>
                                    <div className="col form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="inlineRadioOptions"
                                               id="inlineRadio2" value="option2"/>
                                        <label className="form-check-label" htmlFor="inlineRadio2">Dénivelés</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="sectionReduire">
                        <input class="btn btnPurple" onClick={onNextPhase} value="Réduire"/>
                    </div>
                </div>
                <Etiquette data={this.state.sites[0]} identifiant={"etiquette1"}/>
                <Etiquette data={this.state.sites[1]} identifiant={"etiquette2"}/>
                <Etiquette data={this.state.sites[2]} identifiant={"etiquette3"}/>
            </div>
        );
    }
}
export default CarteInterractionChoixMultiples;
