**wip**

## Setup - Vagrant development with synced folder
**assumes you have created a basic silverstripe site with elemental installed**

For local testing with Vagrant you can add the synced folder to the Vagrantfile
`config.vm.synced_folder '../fabricator', '/var/www/fabricator'`

**Note**: first parameter is your local folder, the second is the VM folder

In your composer.lock file you need to point the repository to the symlinked folder (above)
```json
// ...
"repositories": [
    {
        "type": "path",
        "url": "/var/www/fabricator"
    }
],
//...
"require": {
    // ...
    "silverstripe/fabricator": "dev-[YOUR-BRANCH-NAME]",
},
```

Then in your VM run `composer update silverstripe/fabricator`

** Amol's original docs **
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
