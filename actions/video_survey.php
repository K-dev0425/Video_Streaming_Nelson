<?php

include('../includes/config.inc.php');

if (isset($_POST['videoid'])) {

    $userid = userid();
    $videoid = $_POST['videoid'];
    $answer_1 = $_POST['answer_1'];
    $answer_2 = $_POST['answer_2'];
    $answer_3 = $_POST['answer_3'];

    $answer_1_field = $answer_1.'_num';
    $answer_2_field = $answer_2.'_num';
    $answer_3_field = $answer_3.'_num';

    $query = "UPDATE " . tbl("video") . " SET `{$answer_1_field}` = `{$answer_1_field}`+1, `{$answer_2_field}` = `{$answer_2_field}`+1, `{$answer_3_field}` = `{$answer_3_field}`+1 WHERE videoid = ".(int)$videoid;
    $db->Execute($query);

    $query1 = "INSERT INTO " . tbl("video_survey") . "(userid, videoid, answer_1, answer_2, answer_3) VALUES(".$userid.", ".$videoid.", '".$answer_1."', '".$answer_2."', '".$answer_3."')";

    echo $query;
}

?>