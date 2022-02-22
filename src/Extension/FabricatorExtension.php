<?php

namespace SilverStripe\Fabricator\Extension;

use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\Dev\Debug;
use SilverStripe\View\Requirements;
use SilverStripe\View\SSViewer;

class FabricatorControllerExtension extends ContentController
{
    public function onAfterInit() {
        $fabricatorReact = SSViewer::execute_template(
            'Fabricator',
            $this->owner,
            [
                'Fabricator' => $this->owner,
            ]
        );

        Requirements::customScript(
            "document.body.innerHTML += `{$fabricatorReact}`;"
        );

        // this isn't the correct way to import, We should use vendor-plugin
        Requirements::javascript('/_resources/client/dist/js/bundle.js');
    }
}
