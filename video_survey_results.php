<?php

//define("THIS_PAGE","video_survey_results");
#Including Main file and checking user level
require 'includes/config.inc.php';
//$userquery->admin_login_check();
$pages->page_redir();


/* Assigning page and subpage */
if(!defined('MAIN_PAGE')){
    define('MAIN_PAGE', 'video_survey_results');
}
if(!defined('SUB_PAGE')){
    define('SUB_PAGE', 'video_survey_results');
}

//$userquery->login_check('admin_access');

if ($_GET['vid']) {

    $videoid = $_GET['vid'];

    $query = "SELECT * FROM ".tbl("video")." WHERE videoid=".(int)$videoid;
    $video_det = db_select($query);

    Assign('video', $video_det);
    Assign('videoid', $videoid);

}

subtitle("Survey Result");
template_files('video_survey_results.html');
display_it();
?>