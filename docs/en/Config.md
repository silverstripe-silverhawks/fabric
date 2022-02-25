# Configuration (Draft)

In your website project place the following into your yml file

routes.yml
```yml
---
Name: approutes
After:
  - '#rootroutes'
  - '#coreroutes'
---
SilverStripe\Control\Director:
  rules:
    'fabricator/api//$Action': SilverStripe\Fabricator\Controller\FabricatorAPIController
```

Then add this in extensions.yml
```
PageController:
  extensions:
    - SilverStripe\Fabricator\Extension\FabricatorExtension
```


You can restrict allowed fields that can be edited by either setting it in the Object or in the YML.

```
$fabricator_allowed = [
    'Title',
    'Content',
];
```
