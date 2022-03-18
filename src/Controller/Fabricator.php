<?php

namespace SilverStripe\Fabricator\Controller;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Services\ElementTypeRegistry;
use Page;
use SilverStripe\Control\Controller;
use SilverStripe\Dev\Debug;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataObject;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\View\ArrayData;

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

    public function getElementById(int $id): DataObject
    {
        $className = BaseElement::get()->filter('ID', $id)->first()->getField('ClassName');
        $instance = singleton($className);
        return $instance::get()->filter('ID', $id)->first();
    }

    public function getPageInformation(string $className, int $pageId) {
        $fields = $this->getFieldsOnPage($className, $pageId);
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

                if ($objectSchema[$key] === 'HTMLText') {
                    $value = htmlentities($value);
                }

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
    public function getFieldsOnPage(string $className, int $pageId)
    {
        $allowedFields = [];
        // $configDisallowedFields = Config::inst()->get(FabricatorAPIController::class, 'disallowed_fields');

        $pageObjects = Page::get_by_id($pageId)->toMap();
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
            ->first();

        if ($area !== null) {
            $area
                ->Elements()
                ->each(function ($element) use (&$elementalBlocks) {
                    $allowedFields = $this->getAllowedFieldsByObject($element->toMap(), $element->ClassName);
                    // add the type
                    $allowedFields['Type'] = [
                        'type' => 'string',
                        'value' => $element->getType(),
                    ];

                    $elementalBlocks[] = $allowedFields;
                });
        }

        return $elementalBlocks;
    }

    public function getElementalBlockTypes() {
        $definitions = ElementTypeRegistry::generate()->getDefinitions();

        $blockTypes = ArrayList::create();

        foreach ($definitions as $key => $value) {
            $blockTypes->add(ArrayData::create([
                'Title' => $value['title'],
                'Icon' => $value['icon'],
            ]));
        }

        return $blockTypes->toNestedArray();
    }

    //
    public function getHasManyDetailsFromElementID(int $id) {
        $element = $this->getElementById($id);
        $hasMany = [];
        if ($element->hasMany()) {
            foreach ($element->hasMany() as $relationship => $class) {
                $components = $element->getComponents($relationship);
                foreach ($components as $component) {
                    $componentFields = $this->getAllowedFieldsByObject($component->toMap(), $component->ClassName);
                    $hasMany[$relationship][] = $componentFields;
                }
            }
        }

        return $hasMany;
    }

    public function saveBlock(int $id, array $data): void
    {
        $element = $this->getElementById($id);
        $hasMany = $this->getHasManyDetailsFromElementID($id);

        foreach ($data as $fieldName => $fieldContent) {
            $element->$fieldName = $data[$fieldName]['value'];
        }

        $element->write();
    }
}
