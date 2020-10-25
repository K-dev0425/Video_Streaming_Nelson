<?php

#Including Main file and checking user level
require'../includes/admin_config.php';
$userquery->admin_login_check();
$pages->page_redir();

global $Cbucket;

/* Assigning page and subpage */
if(!defined('MAIN_PAGE')){
    define('MAIN_PAGE', 'Videos');
}
if(!defined('SUB_PAGE')){
    define('SUB_PAGE', 'filtering');
}

$userquery->login_check('admin_access');

if (isset($_POST['filter_location'])) {


        $filter_location = $_POST['filter_location'];

        $query = "UPDATE " . tbl("config") . " SET value = '".$filter_location."'  WHERE name = 'filter_location'";
        $db->Execute($query);

        echo true;

}

subtitle("Manage Filtering");
template_files('manage_filtering.html');
display_it();
?>