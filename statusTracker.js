// {
// "device_id": "TRI_92923",
// "timestamp": "2025-06-02T14:05:00Z",
// "power_kw": 4.3,
// "voltage": 229.1
// }

const { quarantineQueue } = require("../int2/queue");

{
    device_id: {
        timestamp: []

    }
}

const newId = false;

const devices = [
    // {
    //     device_id: [
    //         "timestamp1", "timestamp2", "timestamp3",
    //     ]
    // }
    { TRI_92923: ['2025-06-02T14:05:00Z', '2025-06-02T14:20:00Z'] },
]

const statusTracker = (payload) => {
    const { device_id, timestamp, power, voltage } = payload;
    console.log("devices: ", devices);
    if (devices.length < 1) {
        console.log("here!!")
        devices.push({});
        devices[0][device_id] = [];
        devices[0][device_id].push(timestamp);
    }

    devices.forEach((device) => {
        const [id] = Object.keys(device);


        if (id === device_id) {

            for (const stamp of device[id]) {
                if (stamp != timestamp) {
                    device[id].push(timestamp);
                }
            }
            console.log(device[id]);
            const timestamps = device[id];
            const date = new Date(timestamps[timestamps.length - 1])
            console.log("inside if: ", date);
            const lastTimeStamp = date.getMinutes();
            console.log(lastTimeStamp);
            const nowDate = new Date();
            const currMin = nowDate.getMinutes()
            console.log("currMin: ", currMin);
            if ((currMin - lastTimeStamp) > 5) {
                quarantineQueue.push(device_id);
            }

        } else {
            newId = true;
        }

        if (newId) {
            console.log("adding new device!")
            devices.push({});
            devices[devices.length - 1][device_id] = []
            devices[devices.length - 1][device_id].push(timestamp);
        }
    });
    console.log(devices);
    console.log(quarantineQueue);
    // devices.forEach((device) => {
    //     if (!device[device_id]) {
    //         devices.push({})
    //     }
    //     if (device[device_id] === device_id) {
    //         device[device_id].push(timestamp);
    //     }
    //     device[device_id] = device[device_id].push(timestamp);
    // })
    // devices.forEach((device) => {
    //     if (device[device_id]) {
    // const date = new Date(device[device_id][device_id.length - 1])
    // const lastTimeStamp = date.getMinutes();
    //         console.log("lastTimeStamp: ", lastTimeStamp);
    //         const nowDate = new Date();
    //         console.log("nowDate: ", nowDate.getMinutes());
    //     }
    //     // if (!device[device_id]) {
    //     //     device[device_id] = [];
    //     // }
    // })


    // if (!devices[device_id]) {
    //     devices[device_id] = {};
    // }
    // if (!devices[device_id][timestamp]) {
    //     devices[device_id][timestamp] = [];
    // }
    // const timezoneOffset = 0;
    // const date = new Date(timestamp);
    // date.setMinutes(0, 0, 0);

    // const minKey = date.toISOString;

    // Convert to local timezone (if needed)
    // date.setMinutes(date.getMinutes() + timezoneOffset);

    // const entryDate = date.toISOString().split("T")[0];
    // console.log(entryDate);
    // console.log(date.getMinutes());

    // quarantineQueue
}


module.exports = {
    statusTracker
}