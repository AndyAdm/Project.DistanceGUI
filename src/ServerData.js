import _ from "lodash";
import { ref } from "vue";

export var ServerData = ref({
    hostname: "distwater",
    watchdog: {
        activated: true,
        checkInterval: 30,
        maxFailedAttempts: 10,
    },

    mqtt_server: {
        activated: true,
        server: "192.168.100.30",
        port: "1854",
        username: "mqtt_user",
        password: "mqtt_password",
        path_root: "ajrelaiserver",
        use_credentials: true,
    },
    distmeter: {
        activated: false,
        interval: 10,
        delayL2H: 0,
        delayH2L: 0,
        delayEcho: 0,
        triggerPin: 0,
        echoPin: 0,
    },
    sleeper: {
        gotosleep: 0,
        sleeptime: 0,
        activated: false,
    }

});

export var ServerStatus = ref({
    uptime: 10,
    started: "2023-11-17T13:49:51.141Z",
    ip: "192.168.50.12",
    hostname: "rslivingroom",
    freeheap: 0,
    operations: {
        restart: true,
        resetWifi: true,
        resetFactory: true
    },
    sleeper: {
        nextasleep: 0,
        sleeptime: 0,
        nextasleeptime: "2023-11-17T13:49:51.141Z",
        nextawaketime: "2023-11-17T13:49:51.141Z",
        activated: false,
    },
    watchdog: {
        lastcheck: "2024-02-10T13:49:51.141Z",
        lastexecuted: "2024-01-05T18:00:51.141Z",
    },
    mqtt_server: {
        activated: true,
        connected: false,
        lastcommunication: "2024-02-10T13:49:51.141Z",
        server: "192.168.50.12",
    },
    distmeter: {
        lastdistance: 0,
        activated: false,
        interval: 10,
        lastmeasurement: "2024-02-10T13:49:51.141Z",

    }

});

