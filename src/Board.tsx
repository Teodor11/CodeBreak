//CodeBreak - Board

import React from "react";
import "./Board.scss";
import Fireworks from "./Fireworks";
import Status from "./Status";
import History from "./History";
import DropArea from "./DropArea";
import { navigate } from "@reach/router";
import Help from "./Help";



class Board extends React.Component<BoardProps>
{

    board_ref = React.createRef<HTMLDivElement>();

    // constructor(props: BoardProps)
    //{
    //    super(props);
    //}

    async componentDidMount()
    {
        if (!this.props.target_code_exists)
        {
            await navigate("/");
            await navigate("/");
        }
    }





    render()
    {
        return (
            <div className="Board" ref={this.board_ref}>

                <Help
                    is_help_shown={this.props.is_help_shown}
                    changeHelpVisibility={this.props.changeHelpVisibility} />

                <Fireworks
                    game_status={this.props.game_status} />

                <div className="HistoryContainer">
                    <Status
                        game_status={this.props.game_status} />

                    <History
                        history={this.props.history}
                        indicators_history={this.props.indicators_history}
                        max_attempts={this.props.game_settings.max_attempts}
                        code_length={this.props.game_settings.code_length} />

                </div>
                <DropArea
                    current_drop_area_state={this.props.current_drop_area_state}
                    game_settings={this.props.game_settings}
                    board_ref={this.board_ref}
                    is_drop_area_filled={this.props.is_drop_area_filled}

                    addAttemptToHistory={this.props.addAttemptToHistory}
                    changeHelpVisibility={this.props.changeHelpVisibility}
                    clearAttempt={this.props.clearAttempt}
                    setDropTargetColor={this.props.setDropTargetColor} />
            </div>
        );
    }


}


export default Board;