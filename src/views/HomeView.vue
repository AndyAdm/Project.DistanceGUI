

<template>
  <v-container :disabled="!isConnected">
    <v-card max-width="600" :append-icon="isConnected ? 'mdi-server' : 'mdi-server-off'">
      <template v-slot:title> Server overview </template>
      <template v-slot:subtitle> {{ serverstatus.system.ip }} Hostname: {{ serverstatus.system.hostname }} </template>
      <template v-slot:text>
        <v-container class="grey lighten-5">
          <v-row>
            <v-col md="3">Distance: </v-col>
            <v-col>
              <v-label>{{ serverstatus.distmeter.lastdistance }} cm</v-label>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3">Last check </v-col>
            <v-col>
              <v-label>{{ $filters.formatDate(serverstatus.distmeter.lastmeasurement) }}</v-label>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="3">Deep sleep: </v-col>
            <v-col>
              <v-icon> {{ serverstatus.sleeper.activated ? 'mdi-checkbox-marked-outline' :
                'mdi-checkbox-blank-outline' }} </v-icon>
              <v-label>{{ $filters.formatDate(serverstatus.sleeper.nextasleeptime) }} / {{
                $filters.formatDate(serverstatus.sleeper.nextawaketime) }}</v-label>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3">Last check </v-col>
            <v-col>
              <v-label>{{ $filters.formatDate(serverstatus.distmeter.lastmeasurement) }}</v-label>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="3">Uptime: </v-col>
            <v-col>
              <v-label>{{ $filters.calcDuration(serverstatus.system.uptime) }}</v-label>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3">Started: </v-col>
            <v-col>
              <v-label>{{ $filters.formatDate(serverstatus.system.started) }}</v-label>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3"> Watchdog / last check: </v-col>
            <v-col>
              <v-icon> {{ serverstatus.watchdog.activated ? 'mdi-checkbox-marked-outline' :
                'mdi-checkbox-blank-outline' }} </v-icon>
              <v-label> {{ $filters.formatDate(serverstatus.watchdog.lastcheck) }} </v-label>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3"> Watchdog / executed: </v-col>
            <v-col><v-label>
                {{ $filters.formatDate(serverstatus.watchdog.lastexecuted) }}</v-label>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3"> MqTT Server: </v-col>
            <v-col>
              <v-icon> {{ serverstatus.mqtt_server.activated ? 'mdi-checkbox-marked-outline' :
                'mdi-checkbox-blank-outline'
              }}</v-icon>
              <v-icon v-if="serverstatus.mqtt_server.activated"> {{ serverstatus.mqtt_server.connected ?
                'mdi-pipe'
                :
                'mdi-pipe-disconnected' }}
              </v-icon> <v-label v-if="serverstatus.mqtt_server.lastcommunication">{{
                $filters.formatDate(serverstatus.mqtt_server.lastcommunication) }}</v-label>
            </v-col>
          </v-row>

        </v-container>
      </template>
      <v-card-actions color="primary">
        <v-btn prepend-icon="mdi-reload" class="mt-2" @click="handlReloadPage()" color="primary"> Reload </v-btn>
      </v-card-actions>

      <v-label class="text-body-1"> FreeMem: {{
        serverstatus.system.freeheap }}</v-label>
    </v-card>


  </v-container>
</template>

<style scoped></style>

<script>
// @ is an alias to /src
import { doGetStatus, isWebSocketConnected, doRelaisSwitchOff, doRelaisSwitchON, doRelaisSwitchONTemporary } from '@/ServerSocket.js';
import { ref } from 'vue';
import { ServerStatus } from '@/ServerData.js';

export default {
  name: "HomeView",
  data() {
    return {
      md_value: 3,
      serverstatus: ref(ServerStatus),
      isConnected: ref(isWebSocketConnected),
    };
  },
  methods: {

    handlReloadPage() {
      if (this.isConnected) {
        doGetStatus();
      }
      else {
        console.log("reloadPage() NO Action is disconnected!");
      }


    },
    handleRelaisSwitchOnTempClick(param) {
      // Die Methode, die beim Klicken auf den Button ausgeführt werden soll
      console.log("handleRelaisSwitchOnTempClick wurde geklickt mit Parameter:", param);
      doRelaisSwitchONTemporary(param);
    },
    handleRelaisSwitchOnClick(param) {
      // Die Methode, die beim Klicken auf den Button ausgeführt werden soll
      console.log("handleRelaisSwitchOnClick wurde geklickt mit Parameter:", param);
      doRelaisSwitchON(param);
    },

    handleRelaisSwitchOffClick(param) {
      // Die Methode, die beim Klicken auf den Button ausgeführt werden soll
      console.log("handleRelaisSwitchOffClick wurde geklickt mit Parameter:", param);
      doRelaisSwitchOff(param);
    },



  },
  beforeMount() {
    doGetStatus();
  }

};
</script>
