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
    define('SUB_PAGE', 'price');
}

$userquery->login_check('admin_access');

if (isset($_POST['video_fee'])) {


    $video_fee = $_POST['video_fee'];

    $query = "UPDATE " . tbl("config") . " SET value = '".$video_fee."'  WHERE name = 'video_fee'";
    $db->Execute($query);

    echo $query;

    exit();

}

subtitle("Manage Price");
template_files('manage_price.html');
display_it();
?>