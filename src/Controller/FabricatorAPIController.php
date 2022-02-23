<?php

namespace SilverStripe\Fabricator\Controller;

use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Dev\Debug;
use SilverStripe\Fabricator\Service\APIService;
use SilverStripe\ORM\DataObject;

class FabricatorAPIController extends Controller {

    private APIService $service;

    private static $allowed_actions = [
        'getPage',
        'getDataObject',
    ];

    public function init() {
        parent::init();
        $this->service = new APIService();
    }

    public function getPageInformation(HTTPRequest $request)
    {
        $pageId = $request->param('ID');
        $className = $request->param('ClassName');
        $pageObjects = $this->service->getPageObjects($className, $pageId);
        return $pageObjects;
    }

    public function getObjectById(HTTPRequest $request)
    {

    }
}
