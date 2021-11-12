<template>
    <v-container>
        <v-parallax
                class="rounded"
                height="500"
                src="https://cdn.mixbook.com/apps/site/public/mainHeroShowLove-227154cdf4a2087108c4.jpg">
            <v-row
                    align="center"
                    justify="start"
            >
                <v-col class="col-7">
                    <h1 class="text--primary">Конструктор фотоальбомов</h1>
                    <h3 class="text--secondary">
                        Сделайте фотоальбом в великолепном дизайне за пару минут!
                    </h3>
                    <v-btn class="main-button mt-5 pink accent-3" dark to="/order">Заказать альбом</v-btn>
                </v-col>
            </v-row>
        </v-parallax>
    </v-container>
</template>

<script>

export default {
    name: 'Home',
};
</script>

<style lang="scss">
    .main-button{
      padding: 25px 40px !important;
    }
</style>
