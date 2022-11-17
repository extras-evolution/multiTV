<?php
$filename = dirname(__FILE__) . '/ukrainian-utf8.language.inc.php';
$contents = file_get_contents($filename);
eval('?>' . $contents);
