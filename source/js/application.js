$(document).ready(function() {
	var a = new Application();
});

function Application()
{
	twttr.anywhere.config({ callbackURL: "http://www.smithandrobot.com/tapp/" });
	// var server 		   = 'http://tr-cache-2.appspot.com/massrelevance/';
	var server 		   	= 'http://tr-cache-2.appspot.com/smithandrobot/';
	var mainTweetLists 	= new TweetListController( server );
	var tweetPhotos	   	= new TweetPhotoList( server );
	var filterNav	   	= new FilterNav();
	var spotlightTweets	= new SpotlightTweetList( server );
	var spotlightNav   	= new SpotlightControls();
	var tweetStats     	= new TweetStats();
	var mostMentioned	= new MostMentionedNominees( server );
	var tweetBox		= $('#tbox');
	
	this.toString	   	= toString;
	
	//tweetBox.fadeOut(50);
	
	filterNav.addEventListener('onFilterChange', onFilterChange);	
	tweetStats.addEventListener('onStatsLoaded', onStatsLoaded);	
	mainTweetLists.addEventListener('tweetListRendered', onTweetListRendered);	
	mostMentioned.addEventListener('onMostMentionedLoaded', onMostMentionedRendered);	
	spotlightNav.addEventListener('onNextSpotlightTweet', onNextSpotlightTweet);
	spotlightNav.addEventListener('onPreviousSpotlightTweet', onPreviousSpotlightTweet);	
	tweetPhotos.addEventListener('tweetPhotoListLoaded', onPhotosLoaded);	
	spotlightTweets.addEventListener('onSpotlightTweetsLoaded', onSpotlightTweetsLoaded);
	spotlightTweets.controls = spotlightNav;
	
	spotlightTweets.load();


	
	function onFilterChange( e )
	{
		var filter = e.target.filter.split('filter-')[1];
		mainTweetLists.select(filter);
	};
	
	
	function onPhotosLoaded( e )
	{
		Log('photos loaded - '+toString());
		tweetBox.show();
		mainTweetLists.loadViewerList();
	}
	
	function onSpotlightTweetsLoaded( e )
	{
		//tweetPhotos.load();
		tweetStats.init()
	}
	
	function onStatsLoaded( e )
	{
		Log('stats loaded');
		mainTweetLists.load();
	}
	
	function onTweetListRendered( e )
	{
		filterNav.show();
		mostMentioned.load();
	}
	
	function onMostMentionedRendered( e )
	{
		tweetPhotos.load();
		// 
	}
	
	
	function onNextSpotlightTweet( e )
	{
		Log('next spotlight tweet');
		spotlightTweets.next();
	}
	
	
	function onPreviousSpotlightTweet( e )
	{
		Log('previous spotlight tweet');
		spotlightTweets.previous();
	}
	
	
	
	
	function toString() { return "Application"; };
};