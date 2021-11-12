<template>
    <v-container>
        <v-dialog
                v-model="dialog"
                width="550"
        >
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Написать отзыв
                </v-card-title>

                <v-container>
                    <v-form
                            ref="review_form"
                            v-model="valid"
                            lazy-validation
                    >
                        <v-card-text>
                            <p>Ваша оценка:</p>
                            <v-rating
                                    v-model="newComment.rate"
                                    color="amber"
                                    dense
                                    size="25"
                            />
                            <v-text-field
                                    class="mt-5"
                                    :counter="45"
                                    :rules="nameRules"
                                    outlined
                                    label="Имя"
                                    required
                                    v-model="newComment.name"
                            />
                            <v-text-field
                                    outlined
                                    :rules="emailRules"
                                    label="E-mail"
                                    required
                                    v-model="newComment.email"
                            />

                            <v-textarea
                                    label="Отзыв"
                                    required
                                    :rules="commentRules"
                                    outlined
                                    rows="3"
                                    row-height="15"
                                    v-model="newComment.text"
                            />

                        </v-card-text>

                        <v-spacer/>
                        <v-divider/>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                    :disabled="!valid"
                                    color="pink accent-2"
                                    dark
                                    @click="validate"
                            >
                                Отправить
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
        <v-fab-transition>
            <v-btn
                    color="pink"
                    dark
                    absolute
                    bottom
                    right
                    @click="dialog = !dialog"
            >
                <v-icon>mdi-pen</v-icon>
            </v-btn>
        </v-fab-transition>
        <!--   Фильтр     -->
        <v-row v-once>
            <v-col
                    cols="12"
                    sm="6"
                    md="3"
            >
                <v-text-field
                        label="Поиск по тексту"
                        placeholder="Введите текст"
                        outlined
                        append-icon="mdi-form-textbox"

                        v-model="filter.text"
                        @input="sortReviews()"
                />
            </v-col>
            <v-col
                    cols="12"
                    sm="6"
                    md="3"
            >
                <v-select
                        :items="[1,2,3,4,5]"
                        label="Оценка"
                        multiple
                        append-icon="mdi-star"
                        outlined

                        v-model="filter.rate"
                        @input="sortReviews()"
                />
            </v-col>
        </v-row>
        <v-divider/>
        <v-container class="mt-5">
            <v-row class="text--secondary" v-show="reviews.length === 0">Отзывов нет!</v-row>
            <v-row class="mb-5"
                   justify="center"
                   v-for="review in reviews"
                   :key="review.id"
            >
                <v-card width="750px">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title class="text-h5">
                                {{ review.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle>{{
                                    new Date(review.date).toLocaleString('ru')
                                }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-rating
                                :value="review.rate"
                                color="amber"
                                dense
                                readonly
                                size="14"
                        />
                    </v-list-item>
                    <v-divider/>
                    <v-card-text v-text="review.text"/>
                </v-card>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'Reviews',
    data: () => ({
        reviews: [],
        dialog: false,
        valid: false,
        filter: {
            text: '',
            rate: [],
        },
        newComment: {
            rate: 5,
            name: '',
            email: '',
            text: '',
        },
        nameRules: [
            v => !!v || 'Имя обязательно',
            v => v.length <= 45 || 'Имя должно быть менее 45 символов',
        ],
        commentRules: [
            v => !!v || 'Отзыв обязателен',
            v => v.length <= 500 || 'Отзыв должен быть менее 500 символов',
        ],
        emailRules: [
            v => !!v || 'E-mail обязателен',
            v => /.+@.+/.test(v) || 'E-mail должен быть верным',
        ],
    }),
    async mounted() {
        await this.$store.dispatch('getReviews');
        this.reviews = this.$store.state.reviews;
    },
    methods: {
        sortReviews() {
            this.reviews = this.$store.state.reviews.filter(review =>
              review.text.toLowerCase().includes(this.filter.text.toLowerCase()) &&
              (this.filter.rate.includes(review.rate) || this.filter.rate.length === 0),
            );
        },
        validate() {
            if (this.$refs.review_form.validate()) {
                this.$store.dispatch('sendReview', this.newComment);
                this.dialog = false;
                window.location.reload();
            }
        },
    },
};
</script>

<style scoped>

</style>
