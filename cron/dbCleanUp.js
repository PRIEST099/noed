const cron = require('node-cron');
const Client = require('../models/client');

// Run every 30 seconds to clean up unconfirmed applications older than 30 seconds
cron.schedule('*/30 * * * * *', async () => {
    const thirtySecondsAgo = new Date();
    thirtySecondsAgo.setSeconds(thirtySecondsAgo.getSeconds() - 30); // Subtract 30 seconds for testing

    try {
        // Find and delete unconfirmed applications older than 30 seconds
        const result = await Client.deleteMany({
            confirmed: false,
            createdAt: { $lt: thirtySecondsAgo },
        });

        console.log(`${result.deletedCount} unconfirmed applications deleted.`);
    } catch (error) {
        console.error('Error during expired application cleanup:', error);
    }
});
