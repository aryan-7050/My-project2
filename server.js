const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const pollData = {
    question: "voting for the student class representitive",
    options: [
        { id: 0, text: "Aryan" },
        { id: 1, text: "Ayush" },
        { id: 2, text: "prathmesh" },
        { id: 3, text: "kunal" }
    ],
    votes: {
        0: 0,
        1: 0,
        2: 0,
        3: 0
    }
};

wss.on('connection', ws => {
    console.log('Client connected');
    
    ws.send(JSON.stringify({ type: 'initial_data', pollData }));

    ws.on('message', message => {
        const data = JSON.parse(message);
        if (data.type === 'vote') {
            const optionIndex = parseInt(data.optionIndex);
            if (pollData.votes[optionIndex] !== undefined) {
                pollData.votes[optionIndex]++;
                
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'vote_update', pollData }));
                    }
                });
                console.log(`Vote cast for option ${optionIndex}. Current votes:`, pollData.votes);
            }
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', error => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server started on ws://localhost:8080');
