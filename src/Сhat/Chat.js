import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import './Chat.css';
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import Message from "../Message/Message";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const messagesEndpoint = 'http://146.185.154.90:8000/messages/';

class Chat extends Component {
    state ={
        messages: [],
        currentMsg: '',
        alert: false,
    };
    lastMsgTime = null;

    handleChange = e => {
        this.setState({currentMsg: e.target.value})
    };


    async getMessages () {
        let response;

        this.lastMsgTime ?
            response = await fetch(messagesEndpoint + `?datetime=${this.lastMsgTime}`)
        :
            response = await fetch(messagesEndpoint);


      if(response.ok) {
              const messages = await response.json();
              if (messages.length > 0){
                  this.lastMsgTime = messages[messages.length - 1].datetime;

                  let newMessagesState = [...this.state.messages, ...messages];
                  this.setState({messages: newMessagesState})
              }

      }
    };
    componentDidMount() {
        this.getMessages();
        this.timer = setInterval(()=>this.getMessages(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    async sendMsg (e) {
        e.preventDefault();
        if(this.state.currentMsg.trim()) {
            const data = new URLSearchParams();
            data.set('message', this.state.currentMsg);
            data.set('author', 'Kot');

            const response = await fetch(messagesEndpoint, {
                method: 'post',
                body: data
            });

            if(response.ok) {
                this.setState({currentMsg: '', alert: true})
            }
        }

    };
    render() {
        return (
            <Container maxWidth='sm' className='Chat'>
                {this.state.messages.map(message => {
                    let time = message.datetime;
                    return (
                        <Message
                            key={message._id}
                            msgTxt={message.message}
                            msgAuthor={message.author}
                            time={time.substring(time.indexOf('T') + 1, time.indexOf('.'))}/>
                    )
                })}
                <SendMessageForm
                    onChange={this.handleChange}
                    value={this.state.currentMsg}
                    onSubmit={e => this.sendMsg(e)}/>
                <Snackbar
                    open={this.state.alert}
                    autoHideDuration={2000}
                    onClose={() => {this.setState({alert: false})}}
                >
                    <SnackbarContent style={{
                        backgroundColor:'green',
                    }}
                                     message={<span>Message sent!</span>}
                    />
                </Snackbar>
            </Container>
        );
    }
}

export default Chat;