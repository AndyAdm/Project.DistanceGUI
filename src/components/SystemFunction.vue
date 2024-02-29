<template>
    <v-card :append-icon=icon_button max-width="400" width="300">

        <template v-slot:text>
            <v-row justify="center">
                <v-btn :prepend-icon=icon_button color="primary" dark @click.stop="dialog = true">
                    {{ buttonText }}
                </v-btn>
            </v-row>
            <v-row justify="center">
            </v-row>
            <v-row justify="center">
                <v-dialog v-model="dialog" max-width="290">
                    <v-card>
                        <v-card-title class="text-h5">
                            {{ title }}
                        </v-card-title>

                        <v-card-text>
                            {{ description }}
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn :prepend-icon=icon_button color="red" text @click="handleClick">
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
export default {
    name: 'SystemFunction',
    data() {
        return {
            dialog: false,
        }
    },
    props: {
        title: String,
        description: String,
        buttonText: String,
        onClick: Function,
        icon_button: {
            type: String,
            default: 'mdi-restart'
        }
    },
    methods: {
        handleClick() {
            this.dialog = false;
            // Callback-Funktion aufrufen, wenn der Button geklickt wird
            if (typeof this.onClick === 'function') {
                this.onClick();
            }
        }
    }
};
</script>
