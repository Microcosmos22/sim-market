import { Card, CardContent, CardHeader, Button, TextField, Tabs, Tab, Box, Typography } from '@mui/material';
import { useState } from 'react';

export default function TraderSimulation() {
    const [activeTab, setActiveTab] = useState("strategy");

    return (
        <Box sx={{ display: 'flex', height: '100vh', p: 0, backgroundColor: 'bg-gray-800' }}>
            {/* Left Panel */}
            <Card sx={{ width: '16.66%', backgroundColor: 'bg-gray-800' }}>
                <CardContent sx={{ p: 1 }}>
                    <Tabs
                        value={activeTab}
                        onChange={(event, newValue) => setActiveTab(newValue)}
                        variant="fullWidth"
                        textColor="inherit"
                        sx={{ fontSize: '0.75rem' }}
                    >
                        <Tab label="Trader Strategy" value="strategy" />
                        <Tab label="Machines" value="machines" />
                    </Tabs>

                    {activeTab === "strategy" && (
                        <Box sx={{ mt: 2 }}>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="body2">Budget</Typography>
                                <input type="number" placeholder="Interval Length"
                                className="bg-gray-800 border-gray-400 p-1 rounded text-xs" />

                            </Box>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="body2">Stiffness</Typography>

                                <input type="number" placeholder="Interval Length"
                                className="bg-gray-800 border-gray-400 p-1 rounded text-xs" />
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Center Panel */}
            <Card sx={{ width: '66.66%', mx: 2, backgroundColor: '#1f1f1f' }}>
                <CardHeader title="Trader Simulation" sx={{ textAlign: 'center', paddingBottom: 0 }} />
                <CardContent sx={{ p: 1 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                        <TextField
                            type="date"
                            variant="outlined"
                            label="Ending Date"
                            sx={{ fontSize: '0.75rem' }}
                        />
                        <TextField
                            type="number"
                            variant="outlined"
                            label="Candles Amount"
                            sx={{ fontSize: '0.75rem' }}
                        />
                    </Box>

                    <Button
                        variant="outlined"
                        sx={{ mb: 2, fontSize: '0.75rem', textTransform: 'none' }}
                    >
                        Select
                    </Button>

                    <Box
                        sx={{
                            backgroundColor: '#1f1f1f',
                            color: 'white',
                            p: 1,
                            mb: 2,
                            borderRadius: 1,
                            fontSize: '0.75rem'
                        }}
                    >
                        Simulation result will appear here.
                    </Box>

                    <button className="bg-yellow-500  p-3 rounded text-xs">Simulate</button>

                    <Box
                        sx={{
                            backgroundColor: '#1f1f1f',
                            p: 2,
                            borderRadius: 1,
                            height: '240px',
                            overflowY: 'auto',
                            color: 'white'
                        }}
                    >
                        Plots area
                    </Box>
                </CardContent>
            </Card>

            {/* Right Panel */}
            <Card sx={{ width: '16.66%', backgroundColor: '#1f1f1f' }}>
                <CardContent sx={{ p: 2 }}>
                    {/* Placeholder for right panel content */}
                </CardContent>
            </Card>
        </Box>
    );
}
