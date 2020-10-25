<?php

include('../includes/config.inc.php');


$userid = userid();

$user_det = $userquery->get_user_details(userid());
$user_name = $user_det['username'];

if ($_POST['updated_balance']) {
$updated_balance = $_POST['updated_balance'];
$amount = $_POST['amount'];

$query = "UPDATE " . tbl("users") . " SET balance = ".$updated_balance."  WHERE userid = ".(int)$userid;
$db->Execute($query);

$query1 = "INSERT INTO " . tbl("transfer") . "(userid, username, amount, balance, transfer_type) VALUES(".$userid.", '".$user_name."', ".$amount.", ".$updated_balance.", 'deposit')";
$db->Execute($query1);

echo $query1;
}
else {
    echo 'false';
}

?>