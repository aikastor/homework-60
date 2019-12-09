import React, {Component} from 'react';
import Chip from "@material-ui/core/Chip";

class Message extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.time !== nextProps.time ||
                this.props.msgAuthor !== nextProps.msgAuthor ||
                this.props.msgTxt !== nextProps.msgTxt;
    }
    render() {
        return (
            <div className='Message'>
                <Chip label={this.props.time}
                      size='small'
                        color='primary'/>
                <b>  {this.props.msgAuthor}</b>: <span>{this.props.msgTxt}</span>
            </div>
        );
    }
}

export default Message;