import React from 'react';
import '../css/AcceuilCarte.css'

class Etiquette extends  React.Component {

    state={
        stateEtiquette:false,
        site: this.props.data
    };

    render() {
        //const {theme} = props;
        const {identifiant, numero} = this.props;
        return (
            <div id={identifiant}
                 onAnimationEnd={() => this.setState({ stateEtiquette: false })}
                 className={ +' '+ this.state.stateEtiquette ? 'decaleDroite containersInterraction card' : 'decaleGauche ' }>
                <img className="card-img-top imgChoice imgChoiceEtiquette" src={this.state.site.img} alt="Card image cap"/>
                <div className="card-body m-2">
                    <h5 className="card-title">{this.state.site.titre}</h5>
                    <p className="card-text">{this.state.site.adresse}</p>
                    <p className="card-text">Some quick example text to build on the TITRE LIEUX
                        and example text to build on the TITRE LIEUX and example text to build
                        on the TITRE LIEUX and example text to build on the TITRE LIEUX and
                        card's content.</p>
                </div>
                <button id="boutEtiquette"
                        className={'fondEtiquetteDefault'}
                    onClick={() => this.setState({ stateEtiquette: !this.state.stateEtiquette })}>
                    <div className={"roundedText"}>{numero}</div>
                </button>
            </div>
        );
    }
}
export default Etiquette;
