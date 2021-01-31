import React from 'react';
import logo1 from '../img/LOGO OK_logo bleu.png'
import perso1 from '../img/Perso-hyblab-03.png'
import maison from '../img/pictogrammes_maison.png'
import '../css/attributs.css'

class Attributs extends React.Component{
    state = {
        coords: [0,0],
        adresse:{
            rue:'',
            codepostal:'',
            ville:'',
            validAdress:false
        },
        choixCoordonnes: false //si l'utilisateur a décidé d'utiliser la géolocalisation
    };

        getCoords = () =>{
            let urlRue = this.state.adresse.rue.split(' ').join('+');
            let urlCodepostal = this.state.adresse.codepostal.split(' ').join('+');
            let urlVille = this.state.adresse.ville.split(' ').join('+');
            console.log(`http://localhost:8080/proximite-a/api/adresse/${urlRue}+${urlCodepostal}+${urlVille}+france`)
        fetch(`http://localhost:8080/proximite-a/api/adresse/${urlRue}+${urlCodepostal}+${urlVille}+france`)
            .then((response) => {   //récupération de la réponse
                if (response.ok) {
                    console.log(response)
                    return response.json();
                }else {
                    console.log("err")
                }
            })
            .then((donnee) => {  //récupération des données JSON
                console.log(donnee)
                this.setState({
                    coords:[donnee.latitude,donnee.longitude],
                    validAdress:true
                })
            })
    }

    getLocalAdress = () =>{
        navigator.geolocation.getCurrentPosition(function (position) {   //une fois la position récupérée
            this.setState({
                coords: [position.coords.latitude, position.coords.longitude],
            });
            fetch( 'https://hyblab.polytech.univ-nantes.fr/proximite-a/api/coordinates/'+position.coords.latitude+'_'+position.coords.longitude)
                .then((response) => {   //récupération de la réponse
                    if (response.ok) {
                        console.log(response);
                        return response.json();
                    }
                })
                .then((donnee) => {  //récupération des données JSON
                    console.log(donnee)
                    this.setState({
                        adresse:{
                            codepostal:donnee.codepostal,
                            rue:donnee.rue,
                            ville:donnee.ville
                        },
                        validAdress:true
                    });
                })

        }.bind(this));
    }


    handleChangeRue = (event) => {
        const value = event.currentTarget.value;
        let newAdress = this.state.adresse;
        newAdress.rue = value
        this.setState({
            adresse : newAdress,
            validAdress:false
        })
    };
    handleChangeVille = (event) => {
        const value = event.currentTarget.value;
        let newAdress = this.state.adresse;
        newAdress.ville = value
        this.setState({
            adresse : newAdress,
            validAdress:false
        })
    };
    handleChangeCP = (event) => {
        const value = event.currentTarget.value;
        let newAdress = this.state.adresse;
        newAdress.codepostal = value
        this.setState({
            adresse : newAdress,
            validAdress:false
        })
    };

    //envoi données + changement page
    submitAttributs = (update, NextPage) => {
        //todo envoyer coords + adresse uniquement
        update(this.state.coords,this.state.adresse);
        NextPage();
    };
    render(){
        const { onNextPage, onPreviousPage, onSetAttributs} = this.props;
        return(
            <div id="attributContainer" class="d-flex justify-content-center align-items-center ">
                <div id="leftPartAttribut">
                    <div id="leftPurpleContainerAttribut">
                        <div id="containerAttributLeftContent">
                            <img id="imgLogoAttribut" src={logo1} width={150}/>
                            <div id="blablaMadameAttribut">
                                <img src={perso1}/>
                                <p id="paragrapheBlablaMadameAttribut">Hello moi c’est Alex !
                                    Tu aimes rencontrer tes amis dans des bars, déguster  des planches apéros et sortir danser ? Alors, suis-moi !
                                    <br/>
                                    <br/>
                                    C’est moi qui vais t’accompagner tout au long  de ton parcours. <b>Et pour te guider au mieux,
                                        peux-tu me donner ton adresse ou ta géolocalisation ?</b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="rightPartAttribut">
                    <button className="d-flex btn btnNavigationAttribut fa fa-arrow-left" onClick={onPreviousPage} />
                    <div id="rightPartAttributCenter">
                        <img src={maison} class="mb-3" width={40}/>
                        <p id="textChoisi" class="mb-4">Choisi ton point de départ</p>
                        <div className="search">
                            <span className="fa fa-compass"></span>
                            <input  type="button" className="btnAttribut btn" value="Activer la géolocalisation" onClick={ this.getLocalAdress}/>
                        </div>
                        <p class="text-white m-4"><b>OU</b></p>
                        <div className="search d-flex flex-column">
                            <div class="text-white">Adresse</div>
                            <input class="inputText" placeholder="ex: 23 rue Chopin" value={this.state.adresse.rue} onChange={this.handleChangeRue}/>
                            <div class="text-white">Ville</div>
                            <input class="inputText" placeholder="ex: Nantes" value={this.state.adresse.ville} onChange={this.handleChangeVille}/>
                            <div class="text-white">Code Postal</div>
                            <input class="inputText" placeholder="ex: 44100" value={this.state.adresse.codepostal} onChange={this.handleChangeCP}/>
                        </div>
                        <div>
                            <input type='button' class="border-0 bg-transparent mt-5 m-1" value="Vérifier l'adresse" onClick={()=>{this.getCoords()}} />
                            <input type='button' class="btnWhiteBgpurpleText mt-5" value="VALIDER" onClick={()=>{this.submitAttributs(onSetAttributs,onNextPage)}} disabled={this.state.adresse.ville =='' || this.state.adresse.codepostal=='' || this.state.adresse.rue=='' || this.state.validAdress==false}/>
                        </div>
                    </div>
                    <button class="d-flex btn btnNavigationAttribut button fa fa-arrow-right"  onClick={()=>{this.submitAttributs(onSetAttributs,onNextPage)}} disabled={this.state.adresse.ville =='' || this.state.adresse.codepostal=='' || this.state.adresse.rue=='' || this.state.validAdress==false}/>
                </div>
            </div>
        );
    }
}

export default Attributs;
