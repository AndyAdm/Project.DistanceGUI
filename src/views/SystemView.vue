<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <SystemFunction v-if="serverstatus.operations.restart" title="Restart"
          description=" You will restart the device.  Are you sure ?" buttonText="Restart" icon_button="mdi-restart"
          :onClick="onClickRestart" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <SystemFunction v-if="serverstatus.operations.resetWifi" title="Reset Wifi"
          description=" You will erase the WiFi configuration and restart the device.  Are you sure ?"
          buttonText="Reset WiFi" icon_button="mdi-access-point-off" :onClick="onClickResetWifi" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <SystemFunction v-if="serverstatus.operations.resetFactory" title="Reset to Factory defaults"
          description=" You will reset the device to factory defaults and restart the device.  Are you sure ?"
          buttonText="FULL RESET" icon_button="mdi-delete-sweep" :onClick="dialogResetFactory" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SystemFunction from '@/components/SystemFunction.vue';
import { ref } from 'vue';
import { ServerStatus } from '@/ServerData.js';
import { doRestart, doResetFactory, doResetWifi } from '@/ServerSocket.js';

export default {
  name: "SystemView",
  components: { SystemFunction },
  data() {
    return {
      serverstatus: ref(ServerStatus),
    }
  },
  methods: {
    onClickRestart() {
      this.dialogRestart = false;
      doRestart();
    },

    onClickResetWifi() {
      this.dialogResetWifi = false;
      doResetWifi();
    },

    onClickResetFactory() {
      this.dialogResetFactory = false;
      doResetFactory();
    }

  },
}
</script>

