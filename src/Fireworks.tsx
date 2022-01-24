//CodeBreak - Fireworks

import "./Fireworks.scss";


function Fireworks(props: FireworksProps): JSX.Element
{

    let code = [];

    if (props.game_status === 2)
    {
        code.push(<div key="0" className="Fireworks">
            <div key="1" className="FireworksBefore"></div>
            <div key="2" className="FireworksAfter"></div>
        </div>);
    }


    return (
        <div className="FireworksContainer">
            {code}
        </div>);

}


export default Fireworks;