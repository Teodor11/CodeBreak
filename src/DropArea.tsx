//CodeBreak - DropArea

import { navigate } from '@reach/router';
import { useDrag, useDrop } from "react-dnd";
import { DndProvider, Preview, PreviewGeneratorArg } from 'react-dnd-multi-backend';
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import './DropArea.scss';



function generatePreview({ itemType, item, style }: PreviewGeneratorArg): JSX.Element
{
    const classNames = "DropItem DropItemPreview codeColor" + (item.i).toString();
    return <div className={classNames} style={style}>{item.i}</div>
}


function DropItem(props: DropItemProps): JSX.Element
{
    const [{ opacity }, dragRef] = useDrag(
        () =>
        {
            return {
                type: "DropItem",
                item: () =>
                {
                    console.log("drop start");
                    if (props.board_ref.current)
                    {
                        props.board_ref.current.classList.add("dragInProgress");
                    }

                    return { i: props.i };
                },
                collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.6 : 1 }),
                end: (item, monitor) =>
                {
                    console.log("drop end");
                    if (props.board_ref.current)
                    {
                        props.board_ref.current.classList.remove("dragInProgress");
                    }
                }

            }
        },

        [props.i, "some value"]);


    const classNames = `DropItem codeColor${props.i}`;

    const dropItemStyle = {
        opacity: opacity
    }

    return (<div ref={dragRef} style={dropItemStyle}  /* onDragStart={e => handleDragStart(e)} */
        id={"dropItem" + props.i} className={classNames}>
        {props.i}</div>);
}


function DropTarget(props: DropTargetProps): JSX.Element
{

    const [{ canDrop, isOver, item }, dropRef] = useDrop({
        accept: 'DropItem',
        drop: (item: any /*props, monitor */) =>
        {

            props.setDropTargetColor(props.i, item.i);
        },
        collect: (monitor) => 
        {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                item: monitor.getItem()
            }
        },
    });

    let classNames = "DropTargetColorDisplay";
    if (props.color_id) { classNames += ` codeColor${props.color_id}`; }
    else { classNames += " noColor"; }

    if (isOver) { classNames += " DropTargetHover"; }

    //remove color after click on DropTarget
    return (<div className="DropTarget" ref={dropRef}>
        <div className={classNames}></div>
    </div>);

}



function DropArea(props: DropAreaProps): JSX.Element
{

    let dropTargetsCode: Array<JSX.Element> = [];

    for (let i = 0; i < props.game_settings.code_length; i++)
    {
        dropTargetsCode.push(<DropTarget key={i} i={i} color_id={props.current_drop_area_state[i]}
            board_ref={props.board_ref}
            setDropTargetColor={props.setDropTargetColor} />);
    }


    let dropItemsCode = [];

    for (let i = 1; i <= props.game_settings.number_of_colors; i++)
    {
        dropItemsCode.push(<DropItem key={i} i={i} board_ref={props.board_ref} />);
    }


    let dropItemsClassNames = "dropItems";
    if (props.game_settings.number_of_colors >= 7) { dropItemsClassNames += " dropItems4Columns"; }

    return (<div className="DropArea">
        <DndProvider options={HTML5toTouch}>

            <Preview generator={generatePreview} />

            <div className="dropTargets">
                <p>Drag and drop colors here:</p>
                <div className="dropTargetsGroup">
                    {dropTargetsCode}
                    <div className="clearAttempt">
                        <button onClick={() => props.clearAttempt()} title="Clear an attempt"><i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>

            </div>

            <div className={dropItemsClassNames}>
                {dropItemsCode}
            </div>
        </DndProvider>
        <div className="addAttempt">
            <button disabled={!props.is_drop_area_filled} onClick={() => props.addAttemptToHistory()} title="Add an attempt"><i className="fas fa-plus"></i></button>
        </div>



        <div className="restartGame">
            <button onClick={() => navigate("/")} title="Start a new game"> <i className="fas fa-home"></i></button>
        </div>

        <div className="showHelp">
            <button onClick={() => props.changeHelpVisibility(true)} title="Show help"> <i className="fas fa-question"></i></button>
        </div>


    </div>

    );
}



export default DropArea;