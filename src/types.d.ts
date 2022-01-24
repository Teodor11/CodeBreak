//CodeBreak - types.d.ts


//////////////////////////////////////////////
//App.tsx
//////////////////////////////////////////////

type AppProps = {

};

type AppState = {
    game_settings: {
        max_attempts: number,
        code_length: number,
        number_of_colors: number,    //colors are numbered starting from 1 (not 0)!
        can_repeat_colors_in_code: boolean,
        first_init_happened: boolean
    },

    // @ts-ignore
    game_status: GameStatus,

    target_code: Array<number>,
    history: Array<Array<number>>, //array of arrays where each element represents single code break attempt
    indicators_history: Array<IndicatorHistoryElement>,
    current_drop_area_state: Array<number>,
    is_drop_area_filled: boolean,
    is_help_shown: boolean
};

type IndicatorHistoryElement = {
    partialMatches: number,
    fullMatches: number
}




//////////////////////////////////////////////
//Board.tsx
//////////////////////////////////////////////

type BoardProps = {
    current_drop_area_state: Array<number>,
    history: Array<Array<number>>,
    indicators_history: Array<IndicatorHistoryElement>,
    is_drop_area_filled: boolean,
    // @ts-ignore
    game_status: GameStatus,
    game_settings: {
        code_length: number,
        max_attempts: number,
        number_of_colors: number,
    },
    target_code_exists: boolean,
    is_help_shown: boolean,

    path: string,

    addAttemptToHistory: () => void,
    changeHelpVisibility: (new_state: boolean) => void,
    clearAttempt: () => void,
    setDropTargetColor: (drop_target_id: number, color_id: number) => void
};



//////////////////////////////////////////////
//Help.tsx
//////////////////////////////////////////////

type HelpProps = {
    is_help_shown: boolean,
    changeHelpVisibility: (new_state: boolean) => void,
}


//////////////////////////////////////////////
//Fireworks.tsx
//////////////////////////////////////////////

type FireworksProps = {
    game_status: GameStatus
}


//////////////////////////////////////////////
//Status.tsx
//////////////////////////////////////////////

type StatusProps = {
    game_status: GameStatus
}



//////////////////////////////////////////////
//DropArea.tsx
//////////////////////////////////////////////

type DropItemProps = {
    i: number,
    board_ref: React.RefObject<HTMLDivElement>,
};

type DropTargetProps = {
    i: number,
    color_id: number,
    board_ref: React.RefObject<HTMLDivElement>,
    setDropTargetColor: (drop_target_id: number, color_id: number) => void
};


type DropAreaProps = {
    current_drop_area_state: Array<number>,
    game_settings: {
        code_length: number,
        number_of_colors: number,
    },
    board_ref: React.RefObject<HTMLDivElement>,
    is_drop_area_filled: boolean,

    addAttemptToHistory: () => void,
    changeHelpVisibility: (new_state: boolean) => void,
    clearAttempt: () => void,
    setDropTargetColor: (drop_target_id: number, color_id: number) => void
};



//////////////////////////////////////////////
//History.tsx
//////////////////////////////////////////////

type HistoryProps = {
    max_attempts: number,
    code_length: number,
    history: Array<Array<number>>,
    indicators_history: Array<IndicatorHistoryElement>
};




//////////////////////////////////////////////
//GameSettings.tsx
//////////////////////////////////////////////

type GameSettingsProps = {
    path: string,
    handleGameSettingsChange: (e: ChangeEvent) => void,
    startGame: () => void
};
