TweetStats.prototype 	= new EventDispatcher();
TweetStats.constructor 	= TweetStats;

function TweetStats() 
{
	var self				= this;
	var totalCount 	 		= $('#total-tweets');
	var tweetsPerSec 		= $('#total-tweets-second');
	var rendered			= false;
	var model				= new TRModel('http://tr-cache-2.appspot.com/massrelevance/oscars-all/meta.json')
	this.totalTweets	 	= 0;
	this.totalTweetsPerMin 	= 0;
	this.toString			= toString;
	this.init				= init;
	
	tweetsPerSec.text('loading');
	totalCount.text('loading');
	
	
	function init()
	{
		model.addEventListener('onDataChange', onDataChange)
		model.load(null, 'jsonp');
	}
	
	
	function onDataChange( e )
	{
		var data = e.target.getData();
		this.totalTweets = data.count.approved;
		var perMin = data.tweets.minute.total;
		this.totalTweetsPerMin = getAverage(perMin)
		Log('per miin avg: '+this.totalTweetsPerMin);
		setTotalTweets(this.totalTweets);
		setTimeout(setTweetsPerSec, 1000, [this.totalTweetsPerMin]);
	}
	
	
	function setTotalTweets(n)
	{
		totalTweets = n; 
		totalCount.text(Utils.addCommas(n));
		var tween = new TWEEN.Tween(self)
		.onUpdate(updateTotal)
		.to({totalTweets:totalTweets}, 2000)
		.start();
		setInterval(TWEEN.update, 1000/31);
	};
	
	function setTweetsPerSec(n)
	{
		Log('tweets per min: '+n);
		totalTweetsPerMin = n
		var tween = new TWEEN.Tween(self)
		.onUpdate(updateTweetsPerSec)
		.onComplete( onComplete ) 
		.to({totalTweetsPerMin:totalTweetsPerMin}, 2000)
		.start();
		setInterval(TWEEN.update, 1000/31);
	};
	
	
	function updateTotal()
	{
		totalCount.text(Utils.addCommas(Math.round(self.totalTweets)));
	}
	
	function updateTweetsPerSec()
	{
		tweetsPerSec.text(Utils.addCommas(Math.round(self.totalTweetsPerMin)));
	}
	
	
	function onComplete()
	{
		if(rendered) return;
		dispatchEvent( 'onStatsLoaded' , self);
		rendered = true;
	}
	
	
	function getAverage(a)
	{
		// only use the last 10 elements in the array
		a.splice(0, 50);
		
		var i 	  = 0;
		var total = a.length - 1;
		var count = 0;
				
		for(i; i<= total; i++)
		{
			count += a[i];
		}
		
		return Math.ceil(count/(total+1))
	}
	
	function toString() { return 'TweetSats'; };
	
	return this;
};
