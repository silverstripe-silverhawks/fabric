<?php

namespace SilverStripe\Fabricator\Extension;

use SilverStripe\Dev\Debug;
use SilverStripe\Fabricator\Controller\Fabricator;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\DataObject;
use SilverStripe\Security\Security;
use SilverStripe\Versioned\Versioned;
use SilverStripe\View\Requirements;
use SilverStripe\View\SSViewer;

class FabricatorExtension extends DataExtension
{
    public function onAfterInit() {
        if (is_null(Security::getCurrentUser())) {
            return;
        }

        $fabricator = new Fabricator();
        $hasElemental = false;
        $elementalAreaId = -1;

        $templateArgs = [
            'Fabricator' => 'Fabricator',
            'Stage' => Versioned::get_stage(),
            'HasBlocks' => false,
            'Global' => [],
            'PageFields' => [],
            'Blocks' => [],
            // 'Settings' => [],
        ];

        $pageInfo = $fabricator->getPageInformation($this->owner->ClassName, $this->owner->ID);

        Debug::dump($this->owner->toMap());

        $templateArgs['PageFields'] = json_encode($pageInfo['PageFields'], JSON_FORCE_OBJECT);
        // $templateArgs['Global'] = json_encode($pageInfo['SiteConfig'], JSON_FORCE_OBJECT);

        if ($this->owner->ElementalAreaID) {
            $elementalAreaId = $this->owner->ElementalAreaID;
            $elementalBlocks = $fabricator->getElementalBlocks($elementalAreaId);

            $templateArgs['HasBlocks'] = true;
            $templateArgs['Blocks'] = json_encode($elementalBlocks);
        }

        $fabricatorReact = SSViewer::execute_template(
            'Fabricator',
            $this->owner,
            $templateArgs
        );

        Requirements::javascript('silverstripe/fabricator: client/dist/js/bundle.js');
        Requirements::css('silverstripe/fabricator: client/dist/styles/bundle.css');
        Requirements::customScript(
            "document.body.innerHTML += `{$fabricatorReact}`;"
        );
    }
}
