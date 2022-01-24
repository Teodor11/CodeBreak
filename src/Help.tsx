//CodeBreak - Help

import "./Help.scss";


function Help(props: HelpProps): JSX.Element
{

    let code = [] as Array<JSX.Element>;

    if (props.is_help_shown)
    {
        code.push(<div className="Help" key={1}>
            <button title="Close" className="closeHelpButton" onClick={() => props.changeHelpVisibility(false)}>
                <i className="fas fa-times"></i>
            </button>

            <h2>Help</h2>
            <p>Drag colors from the bottom panel and drop them in the drop area.</p>

            <p>When all colors are added, click the button "Add&nbsp;attempt":</p>

            <img src="/help/add_attempt.png" alt="Add attempt button" className="helpAddAttemptImage" />

            <div className="helpImageContainer">
                <img src="/help/white_indicators.png" alt="White indicators" className="helpIndicatorsImage" />
                <span>White circles indicate correct colors, but in the wrong place.</span>
            </div>

            <div className="helpImageContainer">
                <img src="/help/green_indicators.png" alt="Green indicators" className="helpIndicatorsImage" />
                <span>Green circles indicate correct colors in the right place.</span>
            </div>

            <p>Your goal is to break the code in the smallest number of attempts.</p>



        </div>);
    }

    return (<div className="HelpContainer">{code}</div>);

}



export default Help;