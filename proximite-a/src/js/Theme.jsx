import React from 'react';

class Theme extends  React.Component {
    render() {
        const {onNextPage, onPreviousPage} = this.props;
        return (
            <div>
                <h3>Tu est plutot .. ?</h3>
                <input type='button' value='←' onClick={onPreviousPage}/>
                <input type='button' value='→' onClick={onNextPage}/>
            </div>
        );
    }
}

export default Theme;