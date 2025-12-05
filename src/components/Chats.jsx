import * as React from 'react';
import { Card, CardContent, Typography, Box, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Chats({ onClose, onOpenChat }) {
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [messagesMap, setMessagesMap] = React.useState({});
  const [inputText, setInputText] = React.useState('');

  // Fake chat list
  const [chats, setChats] = React.useState([
    { name: 'Ahmed', message: 'Hey, how are you?', unread: 2 },
    { name: 'Sara', message: 'Meeting at 3 PM', unread: 0 },
    { name: 'Omar', message: 'Check the report', unread: 1 },
    { name: 'Laila', message: 'Can you send files?', unread: 0 },
    { name: 'Youssef', message: 'Good morning!', unread: 3 },
  ]);

  // Fake messages for all chats
  const defaultMessages = [
    { sender: 'them', text: 'Hi there!' },
    { sender: 'me', text: 'Hello! How are you?' },
    { sender: 'them', text: 'I am good, thanks!' },
    { sender: 'me', text: 'Great to hear 😄' },
  ];

  // Open chat + mark unread = 0
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);

    // Mark unread to 0 inside chat window
    setChats((prev) =>
      prev.map((c) =>
        c.name === chat.name ? { ...c, unread: 0 } : c
      )
    );

    // initialize messages if first time opened
    setMessagesMap((prev) => ({
      ...prev,
      [chat.name]: prev[chat.name] || [...defaultMessages],
    }));
  };

  // Send message
  const handleSend = () => {
    if (!inputText.trim() || !selectedChat) return;

    setMessagesMap((prev) => ({
      ...prev,
      [selectedChat.name]: [
        ...prev[selectedChat.name],
        { sender: 'me', text: inputText },
      ],
    }));

    setInputText('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '70vh',
        bgcolor: '#fff',
        borderRadius: 2,
        p: 2,
        position: 'relative',
      }}
    >
      {/* Close button */}
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>

      {/* Left — Chat List */}
      <Card sx={{ width: '45%', height: '100%', mr: 1 }}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 0,
            overflowY: 'auto',
          }}
        >
          {chats.map((chat, index) => (
            <Box
              key={index}
              onClick={() => {
                onOpenChat(chat.name);   // ⭐ remove from unread in card
                handleSelectChat(chat);  // open chat window
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                bgcolor: chat.unread > 0 ? '#f0f7ff' : '#fff',
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              {/* unread dot */}
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: chat.unread > 0 ? '#3f51b5' : 'transparent',
                  mr: 1.5,
                }}
              />

              {/* name + preview */}
              <Box sx={{ flex: 1, overflow: 'hidden' }}>
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{ fontWeight: chat.unread > 0 ? 'bold' : 'normal' }}
                >
                  {chat.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                  sx={{ fontWeight: chat.unread > 0 ? 'bold' : 'normal' }}
                >
                  {chat.message}
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Right — Chat messages */}
      <Card
        sx={{
          width: '55%',
          height: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >
        {selectedChat ? (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Chat with {selectedChat.name}
            </Typography>

            <Box sx={{ flex: 1, overflowY: 'auto', mb: 1 }}>
              {(messagesMap[selectedChat.name] || []).map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                    bgcolor: msg.sender === 'me' ? '#3f51b5' : '#e0e0e0',
                    color: msg.sender === 'me' ? '#fff' : '#000',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    mb: 1,
                    maxWidth: '70%',
                  }}
                >
                  {msg.text}
                </Box>
              ))}
            </Box>

            {/* Input */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button variant="contained" onClick={handleSend}>
                Send
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body2" sx={{ mt: '50%', textAlign: 'center' }}>
            Select a chat to view messages
          </Typography>
        )}
      </Card>
    </Box>
  );
}
