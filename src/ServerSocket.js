
// Importiere die Konfigurationsdatei basierend auf der Umgebung
// ServerSocket.js
import { ServerData, ServerStatus } from '@/ServerData.js';
import _ from 'lodash';
import { ref } from 'vue';



export var isWebSocketConnected = ref(false);
const app = window.app;



function getWebSocketUrl() {
    const url = process.env.websocketUrl;
    const result = url;
    if (url === 'none') {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        return `${protocol}//${window.location.hostname}/ws`;
    }
    console.log('getWebSocketUrl()');
    console.log(result);
    return result;
}



//const ws = new WebSocket(process.env.websocketUrl);
let ws = new WebSocket(getWebSocketUrl());

function waitForWebSocketOpen(callback, timeout) {
    var startTime = Date.now();

    function check() {
        if (ws.readyState === WebSocket.OPEN) {
            callback(true);
        } else if (Date.now() - startTime >= timeout) {
            callback(false);
        } else {
            setTimeout(check, 100); // Überprüfen Sie alle 100 ms erneut
        }
    }

    check();
}


function checkConnection() {
    if ((!isWebSocketConnected) || (ws.readyState !== WebSocket.OPEN)) {
        ws = new WebSocket(getWebSocketUrl());

        waitForWebSocketOpen(function (isOpen) {
            if (!isOpen) {
                // WebSocket wurde nach 2 Sekunden nicht geöffnet
                console.log("WebSocket konnte nicht geöffnet werden.");
            } else {
                // WebSocket ist geöffnet
                console.log("WebSocket ist jetzt geöffnet.");
            }
        }, 2000); // Timeout von 2 Sekunden

    }
}

ws.doConnect = () => {
    console.log('doConnect');
};


function doDisconnect() {
    console.log('doDisconnect');
    ws.close();
};

function doReconnect() {
    console.log('doReconnect');

};

ws.onopen = () => {
    console.log('WebSocket connection established');
    isWebSocketConnected.value = true;
    console.log('onopen() called. ', isWebSocketConnected);
    doGetStatus();
    doGetConfig();
};

ws.close = () => {
    console.log('WebSocket connection closed');
    isWebSocketConnected.value = false;
};

function mergeObjects(objA, objB) {
    for (var key in objB) {
        if (objB.hasOwnProperty(key)) {
            if (typeof objB[key] === 'object' && objB[key] !== null && !Array.isArray(objB[key])) {
                // Wenn das Eigenschaftswert ein Objekt ist, rufe die Funktion rekursiv auf
                objA[key] = mergeObjects(objA[key] || {}, objB[key]);
            } else {
                // Andernfalls aktualisiere den Wert
                objA[key] = objB[key];
            }
        }
    }
    return objA;
}

ws.onmessage = (event) => {
    const receivedData = JSON.parse(event.data);
    console.log('onmessage() called. Topic:', receivedData.topic);
    // Hier die empfangenen Daten verarbeiten und ServerData aktualisieren
    // Überprüfen, ob die Nachricht ein bestimmtes Topic hat
    if (receivedData.topic === 'status') {
        console.log('onmessage() get status');
        // Extrahiere die Daten aus dem Nachrichtenobjekt
        const data = receivedData.data;

        ServerStatus.value = _.cloneDeep(data);
    }

    if (receivedData.topic === 'statusupdate') {
        console.log('onmessage() get statusupdate');
        // Extrahiere die Daten aus dem Nachrichtenobjekt
        const data = receivedData.data;
        mergeObjects(ServerStatus.value, data);
    }

    if (receivedData.topic === 'config') {
        console.log('onmessage() get config');
        // Extrahiere die Daten aus dem Nachrichtenobjekt
        const data = receivedData.data;
        ServerData.value = _.cloneDeep(data);
    }

};


// Funktion zum Senden von Daten über Websockets
function sendData(data) {
    checkConnection();
    ws.send(JSON.stringify(data));
    console.log('sendData() called : ', data.command);
}



function sendConfig(data) {
    const sendDataValue = {
        command: 'updateConfig',
        data: ServerData,
    };
    sendData(sendDataValue);
}

function doRestart() {
    const sendDataValue = {
        command: 'doRestart',
        data: {},
    };
    sendData(sendDataValue);
}


function doResetWifi() {
    const sendDataValue = {
        command: 'doResetWifi',
        data: {},
    };
    sendData(sendDataValue);
}


function doResetFactory() {
    const sendDataValue = {
        command: 'doResetFactory',
        data: {},
    };
    sendData(sendDataValue);
}


function doGetStatus() {
    const sendDataValue = {
        command: 'doGetStatus',
        data: {},
    };
    sendData(sendDataValue);
}
function doGetConfig() {
    const sendDataValue = {
        command: 'doGetConfig',
        data: {},
    };
    sendData(sendDataValue);
}

function doSetConfig() {
    const data = _.cloneDeep(ServerData.value);
    const sendDataValue = {
        command: 'doSetConfig',
        data: data,
    };
    sendData(sendDataValue);
}

function doRelaisSwitchOff(relaisID) {
    const sendDataValue = {
        command: 'doSwitchOff',
        data: { relaisID: relaisID },
    };
    sendData(sendDataValue);
}

function doRelaisSwitchON(relaisID) {
    const sendDataValue = {
        command: 'doSwitchOn',
        data: { relaisID: relaisID },
    };
    sendData(sendDataValue);
}

function doRelaisSwitchONTemporary(relaisID) {
    const sendDataValue = {
        command: 'doSwitchOnTemporary',
        data: { relaisID: relaisID },
    };
    sendData(sendDataValue);
}

export { sendConfig, doDisconnect, doReconnect, doRestart, doRelaisSwitchOff, doRelaisSwitchON, doRelaisSwitchONTemporary, doGetStatus, doGetConfig, doSetConfig, doResetFactory, doResetWifi };
