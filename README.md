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

1. download and place in assets\lib\cropper\ files from https://github.com/fengyuanchen/cropperjs
2. update tvs\multitv
3. create/update any config.inc.php to use new type "crop"

As a result, you will get the parameters in the form of a string that can be substituted into phpthumb to crop the image (using snippet, etc.).

Example:
let [+img16x9+] be 'x:18,y:216,width:918,height:516'

[[to_hpthumb?&imgRatio=`[+img16x9+]`]]
<?php
return str_replace(array(':', 'x', 'y', 'width', 'height'), array('=', 'sx', 'sy', 'sw', 'sh'), $imgRatio);

get correct options for phpThumb sx=18,sy=216,sw=918,sh=516

Translated with www.DeepL.com/Translator (free version)
