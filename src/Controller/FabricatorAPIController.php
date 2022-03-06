<?php

namespace SilverStripe\Fabricator\Controller;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Services\ElementTypeRegistry;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Dev\Debug;
use SilverStripe\Fabricator\Controller\Fabricator;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataObject;
use SilverStripe\View\ArrayData;

class FabricatorAPIController extends Controller {

    private static $allowed_actions = [
        'getPage',
        'getBlockTypes',
        'getDataObject',
        'saveBlock',
    ];

    public function init() {
        parent::init();
        $this->fabricator = new Fabricator();
    }

    public function getPageInformation(HTTPRequest $request)
    {
        $pageId = $request->param('ID');
        $className = $request->param('ClassName');
        return $fabricator->getPageInformation($className, $pageId);
    }

    public function getBlockTypes(HTTPRequest $request) {
        $definitions = ElementTypeRegistry::generate()->getDefinitions();

        $blockTypes = ArrayList::create();

        foreach ($definitions as $key => $value) {
            $blockTypes->add(ArrayData::create([
                'Title' => $value['title'],
                'Icon' => $value['icon'],
            ]));
        }

        return json_encode($blockTypes->toNestedArray());
    }

    public function saveBlock(HTTPRequest $request) {
        $data = json_decode($request->getBody(), true);
        $block = $this->fabricator->saveBlock($data);
        return $data;
    }

    public function getObjectById(HTTPRequest $request)
    {

    }
}
