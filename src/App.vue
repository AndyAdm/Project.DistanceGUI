<template>
  <v-container>
    <v-app>
      <v-container>
        <v-app-bar :elevation="2" rounded color="primary">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-app-bar-title>{{ title }}</v-app-bar-title>
        </v-app-bar>
      </v-container>
      <v-container><v-navigation-drawer v-model="drawer">
          <v-list-item title="Main menu" subtitle=""></v-list-item>
          <v-divider :thickness="2"></v-divider>
          <v-list-item v-for="route in  routes " :prependIcon=route.prependIcon :key="route.name" :to="route.path" link>
            {{ route.caption }}
          </v-list-item>
        </v-navigation-drawer>
      </v-container>

      <!-- Hier wird der Inhalt der aktuellen View angezeigt -->
      <v-container><router-view></router-view></v-container>

    </v-app>
  </v-container>
</template>


<script>


export default {
  name: "App",
  data() {
    return {
      drawer: false,
      title: "AJDistMeter Server 1.0",
    };
  },
  computed: {
    // Zugriff auf die Routenkonfiguration
    routes() {
      return this.$router.options.routes;
    },
  },
  components: {
  },

  methods: {
  },
  created() {

  }

};
</script>

