<template>
    <v-container>
        <v-row>
            <v-col
                    cols="12"
                    sm="6"
                    md="3"
            >
                <v-list>
                    <v-subheader>Макет</v-subheader>
                    <v-list-item-group
                            v-model="selectedLayout"
                            color="pink accent-2"
                    >
                        <v-list-item
                                v-for="item in uniqueLayoutsTypes()"
                                :key="item.id"
                                @click="selectedSize=-1"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="item.type"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>

            <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    v-show="selectedLayout>-1"
            >
                <v-list>
                    <v-subheader>Размер</v-subheader>
                    <v-list-item-group
                            v-model="selectedSize"
                            color="pink accent-2"
                    >
                        <v-list-item
                                v-for="item in availableSizes()"
                                :key="item.id"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="item.size.size"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>

            <v-col
                    cols="12"
                    md="6"
                    v-show="selectedSize>-1"
            >
                <v-list>
                    <v-subheader>Количество страниц</v-subheader>
                    <p>Минимальное количество страниц для выбранного макета - {{ minPagesCount() }}.</p>
                    <v-text-field
                            label="Количество страниц"
                            type="number"
                            v-model="selectedPagesCount"
                            :min="minPagesCount()"
                            step="1"
                            placeholder="Placeholder"
                            outlined
                            @input="checkCount()"
                    />
                </v-list>
                <v-btn class="pink accent-2"
                       :disabled="!checkCount()"
                       dark
                       @click="$emit('chooseAlbumLayout', {
                           layout: selectedLayout,
                           size: selectedSize,
                           pagesCount: selectedPagesCount
                       })"
                >Далее</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'OrderAlbumLayout',
    props: ['layouts'],
    data: () => ({
        selectedLayout: -1,
        selectedSize: -1,
        selectedPagesCount: 10
    }),
    methods: {
        uniqueLayoutsTypes() {
            let layouts = [];

            for (let layout of this.layouts) {
                if (!layouts.includes(layout.type)) {
                    layouts.push(layout.type);
                }
            }

            return layouts;
        },
        availableSizes() {
            return this.layouts.filter(layout => layout.type.id === this.selectedLayout+1);
        },
        minPagesCount(){
            const layout = this.layouts.filter(layout =>
              layout.type.id === this.selectedLayout+1 && layout.size.id === this.selectedSize+1
            )
            return (layout.length>0) ? layout[0].minPages : 10
        },
        checkCount(){
            return this.selectedPagesCount >= this.minPagesCount()
        }
    },
};
</script>

<style scoped>

</style>
