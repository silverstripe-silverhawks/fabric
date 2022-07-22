**wip**


## Setup - Development
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
