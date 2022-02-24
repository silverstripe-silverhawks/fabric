<?php

namespace SilverStripe\Fabricator\Extension;

use SilverStripe\Dev\Debug;
use SilverStripe\Fabricator\Controller\Fabricator;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\DataObject;
use SilverStripe\Versioned\Versioned;
use SilverStripe\View\Requirements;
use SilverStripe\View\SSViewer;

class FabricatorExtension extends DataExtension
{
    public function onAfterInit() {
        $fabricator = new Fabricator();

        $hasElemental = false;
        $elementalAreaId = -1;
        if ($this->owner->hasField('ElementalAreaID')) {
            $hasElemental = true;
            $elementalAreaId = $this->owner->ElementalAreaID;
        }

        $allowedFields = $fabricator->getPageInformation($this->owner->ClassName, $this->owner->ID);

        Debug::dump($allowedFields);

        if ($hasElemental) {
            // $elementalBlocks = $fabricator->getElementalBlocks($elementalAreaId);
        }

        // Debug::dump($hasElemental);
        $fabricatorReact = SSViewer::execute_template(
            'Fabricator',
            $this->owner,
            [
                'Fabricator' => 'Fabricator',
                'Stage' => Versioned::get_stage(),
                'AllowedFields' => json_encode($allowedFields),
                'HasBlocks' => json_encode($hasElemental)
            ]
        );

        // exit;

        Requirements::javascript('silverstripe/fabricator: client/dist/js/bundle.js');
        Requirements::css('silverstripe/fabricator: client/dist/styles/bundle.css');
        Requirements::customScript(
            "document.body.innerHTML += `{$fabricatorReact}`;"
        );
    }
}
