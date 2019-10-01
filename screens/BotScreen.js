import React, { Component } from 'react';
import { View} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {  ApiAiClient } from 'api-ai-javascript';


const client = new ApiAiClient({accessToken: 'ce6c08bbd4db4868ab60df5b49ee3f02'});

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://i.imgur.com/7k12EPD.png'
};
export default class BotScreen extends Component {
  

  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am the FAQ bot from TL team.\n\nHow may I help you with today?`,
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };


  async onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    //const response = await client.textRequest(messages[0].text);
    let res = await client.textRequest(message);
    this.sendBotResponse(res.result.fulfillment.speech);
    //   message,
    //   result => this.handleGoogleResponse(result),
    //   error => console.log('error'+error)
    // );
  }
  

  handleGoogleResponse(result) {
    console.log('res');
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
}

sendBotResponse(text) {
  let msg = {
    _id: this.state.messages.length + 1,
    text,
    createdAt: new Date(),
    user: BOT_USER
  };

  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, [msg])
  }));
}



  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
    );
  }
}

