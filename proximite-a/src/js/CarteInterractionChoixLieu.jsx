import React from 'react';
import '../css/AcceuilCarte.css'
import logo from '../img/LOGO OK_logo principal.png'
import personnage from '../img/Perso-hyblab-03.png'

class CarteInterractionChoixLieu extends  React.Component {
    state={
        sites:this.props.data.sites
    }
    render() {
        const {onNextPhase} = this.props;
        return (
            <div id="containerInterraction" class="container containersInterraction">
                <div class="row">
                    <div id="containerInterractionLeftSection" class="col-xl-4">
                        <div id="containerInterractionLeftUpperSection">
                            <img src={logo} id="containerInterractionLogoP1"/>
                        </div>
                        <img src={personnage} className="mt-4" width={200}/>
                        <div id="textInterractionIntro">Voyons ce qu’il y a autour de toi ! Voici des lieux qui pourraient t’intéresser. Le(s)quel(s) as-tu envie de visiter ?</div>
                    </div>
                    <div id="containerInterractionRightSection" class="col-xl-8 mt-5">
                        <div class="container mb-5">
                            <div class="row">
                                <div class="col containerChoice">
                                    <h3 className="h3Purple">Le plus près...</h3>
                                    <div className="card">
                                        <img className="card-img-top" class="imgChoice" src={this.state.sites[0].img} alt="Card image cap"/>
                                            <div className="card-body">
                                                <h5 className="card-title">{this.state.sites[0].titre}</h5>
                                                <p className="card-text">{this.state.sites[0].adresse}</p>
                                                <p className="card-text">Some quick example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and make up the bulk of the card's content.</p>
                                            </div>
                                    </div>
                                    <input type="checkbox" class="mt-3" name="choixLieux"/>
                                </div>
                                <div class="col containerChoice">
                                    <h3 className="h3Purple">Le hasard...</h3>
                                    <div className="card">
                                        <img className="card-img-top" class="imgChoice" src={this.state.sites[1].img} alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{this.state.sites[1].titre}</h5>
                                            <p className="card-text">{this.state.sites[1].adresse}</p>
                                            <p className="card-text">Some quick example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                    <input type="checkbox" class="mt-3" name="choixLieux"/>
                                </div>
                                <div class="col containerChoice">
                                    <h3 className="h3Purple">Le troisième...</h3>

                                    <div className="card">
                                        <img className="card-img-top" className="imgChoice"
                                            src={this.state.sites[2].img} alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{this.state.sites[2].titre}</h5>
                                            <p className="card-text">{this.state.sites[2].adresse}</p>
                                            <p className="card-text">Some quick example text to build on the TITRE LIEUX
                                                and example text to build on the TITRE LIEUX and example text to build
                                                on the TITRE LIEUX and example text to build on the TITRE LIEUX and
                                                example text to build on the TITRE LIEUX and make up the bulk of the
                                                card's content.</p>
                                        </div>
                                    </div>
                                    <input type="checkbox" class="mt-3" name="choixLieux"/>
                                </div>
                            </div>
                        </div>
                            <input type='button' width="50" class="btn btnPurple" value="Valider" onClick={onNextPhase}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default CarteInterractionChoixLieu;