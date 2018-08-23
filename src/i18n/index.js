import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'

Vue.use(VueI18n)

const messages = {
    zh,
    en
};
let lang = window.navigator.language;
if (!messages[lang]) {
    if (/^zh-/.test(lang)) {
        lang = 'zh'
    } else {
        lang = 'en'
    }
};
localStorage.primas_lang=lang;
export default new VueI18n({
    locale: lang, // set locale
    messages, // set locale messages
})