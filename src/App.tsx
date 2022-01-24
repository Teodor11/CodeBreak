//CodeBreak  - App

import React, { ChangeEvent } from 'react';
import { Router, navigate } from '@reach/router';    //RouteComponentProps, Link,
import './fontawesome-free-5.15.3-web/css/all.css';
import './App.scss';
import { GameStatus } from './global';
import Board from './Board';
import GameSettings from './GameSettings';


class App extends React.Component<AppProps, AppState>
{

    constructor(props: AppProps)
    {
        super(props);
        this.state = {
            game_settings: {    //game settings will be set later, by user
                max_attempts: 0,
                code_length: 0,
                number_of_colors: 0,    //colors are numbered starting from 1 (not 0)!
                can_repeat_colors_in_code: false,
                first_init_happened: false
            },

            game_status: GameStatus.InProgress,

            target_code: [],
            history: [] as Array<Array<number>>, //array of arrays where each element represents single code break attempt
            indicators_history: [],
            current_drop_area_state: [],
            is_drop_area_filled: false,
            is_help_shown: false
        }

        this.handleGameSettingsChange = this.handleGameSettingsChange.bind(this);
        this.startGame = this.startGame.bind(this);

        this.addAttemptToHistory = this.addAttemptToHistory.bind(this);
        this.changeHelpVisibility = this.changeHelpVisibility.bind(this);
        this.clearAttempt = this.clearAttempt.bind(this);
        this.setDropTargetColor = this.setDropTargetColor.bind(this);
    }

    componentDidMount()
    {
        let gs = Object.assign({}, this.state.game_settings);

        if (!gs.first_init_happened)
        {
            gs.max_attempts = 12;
            gs.code_length = 4;
            gs.number_of_colors = 6;
            gs.can_repeat_colors_in_code = false;
            gs.first_init_happened = true;

            this.setState({ game_settings: gs });
        }


        window.addEventListener("keydown", (e) => { if (e.code == "Escape") { this.changeHelpVisibility(false); } });
    }

    getTargetCode(code_length: number, number_of_colors: number, can_repeat_colors_in_code: boolean): Array<number>
    {
        const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

        let new_code: Array<number> = [];
        let can_repeat_colors_in_code_copy = can_repeat_colors_in_code;


        if (number_of_colors < code_length) { can_repeat_colors_in_code_copy = true; }


        do
        {
            const random_number = getRandomNumber(1, number_of_colors);

            if (!can_repeat_colors_in_code_copy)
            {
                if (new_code.includes(random_number)) { continue; }
            }
            new_code.push(random_number);
        }
        while (new_code.length < code_length);

        return new_code;
    }

    handleGameSettingsChange(e: ChangeEvent): void
    {
        let gs = Object.assign({}, this.state.game_settings);

        const target = e.target as HTMLInputElement;
        const name: string = target.name;
        let value: any;

        switch (name)
        {
            case "max_attempts":
                value = parseInt(target.value);
                gs.max_attempts = value;
                break;

            case "code_length":
                value = parseInt(target.value);
                gs.code_length = value;
                break;

            case "number_of_colors":
                value = parseInt(target.value);
                gs.number_of_colors = value;
                break;

            case "can_repeat_colors_in_code":
                // eslint-disable-next-line
                value = (target.value == "true") ? true : false;
                gs.can_repeat_colors_in_code = value;
                break;
        }

        this.setState({ game_settings: gs });
    }

    changeHelpVisibility(new_state: boolean): void
    {
        if (new_state)
        {
            this.setState({ is_help_shown: true });
        }
        else
        {
            this.setState({ is_help_shown: false });
        }
    }

    startGame(): void
    {
        const gs = this.state.game_settings;

        const new_target_code = this.getTargetCode(gs.code_length, gs.number_of_colors, gs.can_repeat_colors_in_code);

        this.setState({
            game_status: GameStatus.InProgress,
            target_code: new_target_code,
            history: [],
            indicators_history: [],
            current_drop_area_state: [],
            is_drop_area_filled: false
        });

        navigate("/board");
    }

    //change color of single target id
    setDropTargetColor(drop_target_id: number, color_id: number): void
    {

        const countEmptyValuesInDropArea = (drop_area_state: Array<number>, code_length: number): number =>
        {
            if (!drop_area_state.length) { return 0; }
            let not_empty = drop_area_state.reduce((prev, current) => prev + (current ? 1 : 0), 0);

            const empty_cnt = code_length - not_empty;

            return empty_cnt;
        };


        let current_codes: Array<number> = this.state.current_drop_area_state.slice();
        current_codes[drop_target_id] = color_id;


        this.setState({
            current_drop_area_state: current_codes,
            is_drop_area_filled: !countEmptyValuesInDropArea(current_codes, this.state.game_settings.code_length)
        });



    }



    addAttemptToHistory(): void
    {

        if (this.state.game_status != GameStatus.InProgress) { return; }


        if (this.state.is_drop_area_filled) //add only if filled whole code
        {

            if (this.state.history.length < this.state.game_settings.max_attempts)
            {
                let new_history = this.state.history.slice();
                new_history.push(this.state.current_drop_area_state);

                let indicators: IndicatorHistoryElement = this.calculateIndicators(this.state.current_drop_area_state, this.state.target_code);
                let new_indicators_history: Array<IndicatorHistoryElement> = this.state.indicators_history.slice();
                new_indicators_history.push(indicators);

                const user_code_string = this.state.current_drop_area_state.join("");
                const target_code_string = this.state.target_code.join("");



                this.setState({
                    history: new_history,
                    indicators_history: new_indicators_history
                },
                    () =>
                    {
                        if (user_code_string === target_code_string)
                        {
                            //alert("Congratulations, you won!");
                            this.setState({ game_status: GameStatus.Won, is_drop_area_filled: false });
                        }
                        else
                        {
                            if (this.state.history.length == this.state.game_settings.max_attempts)
                            {
                                //alert("You lost, better luck next time");
                                this.setState({ game_status: GameStatus.Lost, is_drop_area_filled: false });
                            }
                        }
                    });

            }
        }
    }

    clearAttempt(): void
    {
        this.setState({ current_drop_area_state: [], is_drop_area_filled: false });
    }

    calculateIndicators(user_attempt: Array<number>, target_code: Array<number>): IndicatorHistoryElement
    {
        let partialMatches = 0, fullMatches = 0;

        let user_colors: Array<number> = new Array(this.state.game_settings.number_of_colors + 1).fill(0);
        let target_colors: Array<number> = new Array(this.state.game_settings.number_of_colors + 1).fill(0);


        //partial matches (white indicator)
        user_attempt.forEach(el => { user_colors[el]++; });
        target_code.forEach(el => { target_colors[el]++ });

        user_colors.forEach((el, i) => { partialMatches += Math.min(user_colors[i], target_colors[i]); });

        //full matches (green indicator)
        user_attempt.forEach((el, i) =>
        {
            if (el === target_code[i])
            {
                fullMatches++;
            }
        });

        partialMatches -= fullMatches;   //partial matches already included full matches, now we seperate them

        //console.log("calc indicators -> user attempt: ", user_attempt, "target code: ", target_code, "partial/full matches: ", partialMatches, fullMatches);

        return {
            partialMatches: partialMatches,
            fullMatches: fullMatches
        };

    }


    render()
    {
        return (
            <div className="App">

                <header className="App-header">
                    Code Break
                </header>

                <Router>
                    <GameSettings path="/"
                        handleGameSettingsChange={this.handleGameSettingsChange}
                        startGame={this.startGame} />

                    <Board path="board"
                        current_drop_area_state={this.state.current_drop_area_state}
                        game_status={this.state.game_status}
                        game_settings={this.state.game_settings}
                        history={this.state.history}
                        indicators_history={this.state.indicators_history}
                        is_drop_area_filled={this.state.is_drop_area_filled}
                        target_code_exists={!!this.state.target_code.length}
                        is_help_shown={this.state.is_help_shown}

                        addAttemptToHistory={this.addAttemptToHistory}
                        changeHelpVisibility={this.changeHelpVisibility}
                        clearAttempt={this.clearAttempt}
                        setDropTargetColor={this.setDropTargetColor}
                    />
                </Router>

            </div>
        );
    }


}

export default App;
