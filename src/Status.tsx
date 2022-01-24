//CodeBreak - Status

import "./Status.scss";


function Status(props: StatusProps): JSX.Element
{

    const status_class = ["", "StatusGameInProgress", "StatusGameWon", "StatusGameLost"];
    const status_text = ["", "Game in progress", "Game won", "Game lost"];


    return (<div className={"Status " + status_class[props.game_status]}>
        {status_text[props.game_status]}
    </div>);

}



export default Status;