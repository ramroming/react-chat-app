import MessageForm from './MessageForm'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'

const ChatFeed = (props) => {

    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat] //the specific active chat

    //for the readreceipts
    const renderReadReceipts = (message, isMyMessage) =>  {
        chat.people.map( (person, index) => person.last_read === message.id && (
            <div
            key={`read_${index}`}
             className="read-receipt"
             style={{float: isMyMessage ? 'right' : 'left',
             backgroundImage: `url(${person?.person?.avatar})` }}
            />
        ))
    }
    const renderMessages = () => {
        const keys = Object.keys(messages)

        return keys.map((key, index) => {
            const message = messages[key]
            const lastMessageKey = index === 0 ? null : keys[index - 1] //if there are any messages make sure to find the last one
            const isMyMessage = userName === message.sender.username
            //to know if this message is mine or not

            return (
                <div
                    key={`msg_${index}`}
                    style={{ width: '100%' }}>
                    <div className="message-block">
                        {
                            isMyMessage ? <MyMessage message={message}/> : 
                            <TheirMessage message={message}
                            lastMessage={messages[lastMessageKey]}/>
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                       {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )
        })

    }


    if (!chat) return 'Loading...' //if we use this line we don't have to write chat.?title 

    return (
        <div className='chat-feed'>
            <div className="chat-title-container">
                <div className="chat-title">
                    {chat.title}
                    {/* we can add chat.?title
                    this ? makes sure we have the chat before accessing its title variable*/}
                </div>
                <div className='chat-subtitle'>
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>

            {/* render messages */}

            {renderMessages()}

            <div style={{height:'100px'}}/>

            {/* the form where people can send messages */}
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat}/>
            </div>
        </div>
    )
}


export default ChatFeed