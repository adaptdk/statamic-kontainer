<?php

namespace Jezzdk\StatamicKontainer;

use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $scripts = [
        __DIR__ . '/../dist/js/statamic-kontainer.js',
    ];

    protected $fieldtypes = [
        \Jezzdk\StatamicKontainer\Fieldtypes\KontainerField::class,
    ];

    public function bootAddon()
    {
        //
    }
}
