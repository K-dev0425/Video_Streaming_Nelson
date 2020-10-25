<?php

include('../includes/config.inc.php');

$userid = userid();

//$user_det = $userquery->get_user_details(userid());
//$user_name = $user_det['username'];

if ($_POST['paid_time']) {
    $paid_time = $_POST['paid_time'];
    $paid_amount = $_POST['paid_amount'];
    $paid_amount1 = $_POST['paid_amount1'];
    $videoId = $_POST['videoId'];
    $videoOwnerId = $_POST['videoOwnerId'];
    $username = $_POST['username'];
    $ownername = $_POST['ownername'];
    $updated_balance = $_POST['updated_balance'];
    $updated_balance1 = $_POST['updated_balance1'];
    $already_paid_time = $_POST['already_paid_time'];
    $transfer_type = $_POST['transfer_type'];

    $total_paid_time = (int)$already_paid_time + (int)$paid_time;

    $query = "UPDATE " . tbl("users") . " SET balance = ".$updated_balance."  WHERE userid = ".(int)$userid;
    $db->Execute($query);

    if ($updated_balance1 != 'no') {
        $query_owner = "UPDATE " . tbl("users") . " SET balance = ".$updated_balance1."  WHERE userid = ".(int)$videoOwnerId;
        $db->Execute($query_owner);

        $query1_owner = "INSERT INTO " . tbl("transfer") . " (userid, username, user_type, videoid, paid_time, amount, total_paid_time, balance, transfer_type) VALUES(".$videoOwnerId.", '".$ownername."', 'uploader', ".$videoId.", ".$paid_time.", ".$paid_amount1.", '', ".$updated_balance1.", '".$transfer_type."')";
        $db->Execute($query1_owner);
    }
    else {
        $query_remaining_price = "UPDATE " . tbl("video") . " SET remaining_price = remaining_price - ". (float)$paid_amount1 . " WHERE videoid = " . (int)$videoId;
        $db->Execute($query_remaining_price);
    }

    $query1 = "INSERT INTO " . tbl("transfer") . " (userid, username, user_type, videoid, paid_time, amount, total_paid_time, balance, transfer_type) VALUES(".$userid.", '".$username."', 'viewer', ".$videoId.", ".$paid_time.", ".$paid_amount.", ".$total_paid_time.", ".$updated_balance.", '".$transfer_type."')";
    $db->Execute($query1);

    echo $updated_balance;
}
else {
    echo 'false';
}

?>