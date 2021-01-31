import React from 'react';
import MoyenSelector from './MoyenSelector'
import local from '../img/pictogrammes_maison.png'
import '../css/moyen.css'

//images logos
import logo0 from '../img/LOGO OK_logo principal.png'
import logo1 from '../img/LOGO OK_logo vert.png'
import logo2 from '../img/LOGO OK_logo bleu.png'
import logo3 from '../img/LOGO OK_logo jaune.png'
import logo4 from '../img/LOGO OK_logo orange.png'
import logo5 from '../img/LOGO OK_logo rose.png'
//images persos
import fetard_img from '../img/Perso-hyblab-03.png'
import sportif_img from '../img/Perso-hyblab-02.png'
import gourmet_img from '../img/Perso-hyblab-04.png'
import culture_img from '../img/Perso-hyblab-05.png'
import famille_img from '../img/Perso-hyblab-06.png'
class Moyen extends  React.Component {
    state = {
        moyenId:null,
        buttonActivate:false,
        themeId: this.props.data.themeId
    };
    getThemePerso  = () =>{
        switch (this.state.themeId) {
            case 0://défaut(bleu)
                return { fetard_img }.fetard_img;
            case 1://fêtard(vert)
                return { fetard_img }.fetard_img;
            case 2://sportif(cyan)
                return { sportif_img }.sportif_img;
            case 3://gourmet(jaune)
                return { gourmet_img }.gourmet_img;
            case 4://curieux/culture(orange)
                return { culture_img }.culture_img;
            case 5://famille(rose)
                return { famille_img }.famille_img;
        }
    }
    getThemeLogo = () => {
        switch (this.state.themeId) {
            case 0://défaut(bleu)
                return { logo0 }.logo0;
            case 1://fêtard(vert)
                return { logo1 }.logo1;
            case 2://sportif(cyan)
                return { logo2 }.logo2;
            case 3://gourmet(jaune)
                return { logo3 }.logo3;
            case 4://curieux/culture(orange)
                return { logo4 }.logo4;
            case 5://famille(rose)
                return { logo5 }.logo5;
        }
    }

    handleChange = (e) => {
        this.setState({
            moyenId: e,
            buttonActivate:true});
    }
    submitMoyen = (update) => {
        update(this.state.moyenId);
    }

    render() {
        const { onNextPage, onPreviousPage, onSetMoyen} = this.props;
        return (
            <div id="MoyenContainer" class="d-flex justify-content-center align-items-center">

                <div id="Theme" class="d-flex flex-column justify-content-center align-items-center fixed-top">
                    <img id="logoCorner" src={this.getThemeLogo()} width={100} ></img>
                    <img src={this.getThemePerso()} alt="fetard" />
                    <span class="text-center align-middle">Très bien, maintenant que je sais où tu te situes, comment souhaites-tu te déplacer ?</span>
                </div>
                <div id="containerLocalisation">
                    <div id="Localisation" >
                        <div className="d-flex flex-row justify-content-end align-items-end m-5">
                            <img src={local}/>
                        </div>
                    </div>
                </div>

                <div id="Moyen" class="d-flex justify-content-around align-items-center">
                    <div id="changepage" class="d-flex justify-content-center align-items-center flex-column ">
                        <button className='btnNavigationAttributPurple fa fa-arrow-left' onClick={onPreviousPage} />
                        <p>Retour</p>
                    </div>
                    <div class="d-flex flex-column justify-content-center align-items-center ">
                        <h3>Choisis ton moyen de déplacement</h3>
                        <MoyenSelector data={this.state} updateSelect={this.handleChange}/>
                        <input type='button' class="btn btnValidatePurpleBackground" value='Valider' onClick={() => { this.submitMoyen(onSetMoyen) }} disabled={!this.state.buttonActivate}/>
                    </div>
                    <div id="changepage" class="d-flex justify-content-center align-items-center flex-column">
                        <button className='btn btnNavigationAttributPurple fa fa-arrow-right' onClick={() => { this.submitMoyen(onSetMoyen) }} disabled={!this.state.buttonActivate}/>
                        <p id='suiv'>Suivant</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Moyen;
