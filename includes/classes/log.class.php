<?php

/**
 * This class is used to keep details of each action done on a website using Clipbucket
 * this will manage log of each possible action 
 * @ Author : Arslan Hassan
 * @ since : June 14, 2009
 * @ ClipBucket : v2.x
 * @ License : Attribution Assurance License -- http://www.opensource.org/licenses/attribution.php
 * logging types
 * - login
 * - signup
 * - upload_video
 * - add_group
 * - add_friend
 * - video_comment
 * - profile_comment
 * - profile_update
 * - add_playlist
 * - add_topic
 * - subscribe
 * - add_favorite
 */


class CBLogs
{
	
	
	/**
	 * Function used to insert log
	 * @param VARCHAR $type, type of action
	 * @param ARRAY $details_array , action details array
	 */
	function insert($type,$details_array)
	{
		global $db,$userquery;
		$a = $details_array;
		$ip = $_SERVER['REMOTE_ADDR'];
		/*$ipv = $this->get_local_ipv4();
		if($ipv['eth0']){
			$ip = $ipv['eth0'];
		}
		if($ipv['wlan0']){
			$ip = $ipv['wlan0'];
		}*/
//		$agent = $_SERVER['HTTP_USER_AGENT'];


		//		UPDATED BY RICKY KEELE
        function getOS() {

            $user_agent = $_SERVER['HTTP_USER_AGENT'];

            $os_platform =   "Ricky";
            $os_array =   array(
                '/windows nt 10/i'      =>  'Windows 10',
                '/windows nt 6.3/i'     =>  'Windows 8.1',
                '/windows nt 6.2/i'     =>  'Windows 8',
                '/windows nt 6.1/i'     =>  'Windows 7',
                '/windows nt 6.0/i'     =>  'Windows Vista',
                '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
                '/windows nt 5.1/i'     =>  'Windows XP',
                '/windows xp/i'         =>  'Windows XP',
                '/windows nt 5.0/i'     =>  'Windows 2000',
                '/windows me/i'         =>  'Windows ME',
                '/win98/i'              =>  'Windows 98',
                '/win95/i'              =>  'Windows 95',
                '/win16/i'              =>  'Windows 3.11',
                '/macintosh|mac os x/i' =>  'Mac OS X',
                '/mac_powerpc/i'        =>  'Mac OS 9',
                '/linux/i'              =>  'Linux',
                '/ubuntu/i'             =>  'Ubuntu',
                '/iphone/i'             =>  'iPhone',
                '/ipod/i'               =>  'iPod',
                '/ipad/i'               =>  'iPad',
                '/android/i'            =>  'Android',
                '/blackberry/i'         =>  'BlackBerry',
                '/webos/i'              =>  'Mobile'
            );

            foreach ( $os_array as $regex => $value ) {
                if ( preg_match($regex, $user_agent ) ) {
                    $os_platform = $value;
                }
            }
            return $os_platform;
        }


        function getBrowser() {
            $user_agent = $_SERVER['HTTP_USER_AGENT'];

            $browser        = "Ricky";
            $browser_array  = array(
                '/msie/i'       =>  'Internet Explorer',
                '/firefox/i'    =>  'Firefox',
                '/safari/i'     =>  'Safari',
                '/chrome/i'     =>  'Chrome',
                '/edg/i'       =>  'Edge',
                '/opr/i'      =>  'Opera',
                '/netscape/i'   =>  'Netscape',
                '/maxthon/i'    =>  'Maxthon',
                '/konqueror/i'  =>  'Konqueror',
                '/mobile/i'     =>  'Handheld Browser'
            );

            foreach ( $browser_array as $regex => $value ) {
                if ( preg_match( $regex, $user_agent ) ) {
                    $browser = $value;
                }
            }
            return $browser;
        }

        $OS = getOS();

        $browser = getBrowser();
        //End

		$userid = getArrayValue($a, 'userid');
		$username = $a['username'];
		$useremail = getArrayValue($a, 'useremail');
		$userlevel = getArrayValue($a, 'userlevel');
		
		$action_obj_id = getArrayValue($a, 'action_obj_id');
		$action_done_id = getArrayValue($a, 'action_done_id');
		
		$userid = $userid ? $userid : $userquery->udetails['userid'];
		$username = $username ? $username : $userquery->udetails['username'];
		$useremail = $useremail ? $useremail : $userquery->udetails['email'];
		$userlevel = $userlevel ? $userlevel : getArrayValue($userquery->udetails, 'level');
		
		$success = $a['success'];
		$details = getArrayValue($a, 'details');
		 
		$db->insert(tbl('action_log'),
		array
		(
		'action_type',
		'action_username',
		'action_userid',
		'action_useremail',
		'action_ip',
		'action_browser',
		'action_OS',
		'date_added',
		'action_success',
		'action_details',
		'action_userlevel',
		'action_obj_id',
		'action_done_id',
		),
		array
		(
		$type,
		$username,
		$userid ,
		$useremail,
		$ip,
		$browser,
		$OS,
		NOW(),
		$success,
		$details,
		$userlevel,
		$action_obj_id,
		$action_done_id
		)
		);
					  
	 }

	 function get_local_ipv4() {
  		$out = split(PHP_EOL,shell_exec("/sbin/ifconfig"));
		$local_addrs = array();
		$ifname = 'unknown';
		foreach($out as $str) {
		   $matches = array();
		    if(preg_match('/^([a-z0-9]+)(:\d{1,2})?(\s)+Link/',$str,$matches)) {
		      $ifname = $matches[1];
		      if(strlen($matches[2])>0) {
		        $ifname .= $matches[2];
		      }
		    } elseif(preg_match('/inet addr:((?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:[.](?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3})\s/',$str,$matches)) {
		      $local_addrs[$ifname] = $matches[1];
		    }
		  }
		  return $local_addrs;
		}
	 
}

?>