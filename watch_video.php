<?php

/**
 * File: watch_video
 * Description: FIle used to display watch video page
 * @author: Arslan Hassan, Saqib Razzaq
 * @since: 2007
 * @website: clip-bucket.com
 * @modified: Feb 26, 2016 ClipBucket 2.8.1 [ Saqib Razzaq ]
 */

define("THIS_PAGE", 'watch_video');
define("PARENT_PAGE", 'videos');
require 'includes/config.inc.php';
global $cbvid, $Cbucket;
//$userquery->perm_check('view_video', true);
$pages->page_redir();

$vkey = @$_GET['v'];
$vkey = mysql_clean($vkey);

$vdo = $cbvid->get_video($vkey);

if (userid()) {
    $user_det = $userquery->get_user_details(userid());
}
else {
    $user_det = '';
}


//	$user_prof = $userquery->get_user_profile(userid());
if (!userid() && (($vdo['type'] == 'video' && (int)$vdo['start_paying'] == 0 && (float)$vdo['total_price'] > 0) || $vdo['allowed_verified'] == 'not_watch' || $vdo['type'] == 'ad')) {
    echo "<script>alert('You need to register to watch this video.');</script>";
    echo "<script>var baseurl = '$baseurl'; location.href = baseurl + '/signup.php';</script>";
    exit();
}

if ($user_det != '' && (int)userid() != 1 && $user_det['userid'] != $vdo['userid']) {

    if ((float)$user_det['balance'] <= 0 && $vdo['type'] == 'video' && (float)$vdo['price_per_sec'] > 0) {
        echo "<script>alert('You need to add funds to watch this video.');</script>";
        echo "<script>history.go(-1);</script>";
        exit();
    }

    $min_age = $vdo['allowed_min_age'];
    $max_age = $vdo['allowed_max_age'];
    $allowed_gender = $vdo['allowed_gender'];
    $allowed_country = $vdo['allowed_country'];
    $allowed_zipcode = $vdo['allowed_zipcode'];
    $allowed_verified = $vdo['allowed_verified'];

    $dob = $user_det['dob'];

    $dob_array = explode("-", $dob);

    //get age from dob
    $age = (date("md", date("U", mktime(0, 0, 0, $dob_array[1], $dob_array[2], $dob_array[0])))) > date("md")
        ? ((date("Y") - $dob_array[0]) - 1) : (date("Y") - $dob_array[0]);

    if ((int)$age < (int)$min_age) {
        echo "<script>alert('Only " . $min_age . "+ can watch this video.');</script>";
        echo "<script>history.go(-1);</script>";
        exit();
    }
    if ((int)$age > (int)$max_age && (int)$age < 65) {
        echo "<script>alert('Only " . $max_age . "- can watch this video.');</script>";
        echo "<script>history.go(-1);</script>";
        exit();
    }

    $gender = $user_det['sex'];

    if ($allowed_gender != 'both' && $gender != $allowed_gender) {
        echo "<script>alert('Only " . $allowed_gender . "s can watch this video.');</script>";
        echo "<script>history.go(-1);</script>";
        exit();
    }

    if ($Cbucket->configs['filter_location'] == 'current') $country = $user_det['current_country'];
    else if ($Cbucket->configs['filter_location'] == 'profile') $country = $user_det['country'];

    if ($allowed_country != 'all' && $country != $allowed_country) {
        echo "<script>alert('Only " . $allowed_country . " users can watch this video.');</script>";
        echo "<script>history.go(-1);</script>";
        exit();
    }

    if ($vdo['remaining_price'] != null && (float)$vdo['remaining_price'] <= (float)$vdo['price_per_sec']) {
        echo "<script>alert('This campaign budget has ended');</script>";
        echo "<script>history.go(-1);</script>";
        exit();
    }
    if ($allowed_verified == 'not_watch' && userid() == NULL) {
        echo "<script>alert('You can not watch this video. You need to register your profile to watch and get paid.');</script>";
        echo "<script>history.go(-1);</script>";
        exit();
    }
//        }
}

$attachments = $cbvid->get_video_attachments($vdo['videoid']);

$cbvid->update_comments_count($vdo['videoid']);
$assign_arry['vdo'] = $vdo;

$assign_arry['attachments'] = $attachments;

if (video_playable($vdo)) {
    //Checking for playlist
    $pid = (int)$_GET['play_list'];
    if (!empty($pid)) {
        $plist = get_playlist($pid);
        if ($plist) {
            $assign_arry['playlist'] = $plist;
        }
    }
    //Calling Functions When Video Is going to play
    call_watch_video_function($vdo);
    subtitle(ucfirst($vdo['title']));
} else {
    $Cbucket->show_page = false;
}



//Return category id without '#'
$v_cat = $vdo['category'];
if ($v_cat[2] == '#') {
    $video_cat = $v_cat[1];
} else {
    $video_cat = $v_cat[1] . $v_cat[2];
}
$vid_cat = str_replace('%#%', '', $video_cat);
#assign('vid_cat',$vid_cat);
$assign_arry['vid_cat'] = $vid_cat;
$title = $vdo['title'];
$tags = $vdo['tags'];
$videoid = $vdo['videoid'];
$type = $vdo['type'];
$related_videos = get_videos(array('title' => $title, 'tags' => $tags, 'type' => $type,
    'exclude' => $videoid, 'show_related' => 'yes', 'limit' => 12, 'order' => 'RAND()'));
if (!$related_videos) {
    $relMode = "ono";
    $related_videos = get_videos(array('exclude' => $videoid, 'limit' => 12, 'order' => 'date_added DESC'));
}
if (userid()){
    $playlist = $cbvid->action->get_playlist($pid, userid());
    $assign_arry['playlist'] = $playlist;
}

//Getting Playlist Item
$items = $cbvid->get_playlist_items($pid, 'playlist_items.date_added DESC');
$assign_arry['items'] = $items;
$assign_arry['videos'] = $related_videos;
$assign_arry['relMode'] = $relMode;

if (userid()){
    $query = "SELECT * FROM " . tbl("transfer") . " WHERE userid=" . userid() . " AND videoid=" . $videoid . " ORDER BY id DESC LIMIT 1";
    $result = db_select($query);

    if (count($result) == 0) $paid_time = 0;
    else $paid_time = $result[0]['total_paid_time'];
}
else {
    $paid_time = 0;
}

$assign_arry['already_paid_time'] = $paid_time;

# assigning all variables
array_val_assign($assign_arry);
template_files('watch_video.html');
display_it();
?> 