<?php

namespace SilverStripe\Fabricator\Service;

use SilverStripe\Control\Controller;
use SilverStripe\Dev\Debug;
use SilverStripe\ORM\DataObject;

class APIService extends Controller
{
    public function index()
    {
        return 'Hello from the API';
    }

    public function getAllowedFieldsOnPage(string $className)
    {
        // $pageObjects = DataObject::get($className)->first()->toMap();
        $pageObjects = DataObject::get($className)->first()->fieldLabels();
        return $pageObjects;
    }

    public function getPageObjects(string $className, int $pageId)
    {
        $pageObjects = DataObject::get($className)->byID($pageId);
        Debug::dump($pageObjects->fieldLabels());
        return $pageObjects;
    }

    public function getObjectById(HTTPRequest $request)
    {

    }
}
