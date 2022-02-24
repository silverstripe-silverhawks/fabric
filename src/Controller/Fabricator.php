<?php

namespace SilverStripe\Fabricator\Controller;

use SilverStripe\Control\Controller;
use SilverStripe\Core\Config\Config;
use SilverStripe\Dev\Debug;
use SilverStripe\ORM\DataObject;
use SilverStripe\SiteConfig\SiteConfig;

class Fabricator extends Controller
{
    protected array $disabled_fields = [
        'CanViewType',
        'CanEditType',
        'HasBrokenLink',
        'HasBrokenFile',
        'RecordClassName'
    ];

    protected array $allowed_site_config = [
        'Title',
        'Tagline',
    ];

    public function getPageInformation(string $className, int $pageId) {
        $fields = $this->getAllowedFieldsOnPage($className);
        $siteConfig = $this->getAllowedSiteConfigData();

        return [
            'PageFields' => $fields,
            'SiteConfig' => $siteConfig,
        ];
    }

    /**
     * Returns only the allowed fields on a page with its type
     */
    public function getAllowedFieldsOnPage(string $className)
    {
        $allowedFields = [];
        // $configDisallowedFields = Config::inst()->get(FabricatorAPIController::class, 'disallowed_fields');

        $pageObjects = DataObject::get($className)->first()->toMap();
        $objectSchema = DataObject::getSchema()->fieldSpecs($className);

        foreach ($pageObjects as $key => $value) {
            if (!in_array($key, $this->disabled_fields)) {
                $allowedFields[$key] = [
                    'Type' => $objectSchema[$key],
                    'Value' => $value
                ];
            }
        }

        return $allowedFields;
    }

    public function getAllowedSiteConfigData() {
        $allowedSiteConfig = [];
        $siteConfig = SiteConfig::current_site_config()->toMap();
        $objectSchema = SiteConfig::getSchema()->fieldSpecs(SiteConfig::class);

        foreach ($siteConfig as $key => $value) {
            if (in_array($key, $this->allowed_site_config)) {
                $allowedSiteConfig[$key] = [
                    'Type' => $objectSchema[$key],
                    'Value' => $value
                ];
            }
        }

        return $allowedSiteConfig;
    }

    public function getObjectById(HTTPRequest $request)
    {

    }
}
