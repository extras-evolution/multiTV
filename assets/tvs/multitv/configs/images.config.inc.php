<?php
$settings['display'] = 'vertical';
$settings['fields'] = array(
    'image' => array(
        'caption' => 'Image',
        'type' => 'image'
    ),
    'thumb' => array(
        'caption' => 'Thumbnail',
        'type' => 'thumb',
        'thumbof' => 'image'
    ),
    'title' => array(
        'caption' => 'Title',
        'type' => 'text'
    ),
    'legend' => array(
        'caption' => 'Legend',
        'type' => 'text'
    ),
    'author' => array(
        'caption' => 'Author',
        'type' => 'text'
    ),
    'id' => array(
        'caption' => 'ID',
        'type' => 'text',
        'default' => 'img{i}'
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
);
$settings['templates'] = array(
    'outerTpl' => '<div class="images">[+wrapper+]</div>',
    'rowTpl' => '<div class="image"><div class="copyrightwrapper"><img src="[+image+]" alt="[+legend+]" title="[+title+]" />[+author:ne=``:then=`<p class="copyright">[+author+]</p>`+]</div>[+legend:ne=``:then=`<p class="legend">[+legend:nl2br+]</p>`+]</div>'
);
