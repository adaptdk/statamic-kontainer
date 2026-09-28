# Statamic Kontainer

![Statamic 6](https://img.shields.io/badge/Statamic-6-FF269E?style=for-the-badge&link=https://statamic.com)

> Statamic Kontainer is a Statamic addon that adds a file picker for Kontainer

## Features

Select any image, video, file, vector or document from Kontainer and have the url stored in Statamic.

> You must have a Kontainer account in order to use this plugin.
> Read more and create an account on [the official website](https://kontainer.com/).

## Compatibility

| Addon version | Statamic version |
| --- | --- |
| `^2.0` | 6 |
| `^1.0` | 5 |

## How to Install

This is Adapt's fork of `jezzdk/statamic-kontainer`. Add the repository to your project's `composer.json`:

```json
"repositories": [
    {
        "type": "vcs",
        "url": "https://github.com/adaptdk/statamic-kontainer.git"
    }
]
```

Then require the version matching your Statamic version:

``` bash
composer require jezzdk/statamic-kontainer:^2.0
```

## How to Use

Simply add a Kontainer field to your blueprints, enter your Kontainer URL in the field settings and you're ready to go 🎉

The browse button will open Kontainer in a popup window. In there you can click the "Use..." button on any file. The popup window will close automatically.

### Field settings

| Setting | Description |
| --- | --- |
| Kontainer URL | The full url to your Kontainer instance |
| Allowed file types | Restrict the field to `images`, `videos`, `files`, `vectors` or `documents`. Defaults to `all` |

## Variables

| Name | Description |
| --- | --- |
| url | The url to the file |
| type | Can be `image`, `video`, `file`, `vector` or `document` |

## Example

The field works similar to the standard assets field. Example:

```html
{{ kontainer_image }}
    <img src="{{ url }}" alt="My Kontainer image">
{{ /kontainer_image }}
```

In the example above, `kontainer_image` is the name of the field set by the user.

## Development

The control panel assets are built with Vite and depend on `@statamic/cms`, which is resolved from `./vendor/statamic/cms/resources/dist-package`. Build the assets from a copy of the addon installed inside a Statamic 6 project, and commit the resulting `dist` folder:

``` bash
npm install
npm run build
```
