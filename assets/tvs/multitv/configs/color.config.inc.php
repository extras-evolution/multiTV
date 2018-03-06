<?php
$settings['display'] = 'vertical';
$settings['fields'] = array(
    'name' => array(
        'caption' => 'Name',
        'type' => 'text'
    ),
    'color' => array(
        'caption' => 'Color',
        'type' => 'color'
    )
);
$settings['templates'] = array(
    'outerTpl' => '<div class="items">[+wrapper+]</div>',
    'rowTpl' => '<div class="item">[+name+] - [+color+]</div>'
);
