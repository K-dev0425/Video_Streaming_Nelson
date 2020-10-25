<?php

define('THIS_PAGE','deposit_fund');
//define("PARENT_PAGE","deposit_fund");
require 'includes/config.inc.php';
//$pages->page_redir();
subtitle('deposit_fund');

//Displaying The Template
template_files('deposit_fund.html');
display_it();

?>