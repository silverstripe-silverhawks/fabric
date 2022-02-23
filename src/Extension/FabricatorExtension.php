<?php

namespace SilverStripe\Fabricator\Extension;

use SilverStripe\Dev\Debug;
use SilverStripe\Fabricator\Service\APIService;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Versioned\Versioned;
use SilverStripe\View\Requirements;
use SilverStripe\View\SSViewer;

class FabricatorExtension extends DataExtension
{
    public function onAfterInit() {
        $service = new APIService();

        $allowedFields = $service->getAllowedFieldsOnPage($this->owner->ClassName);

        $fabricatorReact = SSViewer::execute_template(
            'Fabricator',
            $this->owner,
            [
                'Fabricator' => 'Fabricator',
                'Stage' => Versioned::get_stage(),
                'AllowedFields' => json_encode($allowedFields),
                'HasBlocks' => 'false'
            ]
        );

        // exit;

        Requirements::javascript('silverstripe/fabricator: client/dist/js/bundle.js');
        Requirements::customScript(
            "document.body.innerHTML += `{$fabricatorReact}`;"
        );
    }
}
