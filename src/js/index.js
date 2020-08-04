
import Vue from 'vue';
import '@babel/polyfill';
import '../css/style.scss';
import VueDraggable from "vue-draggable";

Vue.use(VueDraggable);
const TranscriptEditor = () => import('./components/TranscriptEditor/TranscriptEditor.vue')

try {
    new Vue({
        'el': '#root',
        'components': {TranscriptEditor},
        'template': '<TranscriptEditor/>'
    });
}
catch (error)
{
    console.log('Error at rendering time', error);
}