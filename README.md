# Fabricator

## Requirements
- PHP 7.4
- SilverStripe Framework ^4
-

## Setup
- Add following lines in `composer.json`
    ```
    "dnadesign/silverstripe-elemental": "^4.9",
    "silverstripe/fabricator": "dev-develop",
    ```
- Add the fabricator repository
    ```
    "repositories": [
        {
            "type": "vcs",
            "url": "git@github.com:silverstripe-silverhawks/fabric.git"
        }
    ],
    ```
- Update dependencies
    ```
    composer update silverstripe/fabricator dnadesign/silverstripe-elemental
    ```
- Additional steps
    ```
    rm -rf ./vendor/silverstripe/admin
    composer install --prefer-source
    cd ./vendor/silverstripe/admin
    yarn
    cd ./vendor/silverstripe/fabricator
    yarn
    yarn build
    ```
- Add `routes.yml`
```
---
Name: approutes
After:
  - '#rootroutes'
  - '#coreroutes'
---
SilverStripe\Control\Director:
  rules:
    'fabricator/api//$Action': SilverStripe\Fabricator\Controller\FabricatorAPIController
```
- Add FabricatorExtension
```
PageController:
  extensions:
    - SilverStripe\Fabricator\Extension\FabricatorExtension
```

## Maintainers
* [Amol Wankhede](https://github.com/amolswnz)
* [Danni Dickson](https://github.com/dannidickson)
* [Marco Hermo](https://github.com/ssmarco)
* [Phillip king](https://github.com/HeyImPhil)
* [Scott Sutherland](https://github.com/scott-nz)
* [Vinnie Watson](https://github.com/vinstah)
