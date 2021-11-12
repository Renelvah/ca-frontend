<template>
<v-container>
    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
    >
        <v-row>
            <v-col
                    cols="12"
                    md="4"
            >
                <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="45"
                        outlined
                        label="Имя"
                        required
                />
            </v-col>

            <v-col
                    cols="12"
                    md="4"
            >
                <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        :counter="45"
                        outlined
                        label="Фамилия"
                        required
                />
            </v-col>

            <v-col
                    cols="12"
                    md="4"
            >
                <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        outlined
                        label="E-mail"
                        required
                />
            </v-col>
        </v-row>
        <v-btn
                :disabled="!valid"
                color="pink accent-2"
                class="mr-4 mt-5"
                @click="validate"
                dark
        >
            Отправить
        </v-btn>
    </v-form>
</v-container>
</template>

<script>
export default {
    name: 'OrderPersonalInformation',
    data: () => ({
        valid: false,
        firstname: '',
        lastname: '',
        nameRules: [
            v => !!v || 'Имя и фамилия обязательны',
            v => v.length <= 45 || 'Имя и Фамилия должны быть менее 45 символов',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail обязателен',
            v => /.+@.+/.test(v) || 'E-mail должен быть верным',
        ],
    }),
    methods: {
        validate () {
            if (this.$refs.form.validate()){
                this.$emit('setInformation',{
                    name: this.firstname,
                    surname: this.lastname,
                    email: this.email
                })
            }
        }
    },
};
</script>

<style scoped>

</style>
