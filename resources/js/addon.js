import Fieldtype from './components/StatamicKontainerFieldtype.vue';

Statamic.booting(() => {
    Statamic.$components.register('kontainer_field-fieldtype', Fieldtype);
});
