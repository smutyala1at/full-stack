const express = require('express');
const app = express();

const userReqCount = {};
const RATE_LIMIT = 5;        
const TIME_WINDOW = 10000;

function userRateLimiter(req, res, next) {
    const userId = req.headers['user-id'];
    if (!userId) {
        return res.status(400).json({ msg: "User ID header is required" });
    }

    const currentTime = Date.now();
    const userData = userReqCount[userId];

    if (userData) {
        const timePassed = currentTime - userData.timeStamp;

        // Reset if time window has passed
        if (timePassed > TIME_WINDOW) {
            userReqCount[userId] = { timeStamp: currentTime, count: 1 };
        } else if (userData.count >= RATE_LIMIT) {
            const waitTime = ((TIME_WINDOW - timePassed) / 1000).toFixed(1);
            return res.status(429).json({
                msg: `Rate limit exceeded. Please wait ${waitTime} seconds`
            });
        } else {
            userData.count += 1;
        }
    } else {
        // Initialize count for first-time user
        userReqCount[userId] = { timeStamp: currentTime, count: 1 };
    }

    next();
}

// Clean up inactive users every minute to avoid memory leaks
setInterval(() => {
    const currentTime = Date.now();
    for (const userId in userReqCount) {
        if (currentTime - userReqCount[userId].timeStamp > TIME_WINDOW) {
            delete userReqCount[userId];
        }
    }
}, TIME_WINDOW);

app.use(userRateLimiter);

app.get("/", function(req, res) {
    res.json({
        msg: "still allowed to visit"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
