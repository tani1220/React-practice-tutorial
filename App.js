import React from 'react';
import Game from './Game';
import Deep from './Deep';

class App extends React.Component {
    render(){
        return(
            <div>
                <Game />
                <Deep />
            </div>
        )
    }
}

export default App;