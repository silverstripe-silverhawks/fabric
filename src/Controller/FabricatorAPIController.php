<?php

namespace SilverStripe\Fabricator\Controller;

use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Dev\Debug;
use SilverStripe\Fabricator\Service\APIService;
use SilverStripe\Fabricator\Controller\Fabricator;
use SilverStripe\ORM\DataObject;

class FabricatorAPIController extends Controller {

    private APIService $service;

    private static $allowed_actions = [
        'getPage',
        'getDataObject',
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

    public function getObjectById(HTTPRequest $request)
    {

    }
}
