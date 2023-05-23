<?php

namespace Jezzdk\StatamicKontainer;

use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $vite = [
        'input' => [
            'resources/js/addon.js',
            'resources/css/addon.css',
        ],
        'publicDirectory' => 'dist',
    ];

    protected $fieldtypes = [
        \Jezzdk\StatamicKontainer\Fieldtypes\KontainerField::class,
    ];

    public function bootAddon()
    {
        //
    }
}
