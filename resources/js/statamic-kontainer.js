import Fieldtype from './components/StatamicKontainerFieldtype';

Statamic.booting(() => {
    Statamic.$components.register('kontainer_field-fieldtype', Fieldtype);
});
