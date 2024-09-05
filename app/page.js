'use client';

import { Box, Button, Stack, TextField } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

// Define custom colors
const customColors = {
  background: '#f0f4f8',  // Light background
  primary: '#00796b',     // Teal color for primary elements
  secondary: '#c2185b',   // Pink color for secondary elements
  textPrimary: '#333333', // Dark text color
  textSecondary: '#ffffff' // Light text color
};

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your Weather Bot. How can I assist you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: message }),
      });

      if (!response.ok) {
        console.error('Network response was not ok:', response.statusText);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const assistantMessage = data.message;
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: assistantMessage },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        {
          role: 'assistant',
          content: "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor={customColors.background} // Set background color
    >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border={`1px solid ${customColors.primary}`} // Border color
        bgcolor="#ffffff" // White background for chat box
        p={2}
        spacing={3}
        borderRadius={2} // Rounded corners
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant' ? customColors.primary : customColors.secondary
                }
                color={customColors.textSecondary}
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Enter City"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            variant="outlined"
            InputLabelProps={{ style: { color: customColors.primary } }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
            style={{ backgroundColor: customColors.primary, color: customColors.textSecondary }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
