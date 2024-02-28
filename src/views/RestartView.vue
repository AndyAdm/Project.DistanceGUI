<template>
  <v-card append-icon="mdi-restart">

    <template v-slot:text>
      <v-row justify="center">
        <v-btn prepend-icon="mdi-restart" color="primary" dark @click.stop="dialog = true">
          Restart the Server
        </v-btn>
      </v-row>
      <v-row justify="center">
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="text-h5">
              Restart the server?
            </v-card-title>

            <v-card-text>
              All connections will be closed and the relais swichted OFF.
              Are you sure ?
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn prepend-icon="mdi-restart" color="red" text @click="onClickRestart">
                Yes i'm sure
              </v-btn>

              <v-btn color="green darken-1" text @click="dialog = false">
                No!
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row></template>
  </v-card>
</template>

<script>

import { doRestart } from '@/ServerSocket.js';

export default {
  name: "ConfigView",
  components: {},
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    onClickRestart() {
      this.dialog = false;
      doRestart();
    }
  },
}
</script>

