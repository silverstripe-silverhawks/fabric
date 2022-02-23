<?php

namespace SilverStripe\Fabricator\Extension;

use PageController;
use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\Dev\Debug;
use SilverStripe\ORM\DataExtension;
use SilverStripe\View\Requirements;
use SilverStripe\View\SSViewer;

class FabricatorExtension extends DataExtension
{
    public function onAfterInit() {
        $fabricatorReact = SSViewer::execute_template(
            'Fabricator',
            $this->owner,
            [
                'Fabricator' => 'abc'
            ]
        );
        // Requirements::javascript('silverstripe/admin: client/dist/js/vendor.js');
        // Requirements::javascript('silverstripe/admin: client/dist/js/bundle.js');
        // Requirements::javascript('https://cdnjs.cloudflare.com/ajax/libs/react/18.0.0-rc.0-next-4de99b3ca-20220221/umd/react.production.min.js');
        // Requirements::javascript('https://unpkg.com/react-dom@17/umd/react-dom.development.js');
        Requirements::javascript('silverstripe/fabricator: client/dist/js/bundle.js');

        Requirements::customScript(
            "document.body.innerHTML += `{$fabricatorReact}`;"
        );

        // this isn't the correct way to import, We should use vendor-plugin
    }
}
