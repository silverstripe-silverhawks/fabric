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

    public function getPage(HTTPRequest $request)
    {
        $pageId = $request->param('ID');
        $className = $request->param('ClassName');
        return $this->fabricator->getPageInformation($className, $pageId);
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

    public function getDataObject(HTTPRequest $request)
    {
        $id = $request->getVar('id');
        if (!$id) {
            return 'error';
        }

        $body = [
            'HasMany' => [],
        ];


        $hasMany = $this->fabricator->getHasManyDetailsFromElementID($id);

        $body['HasMany'] = $hasMany;

        return json_encode($body);
    }

    // expects the body to contain an ID and data ob
    public function saveBlock(HTTPRequest $request)
    {
        $body = json_decode($request->getBody(), true);
        $id = (int) $body['id'];
        $data = $body['data'];
        $block = $this->fabricator->saveBlock($id, $data);

        // return $block;
    }

    public function getObjectById(HTTPRequest $request)
    {

    }
}
