<?php

namespace SilverStripe\Fabricator\Controller;

use DNADesign\Elemental\Services\ElementTypeRegistry;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Fabricator\Controller\Fabricator;
use SilverStripe\ORM\ArrayList;
use SilverStripe\View\ArrayData;
use SilverStripe\Dev\Debug;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\DataObjectSchema;

class FabricatorAPIController extends Controller
{
    private static $allowed_actions = [
        'getPage',
        'getBlockTypes',
        'getBlockSchema',
        'getBlock',
        'newBlock',
        'saveBlock',
    ];

    public function init()
    {
        parent::init();
        $this->fabricator = new Fabricator();
    }

    public function getPage(HTTPRequest $request)
    {
        $pageId = $request->param('ID');
        $className = $request->param('ClassName');
        return $this->fabricator->getPageInformation($className, $pageId);
    }

    /**
     * Get json object of block types
     */
    public function getBlockTypes(HTTPRequest $request): string
    {
        $definitions = ElementTypeRegistry::generate()->getDefinitions();

        $blockTypes = ArrayList::create();

        foreach ($definitions as $key => $value) {
            $blockTypes->add(ArrayData::create([
                'Title' => $value['title'],
                'Icon' => $value['icon'],
                'Class' => $value['class'],
            ]));
        }

        return json_encode($blockTypes->toNestedArray());
    }

    public function getBlockSchema(HTTPRequest $request)
    {
        $id = $request->getVar('blockType');

        // $className = ElementTypeRegistry::generate()->getDefinition($id)['class'];

        Debug::dump($className);
    }

    public function getBlock(HTTPRequest $request)
    {
        $id = $request->getVar('id');
        if (!$id) {
            return 'error';
        }

        $relations = $this->fabricator->getRelationDetails($id);

        return json_encode($relations);
    }

    public function newBlock(HTTPRequest $request)
    {
        $elementalAreaId = $request->getVar('elementalAreaId');
        $blockType = $request->getVar('blockType');
        $className = str_replace('\\\\', '\\', $blockType);
        $blockExists = ClassInfo::exists($className);

        if (!$blockExists) {
            return 'error';
        }

        $instance = Injector::inst()->get($className, false);
        $instance->Title = 'Title';
        $instance->ParentID = 1;
        $instance->write();
        $instance->publishSingle();


        return 'Hello';
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
}
