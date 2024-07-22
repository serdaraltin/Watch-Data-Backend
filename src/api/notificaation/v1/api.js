const amqplib = require('amqplib');
const express = require('express');
const router = express.Router();

// if there is something in queue that means there is a file to downloaad
router.get('/api/v1/checkexportqueue', async (req, res) => {
    const connection = await amqplib.connect('amqp://localhost:5672');
    try{
    
        const channel = await connection.createChannel();
        const assertQueue = await channel.assertQueue("report", { durable: true });
        const messageCount = assertQueue.messageCount;
        if(messageCount != 0){
        for (let i = 0; i < messageCount; i++) {
        const message = await channel.get("report");
        if (message) {
            // Process the message
            console.log('Message:', message.content.toString());
            // Acknowledge the message
            channel.ack(message);
        }
    
        }
        console.log('Queue emptied');
        return res.status(200).json({success: true , error: false, queueCounter:  messageCount});
    }
    // Check spesific message in queue


    else if(messageCount === 0 ){
        
        return res.status(200).json({success: true , error: false, queueCounter:  0});

    }
    } catch (error) {
    
    } finally {
        setTimeout(() => {
        connection.close();
        
        }, 500);
    }
});

/* notification insert, update, read, delete */
router.get('/api/v1/notification', async (req, res) => {
    const notifications = await prisma.notification.findMany();

})
router.get('/api/v1/notification:id', async (req, res) => {
    const notification = await prisma.notification.findOne({
        where: {
          id: req.params.id.split(":")[i], // Replace with the actual ID
        },
      });
})
router.put('/api/v1/notification', async (req, res) => {
    // Update a notification
    const updatedNotification = await prisma.notification.update({
        where: {
            id: req.paramsi.d.split(":")[1], // Replace with the actual ID
        },
        data: {
            isSeen: true, // Update the notification properties as needed
        },
    });
})
router.delete('/api/v1/notification:id', async (req, res) => {
    const deletedNotification = await prisma.notification.delete({
        where: {
          id: 1, // Replace with the actual ID
        },
    });
})







module.exports = router;


