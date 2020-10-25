// Main File for generating random movable box

import React from 'react';
import "./style.css";

// Define constants to specify inputs
const BOX_WIDTH = 10;
const BOX_HEIGHT = 15;
const BOX_POSITION = "absolute";
const ID_MIN_VALUE = 0;
const ID_MAX_VALUE = 20000;
const MAX_TOP_RANGE = 48;
const MAX_LEFT_RANGE = 80;
const MIN_TOP_RANGE = 0;
const MIN_LEFT_RANGE = 10;
const COLOR_DEFAULT = 16777215;
const STEPS_VERTICAL = 10;
const STEPS_HORIZONTAL = 10;

class BoxGenerator extends React.Component {
    constructor(props) {
        super()
        this.state = {
            boxList : [],
            selBox : null,
        }
        this.handleAddBox = this.handleAddBox.bind(this);
    }

    // Function to add new box in the list
    handleAddBox() {
        let boxList = this.state.boxList;
        let newBox = {
            id : Math.floor(Math.random() * (ID_MAX_VALUE - ID_MIN_VALUE) + ID_MAX_VALUE),
            top: Math.floor(Math.random() * (MAX_TOP_RANGE - MIN_TOP_RANGE) + MIN_TOP_RANGE),
            left : Math.floor(Math.random() * (MAX_LEFT_RANGE - MIN_LEFT_RANGE) + MIN_LEFT_RANGE),
            color :`#` + Math.floor(Math.random() * COLOR_DEFAULT).toString(16),
            width : `${BOX_WIDTH}%`,
            height : `${BOX_HEIGHT}%`,
            position : BOX_POSITION
        };
        boxList.push(newBox);
        this.setState({boxList})
    }

    // function to add styling in the box
    styleBox = (boxValue) => {
        return {
            position: boxValue.position, 
            zIndex : boxValue.id, 
            top: `${boxValue.top}%`, 
            left: `${boxValue.left}%`,
            backgroundColor : boxValue.color ? boxValue.color : "#d4e7f4",
            width : boxValue.width,
            height: boxValue.height,
            boxSizing : "border-box",
            border : this.state.selBox ? this.state.selBox.id === boxValue.id ? "4px solid #a1a3a6" : undefined : undefined,
            outline : "none",
            borderRadius : "4px",
            cursor : "pointer" 
        }
    }

    // Function to specific movements of the boxes
    onKeyPressed = (event, index) => {
        let boxList = this.state.boxList;
        if(event.key === "w" || event.key === "ArrowUp") {
            if(boxList[index].top >= MIN_TOP_RANGE + STEPS_VERTICAL) {
                boxList[index].top -= STEPS_VERTICAL;
                this.setState({boxList})
            }
            else if(boxList[index].top > MIN_TOP_RANGE && boxList[index].top - MIN_TOP_RANGE <= STEPS_VERTICAL) {
                boxList[index].top = MIN_TOP_RANGE;
                this.setState({boxList})
            }
        }
        if(event.key === "a" || event.key === "ArrowLeft") {
            if(boxList[index].left > MIN_LEFT_RANGE + STEPS_HORIZONTAL) {
                boxList[index].left -= STEPS_HORIZONTAL;
                this.setState({boxList})
            }
            else if(boxList[index].left > MIN_LEFT_RANGE && boxList[index].left - MIN_LEFT_RANGE <= STEPS_HORIZONTAL) {
                boxList[index].left = MIN_LEFT_RANGE;
                this.setState({boxList})
            }
        }
        if(event.key === "s" || event.key === "ArrowDown") {
            if(boxList[index].top < MAX_TOP_RANGE - STEPS_VERTICAL) {
                boxList[index].top += STEPS_VERTICAL;
                this.setState({boxList})
            }
            else if(boxList[index].top < MAX_TOP_RANGE && MAX_TOP_RANGE - boxList[index].top <= STEPS_VERTICAL) {
                boxList[index].top = MAX_TOP_RANGE;
                this.setState({boxList})
            }
            
        }
        if(event.key === "d" || event.key === "ArrowRight") {
            if(boxList[index].left < MAX_LEFT_RANGE - STEPS_HORIZONTAL) {
                boxList[index].left += STEPS_HORIZONTAL;
                this.setState({boxList})
            }
            else if(boxList[index].left < MAX_LEFT_RANGE && MAX_LEFT_RANGE - boxList[index].left <= STEPS_HORIZONTAL) {
                boxList[index].left = MAX_LEFT_RANGE;
                this.setState({boxList})
            }
        }
        if(event.key === "Delete") {
            boxList.splice(index, 1);
            this.setState({boxList})
        }
    }

    render() {
        return (
            <div>
                <div className = "buttonContainer">
                    <button 
                      className = "addButton"
                      onClick = {this.handleAddBox}
                    >
                        Add Box
                    </button>
                </div>
                <div className = "boxMain">
                    <div className = "boxContainer" >
                        {this.state.boxList.length > 0 ?
                            this.state.boxList.map((val, ind) => {
                                return (
                                    <div 
                                    key = {val.id}
                                    className = {`box${val.id}`}
                                    style={this.styleBox(val)}
                                    onKeyDown={
                                        (event) => 
                                        this.onKeyPressed(event, ind)
                                    }
                                    tabIndex="0"
                                    onClick= {() => this.setState({selBox : val})}
                                    >
                                        <p className = "caption">
                                            {val.id}
                                        </p>
                                    </div>
                                )
                            })
                        :null}
                    </div>
                </div>
            </div>
        )
    }
}

export default BoxGenerator;