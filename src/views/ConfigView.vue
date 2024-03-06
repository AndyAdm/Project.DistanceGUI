<template>
    <v-form @submit.prevent="submitForm">
        <v-card :append-icon="isConnected ? 'mdi-server' : 'mdi-server-off'" max-width="600">
            <template v-slot:title>Server configuration</template>
            <template v-slot:text>
                <v-sheet class="mx-auto">
                    <v-row>
                        <v-col sm="6">
                            <v-text-field variant="underlined" v-model="serverdata.system.hostname" label="Hostname"
                                hint="Server host name for the local network"></v-text-field>
                        </v-col>
                        <v-col sm="6">
                            <v-text-field v-model="serverdata.system.timeBeforeIdle"
                                label="Time before idle (s)"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="6"> <v-label>Distance meter options</v-label></v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="6">
                            <v-switch v-model="serverdata.distmeter.activated" :label="serverdata.distmeter.activated ? 'Activated' : 'Deactivated'
                                " :color="serverdata.distmeter.activated ? 'primary' : 'default'">
                            </v-switch>
                        </v-col>
                        <v-col sm="3">
                            <v-text-field v-model="serverdata.distmeter.interval" label="Interval (s)"></v-text-field>
                        </v-col>
                        <v-col sm="3">
                            <v-text-field v-model="serverdata.distmeter.canSleepCounter" label="Sleep after #"
                                :hint="`# of same distances before sleep (0=inactiv)`"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col sm="6">
                            <v-text-field v-model="serverdata.distmeter.triggerPin" label="Trigger Pin"></v-text-field>
                        </v-col>
                        <v-col sm="6">
                            <v-text-field v-model="serverdata.distmeter.echoPin" label="Echo Pin"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col sm="4">
                            <v-text-field v-model="serverdata.distmeter.delayL2H" label="Delay L2H"></v-text-field>
                        </v-col>
                        <v-col sm="4">
                            <v-text-field v-model="serverdata.distmeter.delayH2L" label="Delay H2L"></v-text-field>
                        </v-col>
                        <v-col sm="4">
                            <v-text-field v-model="serverdata.distmeter.delayEcho" label="Delay Echo"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col sm="6"> <v-label>Deep sleep options</v-label></v-col>
                        <v-col sm="6">
                            <v-switch v-model="serverdata.sleeper.activated" :label="serverdata.sleeper.activated ? 'Activated' : 'Deactivated'
                                " :color="serverdata.sleeper.activated ? 'primary' : 'default'">
                            </v-switch> </v-col></v-row>
                    <v-row>
                        <v-col sm="6">
                            <v-text-field v-model="serverdata.sleeper.gotosleep"
                                label="Auto sleep after (s)"></v-text-field>
                        </v-col>
                        <v-col sm="6">
                            <v-text-field v-model="serverdata.sleeper.sleeptime"
                                label="Sleep time (s)"></v-text-field></v-col>
                    </v-row>

                    <v-row>
                        <v-col sm="6"> <v-label>Watchdog options</v-label></v-col>
                        <v-col sm="6">
                            <v-switch v-model="serverdata.watchdog.activated" :label="serverdata.watchdog.activated ? 'Activated' : 'Deactivated'
                                " :color="serverdata.watchdog.activated ? 'primary' : 'default'">
                            </v-switch> </v-col></v-row>
                    <v-row>
                        <v-col sm="6">
                            <v-text-field v-model="serverdata.watchdog.checkInterval" label="Interval (s)"></v-text-field>
                        </v-col>
                        <v-col sm="6">
                            <v-text-field v-model="serverdata.watchdog.maxFailedAttempts"
                                label="Restart after # of attemps"></v-text-field></v-col>
                    </v-row>

                    <v-row>
                        <v-col sm="6"> <v-label>Mqtt</v-label></v-col>
                        <v-col sm="6">
                            <v-switch v-model="serverdata.mqtt_server.activated" :label="serverdata.mqtt_server.activated ? 'Activated' : 'Deactivated'
                                " :color="serverdata.mqtt_server.activated ? 'primary' : 'default'
        ">
                            </v-switch> </v-col></v-row>
                    <v-row>
                        <v-col sm="6">
                            <v-text-field v-model="serverdata.mqtt_server.server" label="Server"></v-text-field></v-col>

                        <v-col sm="6">
                            <v-text-field v-model="serverdata.mqtt_server.port" label="Port"></v-text-field></v-col>
                    </v-row>
                    <v-row>

                        <v-col sm="3">
                            <v-switch v-model="serverdata.mqtt_server.use_credentials" label="Auth" :color="serverdata.mqtt_server.use_credentials ? 'primary' : 'default' ">
                        
                            </v-switch>     </v-col>
                        <v-col sm="3" v-if="serverdata.mqtt_server.use_credentials">
                            <v-text-field v-model="serverdata.mqtt_server.username" label="User name"></v-text-field>
                        </v-col>

                        <v-col sm="6" v-if="serverdata.mqtt_server.use_credentials">
                            <v-text-field v-model="serverdata.mqtt_server.password"
                                :type="password_show ? 'text' : 'password'" label="Password"
                                :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="password_show = !password_show"></v-text-field></v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="12">
                            <v-text-field v-model="serverdata.mqtt_server.path_root" label="Root path" :hint="`Path on the MQTT
                        Server (/${serverdata.system.hostname}/${serverdata.mqtt_server.path_root})`"></v-text-field>
                        </v-col></v-row>
                    <v-row>
                        <v-col sm="6">
                            <v-btn type="submit" color="primary" class="mt-2" block text="Save config"></v-btn>
                        </v-col>
                        <v-col sm="6">
                            <v-btn class="mt-2" text="Reload" block @click="loadConfig()"></v-btn>
                        </v-col>
                    </v-row> </v-sheet></template>
        </v-card>
    </v-form>
</template>

<script>
// @ is an alias to /src
import {
    isWebSocketConnected,
    doGetConfig,
    doSetConfig,
} from "@/ServerSocket.js";
import { ServerStatus, ServerData } from "@/ServerData.js";
import { reactive, ref } from "vue";
import _ from "lodash";

export default {
    name: "ConfigView",
    components: {},

    data() {
        return {
            password_show: false,
            serverdata: ref(ServerData), // copy of server config
            serverstatus: ref(ServerStatus),
            isConnected: ref(isWebSocketConnected),
            relaisDefaultStateItems: [
                { caption: "Off", value: "0" },
                { caption: "On", value: "1" },
                { caption: "Last state", value: "2" },
            ],
        };
    },
    methods: {
        loadConfig() {
            doGetConfig();
        },

        submitConfig() {
            doSetConfig();
        },
        submitForm() {
            this.submitConfig();
        },
    },
    beforeMount() {
        doGetConfig();
    },
};
</script>
