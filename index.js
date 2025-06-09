const express = require("express");
const { statusTracker } = require("../int2/statusTracker");

const app = express();





app.get("/", (req, res) => {
    statusTracker({
        "device_id": "TRI_92923",
        "timestamp": "2025-06-02T14:22:00Z",
        "power_kw": 4.3,
        "voltage": 229.1
    })
    res.json({ message: "all ok!" });
})


app.listen(4000, () => {
    console.log("server is running on port: 4000");
})


