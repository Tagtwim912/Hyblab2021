import React from 'react'

import '../css/creditPage.css'
/*Images Logos*/
import logo from '../img/LOGO OK_logo principal.png'
import logohyblab from '../img/logo_hyblab.png'
import logoMedialab from '../img/LogoOML-300x101 1.png'
import logoPolytech from '../img/logopolytech.png'
import logoOpen from '../img/logoopensource.png'
import logoUniv from '../img/logouniversitenantes.png'
import logoCC from '../img/logoCC 1.png'
import logoScience from '../img/logoaudenciasciencescom 1.png'
import logoAgr from '../img/logo_agr_nantes_rennes_retina 1.png'
import { useState } from 'react'

class CereditPage extends React.Component {
    render() {
        return (

                        <div id="creditContainer" class="d-flex justify-content-end justify-content-end">
                            <div id="rightPartCredit" class="d-flex justify-content-center">
                                <button id="closeButton" type="button" class="btn-close" aria-label="Close" />
                                <div id="rightPartCreditCenter">
                                    <br /> <br />
                                    <img id="logoposition" src={logo} class="mb-3" width={200} height={130} />
                                    <p id="paragrapheCredit">
                                        Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                        </p> <br />
                                    <div class="d-flex justify-content-around" >
                                        <img id="logoEcole" src={logohyblab} width={214} height={41} />
                                        <img id="logoEcole" src={logoMedialab} width={150} height={49} />
                                    </div>
                                    <div class="d-flex justify-content-around ">
                                        <img id="logoEcole" src={logoOpen} width={80} height={110} />
                                        <img id="logoEcole" src={logoUniv} width={126} height={80} />
                                        <img id="logoEcole" src={logoCC} width={64} height={64} />
                                    </div>
                                    <div class="d-flex justify-content-between align-items-between">
                                        <img id="logoEcole" src={logoAgr} width={231} height={60} />
                                        <img id="logoEcole" src={logoPolytech} width={84} height={53} />
                                        <img id="logoEcole" src={logoScience} width={213} height={68} />
                                    </div>

                                </div>

                            </div>

                        </div>

        )
    };
}

export default CereditPage;
