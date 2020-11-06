function headerFooter()
{
	var headerheight = "";
	var footerheight = "";
	var cont_height = "";
	var cont_height_new = "";
	cont_height = $("#container").height();
	headerheight = $("#header").outerHeight();
	footerheight = $("#footer").outerHeight();
	/*console.log('headerheight=>'+headerheight+',footerheight=>'+footerheight);
	console.log("cont_height"+cont_height)*/
	cont_height_new = cont_height - (headerheight + footerheight);
	/*console.log("cont_height_new"+cont_height_new)*/
	$("#container").css('padding-top',headerheight+'px');
	$("#container").css('padding-bottom',footerheight+'px');

	$(".account-container, .page-error").css('height',cont_height_new+'px');
	
}

function shortKeys() {
	$(document).keypress(function (e) {
		var key = e.which;
		if  ($('#query,textarea,#name,#email').is(":focus")) {
			// typing in field so shutup
		} else {
			if (pageNow == 'index') {
				if(e.which == 70 && e.shiftKey)  // shift + f = featured load more
				{
				   $('#featured_load_more').trigger("click");
				}

				if(e.which == 82 && e.shiftKey)  // shift + r = recent load more
				{
				   $('#recent_load_more').trigger("click");
				}
			} else if (pageNow == 'watch_video') {
				if(e.which == 70 && e.shiftKey)  // shift + f = featured load more
				{
				   $('.icon-plusrounded').trigger("click");
				   $('#addfav').trigger("click");
				}
				if(e.which == 82 && e.shiftKey)  // shift + r = recent load more
				{
				   $('.icon-flag').trigger("click");
				}

				if(e.which == 84 && e.shiftKey)  // shift + r = recent load more
				{
					$('#comment_box').focus().select();
				}

				if(e.which == 69 && e.shiftKey)  // shift + r = recent load more
				{
					$('.icon-share').trigger("click");
				}
			}

			if(e.which == 83 && e.shiftKey)  // shift + s = search something
			{
			   $('#query').focus().select();
			}

			if(e.which == 86 && e.shiftKey)  // shift + v = videos page
			{
			   window.location.href = baseurl+"/videos";
			}

			if(e.which == 80 && e.shiftKey)  // shift + p = photos page
			{
			   window.location.href = baseurl+"/photos";
			}

			if(e.which == 67 && e.shiftKey)  // shift + c = collections page
			{
			   window.location.href = baseurl+"/collections";
			}

			if(e.which == 85 && e.shiftKey)  // shift + u = channel page
			{
			   window.location.href = baseurl+"/channels";
			}
		}

	});  
}

var flag = 0;
function responsiveFixes(){
	var WinWidth = $(window).width();
	//console.log(WinWidth);
	var SearchHtml = $("#header .menu-holder .user_menu").html();
	var navseach = $('#header .navbar-header');
	var menuLinks = $("#header .menu-holder");

	if (WinWidth <992)
	{
		var length1 = navseach.find('.user_menu').length;
		if(length1==0)
		{
			$(navseach).append('<div class="col btn-holder user_menu text-right logged-out">'+SearchHtml+"</div>");
		}
		$('.menu-holder').find('.user_menu').remove();
	}
	else
	{
		var searchBtns = navseach.find('.user_menu').html();
		var length2 = menuLinks.find('.user_menu').length;

		if(length2==0)
		{
			menuLinks.append('<div class="col btn-holder user_menu text-right logged-out">'+searchBtns+"</div>");
		}
		navseach.find('.user_menu').remove();

	}
	if( WinWidth <1280 )
	{
		$(".btn-newacc").html("Signup");
	}
	else
	{
		$(".btn-newacc").html("Create new account");
	}

	if(userid)
	{
		$(".user_menu").addClass('logged-in');
		$(".user_menu").removeClass('logged-out');
	}
	else{
		$(".user_menu").removeClass('logged-in');
		$(".user_menu").addClass('logged-out');
	}

	if( WinWidth <768 )
	{
		var length3 = $('.menu-holder').find('.newuser-links').length;
		if(length3==0)
		{
			var rightLinkHtml = $('.navbar-right').html();
			$('.menu-holder').prepend("<ul class='newuser-links'>"+rightLinkHtml+"</ul>");
			$('.navbar-right').remove();
		}
	}
	else{
		var length4 = $('.user_menu').find('.right-menu').length;
		if(length4==0)
		{	
			var newLinkHtml = $('.newuser-links').html();
			$('.user_menu').append("<ul class='nav navbar-nav navbar-right right-menu'>"+newLinkHtml+"</ul>");
			$('.newuser-links').remove();
		}
	}
}

// automatically scrolls to new loaded videos
function thakkiLoading(yawnTo) {
	$("html, body").animate({ scrollTop: yawnTo}, 1900, "swing");
}

function preLoadingBlock(){
	//two videos in a row
	var ftthumbWidth = $('.featured-videos .thumb-video').width();
	var	ftthumbHeight = ftthumbWidth * (10/16);
	$(".featured-videos .thumb-video").css('height', ftthumbHeight+'px');
	//three videos in a row
	var thumbWidth = $('.videos .thumb-video').width();
	var	thumbHeight = thumbWidth * (10/16);
	$(".videos .thumb-video").css('height', thumbHeight+'px');
}
function loginHeight(){
	var loginHeight = $("#login_form").outerHeight();
	loginHeight = loginHeight - 40;
	$(".account-holder .side-box").css('height', loginHeight+'px');
}
$(document).ready(function(){
	//footer at bototm
	headerFooter();
	if(userid)
	{
		$(".user_menu").addClass('logged-in');
		$(".user_menu").removeClass('logged-out');
	}
	else{
		$(".user_menu").removeClass('logged-in');
		$(".user_menu").addClass('logged-out');
	}
	responsiveFixes();

	$(".navbar-sm-login-links a").click(function(){
		$("body").removeClass('sideactive');
	});

	var havechild = $('.adbox-holder').children().length;

	if (havechild == 0){
		$('.adbox-holder').hide();
	}

	$(".btn-search-toggle").click(function() {
		$(".navbar-header").toggleClass('show-search');
	});
	loginHeight();
});


function homePageVideos(qlist_items) {
	$('#container').on("click","#recent_load_more, #featured_load_more, #recentads_load_more, #recentaudiobooks_load_more, #recentpodcasts_load_more", function(){

		var balance = '';
		if ($('#header_price').length === 1) {
            balance = $('#header_price').text();
			balance = balance.replace('$', '').replace(' USD', '');
		}

		var loadLink = baseurl + '/ajax/home.php',
		main_object = $(this),
		sendType = 'post',
		dataType = 'html',
		loadType = $(main_object).attr('loadtype'),
		loadMode = $(main_object).attr('loadmode'),
		// loadLimit = $(main_object).attr('loadlimit');alert(loadType);

		loadLimit = '1000',
		loadHit = $(main_object).attr('loadhit');

		newloadHit = parseInt(loadHit) + 1;
		moreRecent = true;
		moreFeatured = true;
		moreRecentAds = true;
		moreRecentAudiobooks = true;
		moreRecentPodcasts = true;

		featuredFound = '';
		if (loadHit == 1) {
			recentFound = 6;
			featuredFound = 4;
		} else {
			featuredSect = $('#container').find('#total_videos_featured').text();
			recentSect = $('#container').find('#total_videos_recent').text();
			recentAdSect = $('#container').find('#total_ads_recent').text();
			recentAudiobookSect = $('#container').find('#total_audiobooks_recent').text();
			recentPodcastSect = $('#container').find('#total_podcasts_recent').text();

			totalFeaturedVids = featuredSect;
			totalRecentVids = recentSect;
			totalRecentAds = recentAdSect;
			totalRecentAudiobooks = recentAudiobookSect;
			totalRecentPodcasts = recentPodcastSect;

			featuredShown = loadHit * loadHit - loadLimit;
			recentShown = loadHit * loadHit - loadLimit;
			recentAdShown = loadHit * loadHit - loadLimit;
			recentAudiobookShown = loadHit * loadHit - loadLimit;
			recentPodcastShown = loadHit * loadHit - loadLimit;

			gotMoreFeatured = parseInt(totalFeaturedVids) - parseInt(featuredShown);
			gotMoreRecent = parseInt(totalRecentVids) - parseInt(recentShown);
			gotMoreRecentAd = parseInt(totalRecentAds) - parseInt(recentAdShown);
			gotMoreRecentAudiobook = parseInt(totalRecentAudiobooks) - parseInt(recentAudiobookShown);
			gotMoreRecentPodcast = parseInt(totalRecentPodcasts) - parseInt(recentPodcastShown);

			if (gotMoreFeatured > 2) {
				featuredFound = 2;
			} else {
				moreFeatured = false;
				featuredFound = gotMoreFeatured;
			}

			if (gotMoreRecent > 6) {
				recentFound = 3;
			} else {
				moreRecent = false;
				recentFound = gotMoreRecent;
                // $('#recentads_load_more').trigger("click");
                // $('#recentads_load_more').hide();
			}

			if (gotMoreRecentAd > 6) {
                recentFound = 3;
			} else {
				moreRecentAds = false;
				recentFound = gotMoreRecentAd;
			}

            if (gotMoreRecentAudiobook > 6) {
                recentFound = 3;
            } else {
                moreRecentAudiobooks = false;
                recentFound = gotMoreRecentAudiobook;
            }

            if (gotMoreRecentPodcast > 6) {
                recentFound = 3;
            } else {
                moreRecentPodcasts = false;
                recentFound = gotMoreRecentPodcast;
            }
		}

        $.ajax({
			url: loadLink,
			type: sendType,
			dataType: dataType,
			data: {
				"load_type":loadType,
				"load_mode":loadMode,
				"load_limit":loadLimit,
				"load_hit":loadHit,
				"balance":balance
			},

			beforeSend: function() {
				// setting a timeout
				$(main_object).attr('disabled','disabled');
				$(main_object).text("Loading..");
				if (loadType != 'count') {
					if (loadMode == 'featured') {
						var currWidth = $(window).width();
						if (loadHit >= 2 && currWidth > 767) {
							var moveTo = $( ".featAppending" ).last().offset().top;
							thakkiLoading(moveTo);
						}
					}
					else if (loadMode == 'recent_ad') {
						preLoadingBlock();
                        var currWidth = $(window).width();
						if (loadHit >= 2 && currWidth > 767) {
							var moveTo = $("#recentads_pre").last().offset().top();
							thakkiLoading(moveTo);
						}
                    }
                    else if (loadMode == 'recent_audiobook') {
                        preLoadingBlock();
                        var currWidth = $(window).width();
                        if (loadHit >= 2 && currWidth > 767) {
                            var moveTo = $("#recentaudiobooks_pre").last().offset().top();
                            thakkiLoading(moveTo);
                        }
                    }
                    else if (loadMode == 'recent_podcast') {
                        preLoadingBlock();
                        var currWidth = $(window).width();
                        if (loadHit >= 2 && currWidth > 767) {
                            var moveTo = $("#recentpodcasts_pre").last().offset().top();
                            thakkiLoading(moveTo);
                        }
                    }
					else {
						preLoadingBlock();
						var currWidth = $(window).width();
						if (loadHit >= 2 && currWidth > 767) {
							var moveTo = $( "#recent_pre" ).last().offset().top;
							thakkiLoading(moveTo);
						}
					}
				}
			},

			success: function(data) {

				$(main_object).removeAttr('disabled');
				$(main_object).text(loadMoreLang);

				if (data.length < 10) {
					$(main_object).remove();
					if (loadHit == 1) {
						//alert(loadMode);
						if (loadMode == 'featured') {
							for (var i = 0; i < featuredFound; i++) {
								$(document).find('#featured_pre').append('<div class="item-video col-lg-6 col-md-6 col-sm-6 col-xs-12"><div style="height:200px" class="thumb-video background-masker clearfix"></div></div>');
							}
							$('#featured_load_more').hide();
							$('#featured_pre').hide();
							$("#featured_vid_sec").html('<div class="break2"></div><span class="well well-info btn-block">'+langCo+'</span>');
							return false;
						} else if (loadMode == 'recent') {
							for (var i = 0; i < recentFound; i++) {
								$(document).find('#recent_pre').append('<div class="item-video col-lg-4 col-md-4 col-sm-4 col-xs-6"><div class="thumb-video background-masker clearfix"></div><div class="loadingInfo video-info relative clearfix"><div class="background-masker heading clearfix"></div><div class="background-masker paragraph clearfix"></div><div class="background-masker clearfix views-date"></div></div></div>');
							}
							$('#recent_load_more').remove();
							$('#recent_pre').remove();
							$("#recent_vids_sec").html('<div class="break2"></div><span class="well well-info btn-block">'+noRecent+'</span>');
							return false;
						}
						else if (loadMode == 'recent_ad') {
							for (var i = 0; i < recentFound; i++) {
                                $(document).find('#recentads_pre').append('<div class="item-video col-lg-4 col-md-4 col-sm-4 col-xs-6"><div class="thumb-video background-masker clearfix"></div><div class="loadingInfo video-info relative clearfix"><div class="background-masker heading clearfix"></div><div class="background-masker paragraph clearfix"></div><div class="background-masker clearfix views-date"></div></div></div>');
							}
                            $('#recentads_load_more').remove();
                            $('#recentads_pre').remove();
                            $("#recent_ads_sec").html('<div class="break2"></div><span class="well well-info btn-block">'+noRecent+'</span>');
                            return false;
						}
                        else if (loadMode == 'recent_audiobook') {
                            for (var i = 0; i < recentFound; i++) {
                                $(document).find('#recentaudiobooks_pre').append('<div class="item-video col-lg-4 col-md-4 col-sm-4 col-xs-6"><div class="thumb-video background-masker clearfix"></div><div class="loadingInfo video-info relative clearfix"><div class="background-masker heading clearfix"></div><div class="background-masker paragraph clearfix"></div><div class="background-masker clearfix views-date"></div></div></div>');
                            }
                            $('#recentaudiobooks_load_more').remove();
                            $('#recentaudiobooks_pre').remove();
                            $("#recent_audiobooks_sec").html('<div class="break2"></div><span class="well well-info btn-block">'+noRecent+'</span>');
                            return false;
                        }
                        else if (loadMode == 'recent_podcast') {
                            for (var i = 0; i < recentFound; i++) {
                                $(document).find('#recentpodcasts_pre').append('<div class="item-video col-lg-4 col-md-4 col-sm-4 col-xs-6"><div class="thumb-video background-masker clearfix"></div><div class="loadingInfo video-info relative clearfix"><div class="background-masker heading clearfix"></div><div class="background-masker paragraph clearfix"></div><div class="background-masker clearfix views-date"></div></div></div>');
                            }
                            $('#recentpodcasts_load_more').remove();
                            $('#recentpodcasts_pre').remove();
                            $("#recent_podcasts_sec").html('<div class="break2"></div><span class="well well-info btn-block">'+noRecent+'</span>');
                            return false;
                        }
					}
					return true;
				}
				if (loadType == 'video') {
					if (loadMode == 'recent') {
						$('#recent_load_more').remove();
						$('#recent_pre').html('');
						$(data).appendTo('#recent_vids_sec').fadeIn('slow');
						recentSect = $('#container').find('#total_videos_recent').text();
						recentSect = parseInt(recentSect);
						loadHit = parseInt(loadHit);
						loadLimit = parseInt(loadLimit);
						
						if (loadHit == 1 && loadLimit >= recentSect) {
							moreRecent = false;
						}else if (loadHit * loadLimit >= recentSect) {
							moreRecent = false;
						}

						if (moreRecent == true) {
							$(document).find('#recent-loadmore').append('<div class="clearfix text-center"><button id="recent_load_more" class="btn btn-loadmore" loadtype="video" loadmode="recent" loadlimit="'+loadLimit+'" loadhit="'+newloadHit+'">'+loadMoreLang+'</button></div>');
						}
						
					}
					else {
						$('#featured_load_more').remove();
						$('#featured_pre').html('');
						$(data).appendTo('#featured_vid_sec').fadeIn('slow');
						featuredSect = $('#container').find('#total_videos_featured').text();

						loadLimit = parseInt(loadLimit);
						featuredSect = parseInt(featuredSect);
						loadHit = parseInt(loadHit);
						
						if (loadHit == 1 && loadLimit >= featuredSect) {
							moreFeatured = false;
						} else if (loadHit * loadLimit >= featuredSect) {
							moreFeatured = false;
						}
						
						if (moreFeatured == true) {
							$(document).find('#featured-loadmore').append('<div class="clearfix text-center"><button id="featured_load_more" class="btn btn-loadmore" loadtype="video" loadmode="featured" loadlimit="'+loadLimit+'" loadhit="'+newloadHit+'">'+loadMoreLang+'</button></div>');
						}
					}
				}

				// updated by Ricky
				if (loadType == 'ad') {
                    if (loadMode == 'recent_ad') {
                        $('#recentads_load_more').remove();
                        $('#recentads_pre').html('');
                        $(data).appendTo('#recent_ads_sec').fadeIn('slow');
                        recentAdSect = $('#container').find('#total_ads_recent').text();
                        recentAdSect = parseInt(recentAdSect);
                        loadHit = parseInt(loadHit);
                        loadLimit = parseInt(loadLimit);

                        if (loadHit == 1 && loadLimit >= recentAdSect) {
                            moreRecentAds = false;
                        }else if (loadHit * loadLimit >= recentAdSect) {
                            moreRecentAds = false;
                        }

                        if (moreRecentAds == true) {
                            $(document).find('#recentads-loadmore').append('<div class="clearfix text-center"><button id="recentads_load_more" class="btn btn-loadmore" loadtype="ad" loadmode="recent_ad" loadlimit="'+loadLimit+'" loadhit="'+newloadHit+'">'+loadMoreLang+'</button></div>');
                        }
                    }
				}

                if (loadType == 'audiobook') {
                    if (loadMode == 'recent_audiobook') {
                        $('#recentaudiobooks_load_more').remove();
                        $('#recentaudiobooks_pre').html('');
                        $(data).appendTo('#recent_audiobooks_sec').fadeIn('slow');
                        recentAudiobookSect = $('#container').find('#total_audiobooks_recent').text();
                        recentAudiobookSect = parseInt(recentAudiobookSect);
                        loadHit = parseInt(loadHit);
                        loadLimit = parseInt(loadLimit);

                        if (loadHit == 1 && loadLimit >= recentAudiobookSect) {
                            moreRecentAudiobooks = false;
                        }else if (loadHit * loadLimit >= recentAudiobookSect) {
                            moreRecentAudiobooks = false;
                        }

                        if (moreRecentAudiobooks == true) {
                            $(document).find('#recentaudiobooks-loadmore').append('<div class="clearfix text-center"><button id="recentaudiobooks_load_more" class="btn btn-loadmore" loadtype="audiobook" loadmode="recent_ad" loadlimit="'+loadLimit+'" loadhit="'+newloadHit+'">'+loadMoreLang+'</button></div>');
                        }
                    }
                }

                if (loadType == 'podcast') {
                    if (loadMode == 'recent_podcast') {
                        $('#recentpodcasts_load_more').remove();
                        $('#recentpodcasts_pre').html('');
                        $(data).appendTo('#recent_podcasts_sec').fadeIn('slow');
                        recentPodcastSect = $('#container').find('#total_podcasts_recent').text();
                        recentPodcastSect = parseInt(recentPodcastSect);
                        loadHit = parseInt(loadHit);
                        loadLimit = parseInt(loadLimit);

                        if (loadHit == 1 && loadLimit >= recentPodcastSect) {
                            moreRecentPodcasts = false;
                        }else if (loadHit * loadLimit >= recentPodcastSect) {
                            moreRecentPodcasts = false;
                        }

                        if (moreRecentPodcasts == true) {
                            $(document).find('#recentpodcasts-loadmore').append('<div class="clearfix text-center"><button id="recentpodcasts_load_more" class="btn btn-loadmore" loadtype="podcast" loadmode="recent_podcast" loadlimit="'+loadLimit+'" loadhit="'+newloadHit+'">'+loadMoreLang+'</button></div>');
                        }
                    }
                }

				$('#container').find('#total_videos_recent').hide();
				$('#container').find('#total_videos_featured').hide();
				$('#container').find('#total_ads_recent').hide();
				$('#container').find('#total_audiobooks_recent').hide();
				$('#container').find('#total_podcasts_recent').hide();
			}
		});
	});
	// trigger clicks on doc load to get
	// initial videos
	$(document).ready(function(){
		$('#featured_load_more').trigger("click");
		$('#featured_load_more').hide();
		$('#recent_load_more').trigger("click");
		$('#recent_load_more').hide();
		$('#recentads_load_more').trigger("click");
		$('#recentads_load_more').hide();
        $('#recentaudiobooks_load_more').trigger("click");
        $('#recentaudiobooks_load_more').hide();
        $('#recentpodcasts_load_more').trigger("click");
        $('#recentpodcasts_load_more').hide();
	});
}
//on resize functions
$(window).resize(function(){
 	headerFooter();
 	preLoadingBlock();
 	responsiveFixes();
 	loginHeight();
});
//shortKeys();