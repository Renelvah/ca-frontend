<template>
    <v-container>
        <v-stepper
                v-model="e6"
                vertical
        >
            <v-stepper-step
                    :complete="e6 > 1"
                    step="1"
                    color="pink accent-2"
            > Выберите шаблон альбома
            </v-stepper-step>
            <v-stepper-content step="1">
                <order-album-pattern
                        :albums="albums"
                        @chooseAlbumPattern="setAlbumPattern"
                />
            </v-stepper-content>

            <v-stepper-step
                    :complete="e6 > 2"
                    step="2"
                    color="pink accent-2"
            > Выберите макет альбома
            </v-stepper-step>
            <v-stepper-content step="2">
                <order-album-layout
                        :layouts="layouts"
                        @chooseAlbumLayout="setAlbumLayout"
                />
            </v-stepper-content>

            <v-stepper-step
                    :complete="e6 > 3"
                    step="3"
                    color="pink accent-2"
            > Введите данные
            </v-stepper-step>
            <v-stepper-content step="3">
                <order-personal-information
                        @setInformation="setPersonalInformation"
                />
            </v-stepper-content>

            <v-stepper-step
                    :complete="e6 > 4"
                    step="4"
                    color="pink accent-2"
            > Завершение
            </v-stepper-step>
            <v-stepper-content step="4">
                <v-container>
                    <p>Благодарим за выбор нашего сервиса!</p>
                    <v-btn color="pink accent-2" to="/" dark>Вернуться на главную</v-btn>
                </v-container>
            </v-stepper-content>
        </v-stepper>
    </v-container>
</template>

<script>
import OrderAlbumPattern from '@/views/order_steps/OrderAlbumPattern';
import OrderAlbumLayout from '@/views/order_steps/OrderAlbumLayout';
import OrderPersonalInformation from '@/views/order_steps/OrderPersonalInformation';

export default {
    name: 'Order',
    components: {
        OrderPersonalInformation,
        OrderAlbumLayout,
        OrderAlbumPattern,
    },
    data: () => ({
        e6: 1,
        albums: [],
        layouts: [],
    }),
    async mounted() {
        await this.$store.dispatch('getAlbums');
        this.albums = this.$store.state.albums;

        await this.$store.dispatch('getAlbumLayouts');
        this.layouts = this.$store.state.albumsLayouts;
    },
    methods: {
        setAlbumPattern(item) {
            this.$store.dispatch('updateOrder', {
                param: 'albumPattern',
                value: item,
            });

            this.e6++;
        },
        setAlbumLayout(item) {
            const albumLayout = this.layouts.filter(layout =>
              layout.type.id === item.layout + 1 && layout.size.id === item.size + 1,
            );
            this.$store.dispatch('updateOrder', {
                param: 'albumLayout',
                value: albumLayout[0].id,
            });
            this.$store.dispatch('updateOrder', {
                param: 'pagesCount',
                value: item.pagesCount,
            });
            this.e6++;
        },
        setPersonalInformation(item) {
           for (let key in item){
               this.$store.dispatch('updateOrder', {
                   param: key,
                   value: item[key],
               });
           }
            this.$store.dispatch('sendOrder')
            this.e6++;
        },
    },
};
</script>

<style scoped>

</style>
