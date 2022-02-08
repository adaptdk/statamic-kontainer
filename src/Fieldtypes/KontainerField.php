<?php

namespace Jezzdk\StatamicSecret\Fieldtypes;

use Statamic\Fields\Fieldtype;

class Kontainerield extends Fieldtype
{
    protected $icon = 'image';

    protected $categories = ['media'];

    /**
     * @return string
     */
    public static function title()
    {
        return 'Kontainer';
    }

    public function augment($value)
    {
        if (empty($value)) {
            return '';
        }

        return $value;
    }

    /**
     * Pre-process the data before it gets sent to the publish page.
     *
     * @param mixed $data
     * @return array|mixed
     */
    public function preProcess($data)
    {
        if (empty($data)) {
            return '';
        }

        return $data;
    }

    /**
     * Process the data before it gets saved.
     *
     * @param mixed $data
     * @return array|mixed
     */
    public function process($data)
    {
        if (empty(trim($data))) {
            return '';
        }

        return $data;
    }

    public function preProcessIndex($value)
    {
        return $this->preProcess($value);
    }

    protected function configFieldItems(): array
    {
        return [
            'kontainer_url' => [
                'display' => 'Kontainer URL',
                'instructions' => 'Type the full url to your Kontainer instance.',
                'type' => 'text',
                'default' => '',
                'width' => 100
            ],
        ];
    }
}
