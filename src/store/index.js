import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        albums: [],
        albumsLayouts: [],
        reviews: [],
        orderStep: 0,
        order: {}
    },
    mutations: {
        SET_ALBUMS(state, albums) {
            state.albums = albums;
        },
        SET_ALBUM_LAYOUTS(state, layouts) {
            state.albumsLayouts = layouts;
        },
        SET_REVIEWS(state, reviews) {
            state.reviews = reviews;
        },
        SET_ORDER_PARAM(state, elem){
            state.order[elem.param] = elem.value
        },
        CREATE_ORDER(state){
            axios.post('order/', state.order)
        },
        async CREATE_REVIEW(state, newReview){
            axios.post('review/', newReview)
        }
    },
    actions: {
        async getAlbums(action) {
            let albums = (await axios.get('albumPattern/')).data;
            const themes = (await axios.get('theme/')).data;

            for (let album of albums) {
                for (let theme of themes) {
                    if (album.theme === theme.id) {
                        album.theme = theme;
                    }
                }
            }
            action.commit('SET_ALBUMS', albums);
        },
        async getAlbumLayouts(action) {
            let layouts = (await axios.get('albumLayout/')).data;
            const sizes = (await axios.get('size/')).data;
            const types = (await axios.get('albumType/')).data;

            for (let layout of layouts) {
                for (let size of sizes) {
                    if (layout.size === size.id) {
                        layout.size = size;
                    }
                }
                for (let type of types) {
                    if (layout.type === type.id) {
                        layout.type = type;
                    }
                }
            }
            action.commit('SET_ALBUM_LAYOUTS', layouts);
        },
        async getReviews(action) {
            const reviews = (await axios.get('review/')).data;
            action.commit('SET_REVIEWS', reviews);
        },
        updateOrder(action, item){
            action.commit('SET_ORDER_PARAM', item);
        },
        sendOrder(action){
            action.commit('CREATE_ORDER')
        },
        sendReview(action, item){
            action.commit('CREATE_REVIEW', item)
        }
    },
    modules: {},
});
