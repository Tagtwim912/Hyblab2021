import React from 'react';
import logo from '../img/LOGO OK_logo principal.png';
import fond from '../img/video-pageaccueil-fond blanc.mp4';
import fond2 from '../img/video-pageaccueil-fond blanc.mp4';
import '../css/home.css'
class Home extends  React.Component {

    state = {
        nomPers:"",
        buttonActivate: false,
        video:{fond}.fond
    }

    updateName= (e)=>{
        this.setState({nomPers:e.target.value,
            buttonActivate:true})
    }

    submitName = (updateNom,NextPage)=>{
        updateNom(this.state.nomPers);
        NextPage();
    }

    nextVideo = ()=>{
        if(this.state.video!={fond2}){
            this.setState({video:{fond2}.fond2})
        }
    }

    videoPlayed=()=>{
        if (this.state.video == { fond }) {
            return {fond}.fond
        }
        else{
            return {fond2}.fond2
        }
    }

    render() {
        const { updateNom,onNextPage} = this.props;
        return (
            <div id="homeContainer" class="container">
                <video id="videoFond" src={this.state.video} role="presentation" muted autoPlay preload="auto" onEnded={() => this.nextVideo()}/>
                <div class="container d-flex justify-content-center align-items-center flex-column">
                    <img src={logo} id='logo'></img>
                    <span id="paragraphe" class="text-center m-5">Bienvenue sur EnvironNantes ! Cette application te permettra de découvrir tout ce qu’il y a autour de toi dans un rayon d’un quart d’heure ! </span>
                    <h4>Comment t’appelles-tu ?</h4>
                    <input type='text' placeholder='entrez votre prénom' onChange={this.updateName}/>
                    <form onSubmit={() => { this.submitName(updateNom, onNextPage) }}>
                        <input type='submit' class="btn btnValidatePurpleBackground mt-5" value='EXPLORER' disabled={!this.state.buttonActivate}/>
                    </form>
                </div>
                <div class="d-flex justify-content-end mt-5">
                    <input id="credits" type='button' value='Crédits' />
                </div>
            </div>
        );
    }
}
export default Home;
