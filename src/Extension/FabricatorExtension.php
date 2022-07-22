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
    public function onBeforeInit() {
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

        $fabricatorApp = SSViewer::execute_template(
            'Fabricator',
            $this->owner,
            $templateArgs
        );

        Requirements::customScript(<<<JS
            document.body.insertAdjacentHTML("afterbegin", `{$fabricatorApp}`);
        JS);
    }

    public function onAfterInit() {
        if (is_null(Security::getCurrentUser())) {
            return;
        }

        Requirements::javascript('https://unpkg.com/vue@3');
        Requirements::javascript('silverstripe/fabricator: dist/fabricator.umd.js');
        Requirements::css('silverstripe/fabricator: dist/style.css');

    }
}
