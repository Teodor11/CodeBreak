//CodeBreak - GameSettings
import "./GameSettings.scss";


function GameSettings(props: GameSettingsProps)
{
    return (<div className="GameSettings">



        <h2>Code Break</h2>
        <h3>Game settings</h3>

        <span className="gameSettingsGroupHeader">Max attempts:</span>
        <div className="gameSettingsGroup">

            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_ma_6" name="max_attempts" value="6"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_ma_6">6</label>
            </div>

            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_ma_8" name="max_attempts" value="8"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_ma_8">8</label>
            </div>

            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_ma_10" name="max_attempts" value="10"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_ma_10">10</label>
            </div>

            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_ma_12" name="max_attempts" value="12"
                    onChange={(e) => props.handleGameSettingsChange(e)} defaultChecked />
                <label htmlFor="gameSettingsInput_ma_12">12</label>
            </div>

            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_ma_14" name="max_attempts" value="14"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_ma_14">14</label>
            </div>

        </div>

        <span className="gameSettingsGroupHeader">Number of colours:</span>
        <div className="gameSettingsGroup">


            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_noc_4" name="number_of_colors" value="4"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_noc_4">4</label>
            </div>
            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_noc_5" name="number_of_colors" value="5"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_noc_5">5</label>
            </div>
            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_noc_6" name="number_of_colors" value="6"
                    onChange={(e) => props.handleGameSettingsChange(e)} defaultChecked />
                <label htmlFor="gameSettingsInput_noc_6">6</label>
            </div>
            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_noc_7" name="number_of_colors" value="7"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_noc_7">7</label>
            </div>
            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_noc_8" name="number_of_colors" value="8"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_noc_8">8</label>
            </div>
        </div>

        <span className="gameSettingsGroupHeader">Code length:</span>
        <div className="gameSettingsGroup">
            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_cl_3" name="code_length" value="3"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_cl_3">3</label>
            </div>

            <div className="gameSettingsOption">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_cl_4" name="code_length" value="4"
                    onChange={(e) => props.handleGameSettingsChange(e)} defaultChecked />
                <label htmlFor="gameSettingsInput_cl_4">4</label>
            </div>

            <div className="gameSettingsOption hiddenOnMobile">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_cl_5" name="code_length" value="5"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_cl_5">5</label>
            </div>

            <div className="gameSettingsOption hiddenOnMobile">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_cl_6" name="code_length" value="6"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_cl_6">6</label>
            </div>

        </div>

        <span className="gameSettingsGroupHeader">Possibility of repeating colours:</span>
        <div className="gameSettingsGroup">
            <div className="gameSettingsOption gameSettingsOptionLarge">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_crcic_true" name="can_repeat_colors_in_code" value="true"
                    onChange={(e) => props.handleGameSettingsChange(e)} />
                <label htmlFor="gameSettingsInput_crcic_true">
                    <span><i className="fas fa-check" /> YES</span>
                </label>
            </div>

            <div className="gameSettingsOption gameSettingsOptionLarge">
                <input type="radio" className="gameSettingsInput" id="gameSettingsInput_crcic_false" name="can_repeat_colors_in_code" value="false"
                    onChange={(e) => props.handleGameSettingsChange(e)} defaultChecked />
                <label htmlFor="gameSettingsInput_crcic_false">
                    <span><i className="fas fa-times" /> NO</span>
                </label>
            </div>

        </div>

        <button id="startGameButton" onClick={() => props.startGame()}>Start <i className="fas fa-angle-double-right"></i></button>

        <footer>
            &copy; 2021 Code Break &ndash; Teodor
        </footer>

    </div>);


}


export default GameSettings;