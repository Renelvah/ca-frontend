<template>
    <v-container>
        <v-row>
            <v-card
                    class="ma-3"
                    width="270"
                    v-for="item in albums"
                    :key="item.id"
            >
                <v-img
                        :src="item.photo"
                        :alt="item.title"
                        height="200px"
                />

                <v-card-title v-text="item.title"/>
                <v-divider/>
                <v-card-actions>
                    <v-btn text @click="$emit('chooseAlbumPattern', item.id)">Выбрать</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'OrderAlbum',
    props: ['albums'],
    data: () => ({
        selectedItem: 1
    })
};
</script>

<style scoped>

</style>
