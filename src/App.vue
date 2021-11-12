<template>
    <v-app>
        <v-navigation-drawer app
                             v-model="drawer"
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        Фотоальбомы
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Инженерное проектирование
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list nav>
                <v-list-item
                        v-for="item in routerLinks"
                        :key="item.title"
                        :to="item.link"
                        link
                >
                    <v-list-item-icon>
                        <v-icon class="pink--text accent-3">{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app flat>
            <v-app-bar-nav-icon class="hidden-lg-and-up"
                                @click.stop="drawer = !drawer"
            />
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-main>

        <v-footer/>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data: () => ({
        drawer: true,
        routerLinks: [
            {
                icon: 'mdi-home-variant-outline',
                link: '/',
                title: 'Главная',
            },
            {
                icon: 'mdi-image-album',
                link: 'order',
                title: 'Заказать альбом',
            },
            {
                icon: 'mdi-comment-outline',
                link: 'reviews',
                title: 'Отзывы',
            },
        ],
    }),
};
</script>

<style lang="scss">
@media print {
  * {
    filter: grayscale(100%);
  }
  .v-btn, nav, header {
    display: none !important;
  }
}
</style>


