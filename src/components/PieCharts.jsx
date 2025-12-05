import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { PieChart } from '@mui/x-charts/PieChart';
import Chats from './Chats';

export default function SelectActionCard() {
  const [showChats, setShowChats] = React.useState(false);

  const [dashboardData, setDashboardData] = React.useState({
    bestDriver: {
      name: 'Ahmed Ali',
      trips: 120,
      revenue: 3500,
      accidents: 0,
    },
    messages: {
      unread: 3,
      total: 20,
      unreadMessages: [
        { sender: 'Ahmed', text: 'Hey, how are you?' },
        { sender: 'Sara', text: 'Please check the schedule.' },
        { sender: 'Ali', text: 'Bus 12 is delayed.' },
      ],
    },
    vehicleStatus: [
      { id: 0, value: 10, label: "On Duty", color: "#516E89" },
      { id: 1, value: 25, label: "Available", color: "#6A89A7" },
      { id: 2, value: 5, label: "Maintenance", color: "#8CA4BB" },
    ]
  });

  const handleOpenChats = () => setShowChats(true);
  const handleCloseChats = () => setShowChats(false);

  // ---------------------------
  // REMOVE ONE SPECIFIC UNREAD
  // ---------------------------
  const handleOpenSpecificChat = (senderName) => {
    setDashboardData((prev) => {
      const filtered = prev.messages.unreadMessages.filter(
        (msg) => msg.sender !== senderName
      );

      return {
        ...prev,
        messages: {
          ...prev.messages,
          unreadMessages: filtered,
          unread: filtered.length,
        },
      };
    });
  };

  const titleSX = {
    fontWeight: 600,
    fontSize: '18px',
    width: '100%',
    textAlign: 'left',
    mb: 1,
  };

  const cardContentSX = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    p: 2,
    boxSizing: 'border-box',
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      {/* 1st Card - Unread Chats */}
      <Card sx={{ width: 260, height: 250, borderRadius: 2 }}>
        <CardActionArea onClick={handleOpenChats} sx={{ height: '100%' }}>
          <CardContent sx={cardContentSX}>
            <Typography variant="h6" sx={titleSX}>Unread Messages</Typography>

            {dashboardData.messages.unreadMessages.length > 0 ? (
              <Box sx={{ width: '100%', overflowY: 'auto', maxHeight: 170 }}>
                {dashboardData.messages.unreadMessages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: '#e3f2fd',
                      p: 1,
                      borderRadius: 1,
                      mb: 0.5,
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="body2">
                      <strong>{msg.sender}</strong>: {msg.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2">No unread messages</Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>

      {/* 2nd Card - Vehicle Status */}
      <Card sx={{ width: 260, height: 250, borderRadius: 2 }}>
        <CardActionArea sx={{ height: '100%' }}>
          <CardContent sx={cardContentSX}>
            <Typography variant="h6" sx={titleSX}>Vehicle Status</Typography>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
              <PieChart
                series={[
                  {
                    data: dashboardData.vehicleStatus,
                    innerRadius: 20,
                    outerRadius: 60,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 20, additionalRadius: -10, color: "#e5e7eb" },
                  },
                ]}
                width={130}
                height={130}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* 3rd Card - Best Driver */}
      <Card sx={{ width: 260, height: 250, borderRadius: 2 }}>
        <CardActionArea sx={{ height: '100%' }}>
          <CardContent sx={cardContentSX}>
            <Typography variant="h6" sx={titleSX}>Top Performer</Typography>

            <Box sx={{ textAlign: 'left', width: '100%', mt: 0.5 }}>
              <Typography variant="body2" mb={2}>Name: {dashboardData.bestDriver.name}</Typography>
              <Typography variant="body2" mb={2}>Trips: {dashboardData.bestDriver.trips}</Typography>
              <Typography variant="body2" mb={2}>Revenue: {dashboardData.bestDriver.revenue} EGP</Typography>
              <Typography variant="body2">Accidents: {dashboardData.bestDriver.accidents}</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Chat Overlay */}
      {showChats && (
        <Box
          sx={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1500,
          }}
        >
          <Chats
            onClose={handleCloseChats}
            onOpenChat={handleOpenSpecificChat}  // ⭐ أهم سطر
          />
        </Box>
      )}
    </Box>
  );
}
