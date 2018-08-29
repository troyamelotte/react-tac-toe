import React, { Component } from 'react';


class Box extends Component {

    render() {
        return (
            <div onClick={this.props.updateBox} style={{border: '1px solid black', display:'inline-block', width:'50px', height:'50px', verticalAlign:'top'}}>
                {this.props.status}
            </div>
        );
    }
}

export default Box;
