import React from 'react';
import logo from '../img/LOGO OK_logo principal.png'
import ThemeSelector from './ThemeSelector'
import '../css/theme.css'
import equivalent from './equivalent.js'
class Theme extends  React.Component {
    state={
        themeId: 0,
    }

    handleChange = (e) => {
        this.setState({
            themeId: e,
        });
    }

    submitTheme = (update, NextPage) => {
        update(this.state.themeId);
        NextPage();
    }

    render() {
        const {onSetTheme,onNextPage, onPreviousPage} = this.props;
        return (
            <div id="themeContainer" class="d-flex flex-column">
                <img src={logo} width={150} class="mt-2 ml-5"/>
                <div class="d-flex h-100 justify-content-between align-items-center">
                    <div className="d-flex btn btnNavigationAttributPurple fa fa-arrow-left" onClick={onPreviousPage}/>
                    <div class="d-flex flex-column justify-content-center align-items-center ">
                        <ThemeSelector onNextPage={onNextPage} updateSelect={this.handleChange}/>
                        <div id="txttheme">
                            {this.state.themeId?equivalent.themetxt.get(this.state.themeId):"Qu'est-ce-qui vous intéresserait aujourd'hui ?"}
                        </div>
                        <input type='button' class="btn btnValidatePurpleBackground mb-3" value='VALIDER' onClick={() => { this.submitTheme(onSetTheme,onNextPage)}} disabled={!this.state.themeId}/>
                    </div>
                    <button className="d-flex btn btnNavigationAttributPurple fa fa-arrow-right" onClick={() => {this.submitTheme(onSetTheme, onNextPage)}} disabled={!this.state.themeId}/>
                </div>
            </div>
        );
    }
}

export default Theme;

