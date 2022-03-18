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
            'ID' => $this->owner->ID,
            'Stage' => Versioned::get_stage(),
            'HasBlocks' => false,
            'Global' => [],
            'PageFields' => [],
            'Blocks' => [],
            'Settings' => [],
            'Username' => Security::getCurrentUser()->getName()
        ];

        $pageInfo = $fabricator->getPageInformation($this->owner->ClassName, $this->owner->ID);

        $templateArgs['PageFields'] = json_encode($pageInfo['PageFields']);

        $templateArgs['Settings'] = json_encode($pageInfo['SiteConfig']);


        if ($this->owner->ElementalAreaID) {
            $elementalAreaId = $this->owner->ElementalAreaID;
            $elementalBlocks = $fabricator->getElementalBlocks($elementalAreaId);
            $elementalBlocksType = $fabricator->getElementalBlockTypes();

            $templateArgs['HasBlocks'] = true;
            $templateArgs['Blocks'] = json_encode($elementalBlocks);
            $templateArgs['BlockTypes'] = json_encode($elementalBlocksType);
        }

        $fabricatorReact = SSViewer::execute_template(
            'Fabricator',
            $this->owner,
            $templateArgs
        );

        Requirements::javascript('silverstripe/fabricator: client/dist/js/bundle.js');
        Requirements::css('silverstripe/fabricator: client/dist/styles/bundle.css');

        Requirements::customScript(<<<JS
            document.body.insertAdjacentHTML("afterbegin", `{$fabricatorReact}`);
        JS);
    }
}
