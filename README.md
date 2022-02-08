# Statamic Kontainer

![Statamic 3.2+](https://img.shields.io/badge/Statamic-3.2+-FF269E?style=for-the-badge&link=https://statamic.com)
[![Latest Version on Packagist](https://img.shields.io/packagist/v/jezzdk/statamic-kontainer.svg?style=for-the-badge)](https://packagist.org/packages/jezzdk/statamic-kontainer)

> Statamic Kontainer is a Statamic addon that adds a file picker for Kontainer

## Features

Select any image or video from Kontainer and have the url stored in Statamic.

> You must have a Kontainer account in order to use this plugin.
> Read more and create an account on [the official website](https://kontainer.com/).

## How to Install

You can search for this addon in the `Tools > Addons` section of the Statamic control panel and click **install**, or run the following command from your project root:

``` bash
composer require jezzdk/statamic-kontainer
```

## How to Use

Simply add a Kontainer field to your blueprints, enter your Kontainer URL in the field settings and you're ready to go 🎉

The browse button will open Kontainer in a popup window. In there you can click the "Use..." button on any image or video. The popup window will close automatically.

## Variables

| Name | Description |
| --- | --- |
| url | The url to the image |
| type | Can be either image or video |

## Example

The field works similar to the standard assets field. Example:

```html
{{ kontainer_image }}
    <img src="{{ url }}" alt="My Kontainer image">
{{ /kontainer_image }}
```

In the example above, `kontainer_image` is the name of the field set by the user.
