//CodeBreak - History
import React from 'react';
import './History.scss';



function History(props: HistoryProps): JSX.Element
{

    let code_tr: Array<JSX.Element> = [];

    const tr_ref = React.useRef<HTMLTableRowElement>(null);

    for (let i = 0; i < props.max_attempts; i++)
    {

        let code_td: Array<JSX.Element> = [];
        let code_indicators: Array<JSX.Element> = [];

        //first column with attempt number
        code_td.push(<td key={i + "_-1"} className="historyAttemptId" >#{i + 1}</td>);


        for (let j = 0; j < props.code_length; j++)
        {
            let key_td = `${i}_${j}`;
            if (props.history.length > i)   //row with code break attempt
            {
                code_td.push(<td key={key_td}>
                    <span className={"codeColor" + props.history[i][j]}></span>
                </td>);
            }
            else    //empty row
            {
                code_td.push(<td key={key_td}>
                    <span className="noColor"></span>
                </td>);
            }


        }

        const ind: IndicatorHistoryElement = props.indicators_history[i];
        let empty_ind: number = props.code_length;

        if (ind)
        {
            empty_ind = props.code_length - ind.fullMatches - ind.partialMatches;
            for (let j = 0; j < ind.fullMatches; j++)
            {
                code_indicators.push(<div key={"indicator_green_" + i + "_" + j} className="indicator indicator_green"></div>);
            }

            for (let j = 0; j < ind.partialMatches; j++)
            {
                code_indicators.push(<div key={"indicator_white_" + i + "_" + j} className="indicator indicator_white"></div>);
            }
        }


        for (let j = 0; j < empty_ind; j++)
        {
            code_indicators.push(<div key={"indicator_" + i + "_" + j} className="indicator"></div>);
        }


        code_td.push(<td className="td_indicators" key={"indicator_" + i}>{code_indicators}</td>);

        if (i === 0)
        {
            code_tr.push(<tr key={i} ref={tr_ref}>{code_td}</tr>);
        }
        else
        {
            code_tr.push(<tr key={i}>{code_td}</tr>)
        }

    }

    React.useEffect(() =>
    {
        if (props.history.length === 0 && tr_ref.current)
        {
            tr_ref.current.scrollIntoView();
        }

        window.scrollTo({ top: 0, left: 0 });
    });

    code_tr.reverse();



    return (<div className="History">
        <table>
            <tbody>{code_tr}</tbody>
        </table>
    </div>);

}


export default History;