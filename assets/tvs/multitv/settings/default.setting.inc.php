<?php
$settings['css'] = array(
	'css/jquery-ui-1.10.4.custom.css',
	'css/multitv.css',
  'css/colorpicker.css'
);

// Check for ManagerManager
$res = $this->modx->db->select('*', $this->modx->getFullTableName('site_plugins'), 'name="ManagerManager" AND disabled=0 ');
$mmActive = $this->modx->db->getRow($res);
$settings['scripts'] = array();
$settings['scripts'] = array_merge($settings['scripts'], array(
	'js/jquery-json-2.4.min.js',
	'js/jquery-ui-1.10.4.custom.min.js',
	'js/jquery-ui-timepicker-addon.js',
	'js/jquery-field-0.9.7.min.js',
  'js/colorpicker.js'
		)
);