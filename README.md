# multiTV custom template variable

Custom Template Variabe containing a sortable multi item list or a datatable for the Evolution CMS content management framework

## Features

With this Evolution CMS package a new template variable type is introduced. The template variable could contain a sortable multi item list or a datatable.

Documentation could be found on http://docs.evo.im/en/04_extras/multitv.html

## new type "crop"
new type "crop" uses Cropper.js to get parameters for further use with phpthumb.

example of configuration in images.config.inc.php

    'image' => array(
        'caption' => 'Image',
        'type' => 'image'
    ),
    'img16x9' =>array (
        'caption' => 'Ratio 16x9',
        'type' => 'crop',
        'cropof' => 'image'
    ),
    'img4x3' =>array (
        'caption' => 'Ratio 4x3',
        'type' => 'crop',
        'cropof' => 'image'
    ),
    'img1x1' =>array (
        'caption' => 'Ratio 1x1',
        'type' => 'crop',
        'cropof' => 'image'
    ),
    'img2x3' =>array (
        'caption' => 'Ratio 2x3',
        'type' => 'crop',
        'cropof' => 'image'
    ),
where,
imgNxN - name that will be used as aspectRatio of Cropper.js initialization,
cropof - image field

1. update tvs\multitv
2. create/update any config.inc.php to use new type "crop"

As a result, in back-end you can edit images and set four aspect ratio for each image
after that you can get this ratio and pass to your image proccessor like phpthumb to crop the image (using snippet, php class, etc.).

### Theory:
MultiTV stored image`s ratio in database as 
```
{"fieldValue":[
{"fieldTab":"",
"image":"assets/images/img1.jpg",
"img16x9":"x:12,y:108,width:967,height:543",
"img4x3":"x:4,y:108,width:967,height:725",
"img1x1":"x:5,y:106,width:967,height:967",
"img2x3":"x:65,y:33,width:826,height:1239",
"id":"img1"
}
]}
```

get this ratio raw json via db helper or MultiTV method
for phpThumb crop function correct argument is 'sx=12,sy=108,sw=967,sh=543'
we can convert "x:12,y:108,width:967,height:543" to "sx=12,sy=108,sw=967,sh=543"
and pass this to phpThumb class

### Create Snippet
if you use phpthumb for front-end create snippet 'getImage' like this:
```
require_once MODX_BASE_PATH .'/assets/snippets/phpthumb/phpthumb.class.php';

$img_source = null;
$img_ration = null;
 
//get raw image`s ratio from db or use multitv method
$modxobject = $modx->getDocumentObject('id', 3, true);

$_images = json_decode($modxobject['goods_images'][1], true);
foreach ($_images['fieldValue'] as $item) {
if (isset($item['image'])) {
  $img_source = $item['image'];
  $img_ratio = $item[$ratio] ?? null;
  break; // get only one image for sample
}
}

//convert multitv image`s data for use in phpthub class
$img_ratio = str_replace(array(':', 'x', 'y', 'width', 'height',','), array('=', 'sx', 'sy', 'sw', 'sh','&'), $img_ratio);
//w & h is image`s output size. you can change this or add your own variables when calling the snippet and replace them here.
$img_params = str_replace('img_ratio',$img_ratio,'q=80&w=450&h=253&img_ratio'); 

parse_str($img_params,$_params);

$path_parts = pathinfo($img_source);
$path = $path_parts['dirname'];

$outputFilename = $path_parts['basename']; // generate public image`s filename here
$defaultCacheFolder = 'assets/cache/';

$path = $defaultCacheFolder . $ratio . '/' . $path;
if (!file_exists($path) && mkdir($path,0755,true) && is_dir($path)) {
    chmod($path, 0755);
}

$phpThumb = new phpthumb();
$phpThumb->config_cache_directory = MODX_BASE_PATH . $defaultCacheFolder;
$phpThumb->config_temp_directory = $defaultCacheFolder;
$phpThumb->config_document_root = MODX_BASE_PATH;
$phpThumb->setSourceFilename(MODX_BASE_PATH . $img_source);

foreach ($_params as $key => $value) {
    $phpThumb->setParameter($key, $value);
}

if ($phpThumb->GenerateThumbnail()) {
	$phpThumb->RenderToFile(MODX_BASE_PATH . $path . $outputFilename);
} 

return  $path . $outputFilename;
```

### Call snippet in front-end

```
[!getImage? &ratio=`img16x9`!]
[!getImage? &ratio=`img4x3`!]
```
or
```
<img src="[!getImage? &ratio=`img16x9`!]">
<img src="[!getImage? &ratio=`img4x3`!]">
```
