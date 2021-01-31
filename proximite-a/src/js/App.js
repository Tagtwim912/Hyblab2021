import React from 'react';
import Home from './Home';
import Theme from './Theme';
import Attributs from './Attributs';
import Moyen from './Moyen';
import AcceuilCarte from './AcceuilCarte';
import equivalent from './equivalent.js'

class App extends  React.Component {

    state = {
        nomPers: null,
        pageId: 1,
        themeId:0,
        moyenId:0,
        coords:[47.215878,-1.55051],
        adresse: {
            rue: '',
            codepostal: '',
            ville: ''
        },
        sites: [{ id: '1',
            titre: 'squalala',
            img: 'https://pbs.twimg.com/profile_images/743774363833503744/-eSLwh6f_400x400.jpg',
            adresse: 'nous sommes partis',
            description : "blabla",
            coordonnes:[1,2],    //latitude_longitude
            type:4,
        },
            { id: '2',
                titre: 'squelele',
                img: 'https://media.tenor.com/images/1c500d0d30c039aef2cc1056a0f4e8e6/tenor.gif',
                adresse: 'nous sommes repartis',
                description : "blabla",
                coordonnes:[3,4],    //latitude_longitude
                type:1,
            },
            { id: '3',
                titre: 'Oooo di',
                img:'https://media.tenor.com/images/5c58bbed210c8bb91dddb88caa8f1ed3/tenor.gif',
                adresse:'AAAAAAAAAAAAAHH',
                description : "blabla",
                coordonnes:[5,6],    //latitude_longitude
                type:2,
            }],
        surprise: {
            titre: 'Oooo di',
            img: 'https://media.tenor.com/images/5c58bbed210c8bb91dddb88caa8f1ed3/tenor.gif',
            adresse: 'AAAAAAAAAAAAAHH',
            description: "blabla",
            coordonnes: [5, 6],    //latitude_longitude
            type: 3
        }
    };

    getPage = () => {
        switch (this.state.pageId) {
            case 0:
                return <Home onNextPage={this.nextPage} updateNom={this.updateName}/>;
            case 1:
                return <Theme data={this.state} onNextPage={this.nextPage} onSetTheme={this.updateTheme} onPreviousPage={this.previousPage}/>;
            case 2:
                return <Attributs data={this.state} onNextPage={this.nextPage} onSetAttributs={this.updateAttributs} onPreviousPage={this.previousPage}/>;
            case 3:
                return <Moyen data={this.state} onSetMoyen={this.updateMoyen} onPreviousPage={this.previousPage} />;
            case 4:
                return <AcceuilCarte data={this.state} onSetMoyen={this.updateMoyen} nomPers={this.state.nomPers}/>;
        }
    };




    nextPage = () =>{
        const newPageId = this.state.pageId+1;
        this.setState({pageId:newPageId })
    };
    previousPage = () =>{
        const newPageId = this.state.pageId-1;
        this.setState({pageId:newPageId })
    };

    updateName=(e)=>{
        this.setState({nomPers:e})
    };

    updateTheme = (e) => {
        this.setState({ themeId: e })
    };

    updateAttributs = (e,f) => {
        this.setState({ coords: e,adresse:f})
    };

    updateMoyen=(e)=>{
        this.setState({moyenId:e})
        this.createSites()
    };

    //changer url
    createSites = async function() {
        let stringAdresse = this.state.adresse.rue.replace(' ', '+') + '+' + this.state.adresse.codepostal + '+' + this.state.adresse.ville
        let moyen=equivalent.moyenEquiv.get(this.state.moyenId)
        let theme=equivalent.themeEquiv.get(this.state.themeId)
        console.log("appel de "+'http://localhost:8080/proximite-a/api/getlocationsforprofile/' + stringAdresse+'/'+moyen+'/'+theme);
        let lieux = await( await fetch('http://localhost:8080/proximite-a/api/getlocationsforprofile/' + stringAdresse+'/'+moyen+'/'+theme)).json();
        console.log(lieux)
        console.log(lieux.lieux.lenght)
        console.log("appel de " + `http://localhost:8080/proximite-a/api/coordinates/`);
        let site1 = {
            id: '1',
            titre: '',
            img: '',
            adresse: '',
            description: "",
            coordonnes: [1, 2],    //latitude_longitude
            type: 4,
        }
        if(lieux.lieux.lenght>=1&&lieux.lenght>=1){
            let adresse1 = await (await fetch(`http://localhost:8080/proximite-a/api/coordinates/${lieux.lieux[0].lat}_${lieux.lieux[0].lon}`)).json();
            let name1 = ""
            if (typeof lieux.lieux[0].tags.name !== "undefined") {
                name1 = lieux.lieux[0].tags.name
            }
            site1 = {
                id: '1',
                titre: name1,
                img: '',
                adresse: adresse1,
                description: '',
                coordonnes: [lieux.lieux[0].lat, lieux.lieux[0].lon],
                type: this.state.themeId
            };

        }
        let site2 = {
            id: '2',
            titre: '',
            img: '',
            adresse: '',
            description: "",
            coordonnes: [3, 4],    //latitude_longitude
            type: 4,
        }
        if (lieux.lieux.lenght >= 2 && lieux.lenght >= 1){let adresse2 = await (await fetch(`http://localhost:8080/proximite-a/api/coordinates/${lieux.lieux[1].lat}_${lieux.lieux[1].lon}`)).json();
            let name2 = ""
            if (typeof lieux.lieux[1].tags.name !== "undefined") {
                name2 = lieux.lieux[1].tags.name
            }
            site2 = {
                id: '2',
                titre: name2,
                img: '',
                adresse: adresse2,
                description: '',
                coordonnes: [lieux.lieux[1].lat, lieux.lieux[1].lon],
                type: this.state.themeId
            }

        }
        let site3 = {
            id: '',
            titre: '',
            img: '',
            adresse: '',
            description: "",
            coordonnes: [5, 6],    //latitude_longitude
            type: 4,
        }
        if (lieux.lieux.lenght >= 3 && lieux.lenght >= 1) {let adresse3 = await (await fetch(`http://localhost:8080/proximite-a/api/coordinates/${lieux.lieux[2].lat}_${lieux.lieux[2].lon}`)).json();
            let name3 = ""
            if (typeof lieux.lieux[0].tags.name !== "undefined") {
                name3 = lieux.lieux[2].tags.name
            }
            site3 = {
                id: '3',
                titre: name3,
                img: '',
                adresse: adresse3,
                description: '',
                coordonnes: [lieux.lieux[2].lat, lieux.lieux[2].lon],
                type: this.state.themeId
            }

        }
        let lieuSurprise = this.state.surprise
        if (lieux.lenght > 1){let adresseSurp = await (await fetch(`http://localhost:8080/proximite-a/api/coordinates/${lieux.surprise.lat}_${lieux.surprise.lon}`)).json();
            console.log(adresseSurp)
            let nameSurp = ""
            if (lieux.surprise.tags.name) {
                nameSurp = lieux.surprise.tags.name
            }
            lieuSurprise = {
                titre: nameSurp,
                img: '',
                adresse: adresseSurp,
                description: '',
                coordonnes: [lieux.surprise.lat, lieux.surprise.lon],
                type: 0 //todo mettre le bon theme
            }
        }

        this.setState({
            sites: [site1,site2,site3],
            surprise:lieuSurprise
        });
        console.log("nouveaux sites")
        console.log([site1, site2, site3])
        this.setState({pageId:4})
    }

    render() {
        return (
            <div id="mainContainer">
                {this.getPage()}
            </div>
        );
    }
}

export default App;
