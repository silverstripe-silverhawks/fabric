<?php

namespace SilverStripe\Fabricator\Controller;

use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Config\Config;
use SilverStripe\Dev\Debug;
use SilverStripe\ORM\DataObject;
use SilverStripe\SiteConfig\SiteConfig;

class Fabricator extends Controller
{
    protected array $disabled_fields = [
        'ClassName',
        'CanViewType',
        'CanEditType',
        'HasBrokenLink',
        'HasBrokenFile',
        'RecordClassName',
        'Created',
        'LastEdited',
        'ParentID',
        'Sort',
        'Version',
    ];

    protected array $allowed_site_config = [
        'Title',
        'Tagline',
    ];

    public function getPageInformation(string $className, int $pageId) {
        $fields = $this->getFieldsOnPage($className);
        $siteConfig = $this->getAllowedSiteConfigData();

        return [
            'PageFields' => $fields,
            'SiteConfig' => $siteConfig,
        ];
    }

    private function getAllowedFieldsByObject($objects, string $className) {
        $allowedFields = [];
        $objectSchema = DataObject::getSchema()->fieldSpecs($className);
        foreach ($objects as $key => $value) {
            if (!in_array($key, $this->disabled_fields)) {
                $allowedFields[$key] = [
                    'type' => $objectSchema[$key],
                    'value' => $value
                ];
            }
        }

        return $allowedFields;
    }

    /**
     * Returns only the allowed fields on a page with its type
     */
    public function getFieldsOnPage(string $className)
    {
        $allowedFields = [];
        // $configDisallowedFields = Config::inst()->get(FabricatorAPIController::class, 'disallowed_fields');

        $pageObjects = DataObject::get($className)->first()->toMap();
        $allowedFields = $this->getAllowedFieldsByObject($pageObjects, $className);
        return $allowedFields;
    }

    public function getAllowedSiteConfigData() {
        $allowedSiteConfig = [];
        $siteConfig = SiteConfig::current_site_config()->toMap();
        $objectSchema = SiteConfig::getSchema()->fieldSpecs(SiteConfig::class);

        foreach ($siteConfig as $key => $value) {
            if (in_array($key, $this->allowed_site_config)) {
                $allowedSiteConfig[$key] = [
                    'type' => $objectSchema[$key],
                    'value' => $value
                ];
            }
        }

        return $allowedSiteConfig;
    }

    public function getElementalBlocks(int $elementalAreaId) {
        $elementalBlocks = [];
        $area = ElementalArea::get()
            ->filter('ID', $elementalAreaId)
            ->first()
            ->Elements()
            ->each(function ($element) use (&$elementalBlocks) {
                $allowedFields = $this->getAllowedFieldsByObject($element->toMap(), $element->ClassName);
                $elementalBlocks[] = $allowedFields;
            });

        return $elementalBlocks;
    }

    public function getObjectById(HTTPRequest $request)
    {

    }
}
