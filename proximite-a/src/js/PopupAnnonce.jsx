import React from 'react';
import '../css/AcceuilCarte.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import personnage from '../img/Perso-hyblab-03.png'

class PopupAnnonce extends  React.Component {
    
    state={
        show: false
    };
    closeModal(){
        this.setState({show: false})
    };
    openModal(){
        this.setState({show: true})
    };
    render() {
        return (<Modal show={this.state.show}>
            <Modal.Body>
                <div id="containerPopup">
                    <div id="leftSidePopup">
                        <p id="textPopup">J’ai trouvé un lieu surprise pour toi ! Veux-tu le découvrir ?</p>
                        <div className={"w-100 d-flex justify-content-center"}>
                            <Button id="btnPopupOui" onClick={()=>{this.closeModal()}}>Oui</Button>
                            <Button id="btnPopupNon" onClick={()=>{this.closeModal()}}>Non</Button>

                        </div>
                    </div>
                    <div id="rightSidePopup">
                        <img src={personnage} width={120}/>
                    </div>
                </div>
                <input type="button" id="croixPopup" value="x" onClick={()=>{this.closeModal()}}/>
            </Modal.Body>
        </Modal>)
    }
}
export default PopupAnnonce
