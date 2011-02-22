TweetListController.prototype = new EventDispatcher();
TweetListController.constructor = TweetListController;

function TweetListController(server)
{
	// var celebList 	    = new TweetList(server + 'oscars-celebs.json');
	var celebList 	    = new TweetList(server + 'javascript.json');
	celebList.id		= "celebList";
	
	// var expertList 	    = new TweetList(server + 'oscars-experts.json');
	var expertList 	    = new TweetList(server + 'actionscript.json');
	expertList.id		= "expertList";
	
	var celebExpertList = new TweetList(server + 'goldenglobestest.json');
	celebExpertList.id	= "all";
	
	var viewerList 		= new TweetList(server + 'promoted.json');
	viewerList.id		= "viewerList";
	
	var tweetCount		= new TweetCount();
	var selected		= null;
	var last			= null;
	var lists			= new Array();
	var rendered		= false;
	var self			= this;
	
	// Public Methods
	this.select			= select;
	this.load			= load;
	this.loadViewerList	= viewerList.load;
	
	$('#main-timeline').hide();
	$('#main-timeline').hide();
	$('#viewer-timeline .timeline-all').hide();
		
	function load()
	{
		celebList.load();
		expertList.load();
		
		celebExpertList.addEventListener('tweetListLoaded', celebExpertListLoaded);
		celebExpertList.load();
		
		viewerList.addEventListener('tweetListLoaded', viewerListLoaded);

		
		celebList.addEventListener("onHidden", onHidden);
		expertList.addEventListener("onHidden", onHidden);
		celebExpertList.addEventListener("onHidden", onHidden);
		viewerList.addEventListener("onHidden", onHidden);
		
		celebList.addEventListener("onShowing", onListShowing);
		expertList.addEventListener("onShowing", onListShowing);
		celebExpertList.addEventListener("onShowing", onListShowing);
		viewerList.addEventListener("onShowing", onListShowing);
		
    	
		celebList.hide();
		init();
	}
	
	function loadViewerList()
	{
		viewerList.load();
	}
	
	function init()
	{
 		celebList.element 		= $('#main-timeline').clone();
		lists.push({obj:celebList, id:"celebList"});
		celebList.element.attr('id', 'celebList-timeline');
		
 		expertList.element 		= $('#main-timeline').clone();
		expertList.element.attr('id', 'expertList-timeline')
		lists.push({obj:expertList, id:"expertList"});
		
 		celebExpertList.element = $('#main-timeline').clone();
		celebExpertList.element.attr('id', 'all-timeline');
		lists.push({obj:celebExpertList, id:"all"});
		
 		viewerList.element = $('#viewer-timeline .timeline-all').clone();
		viewerList.element.attr('id', 'viewer-timeline');
		
		$('#main-timeline').remove();
		$('#viewer-timeline .timeline-all').remove();
	};

	
	function celebExpertListLoaded( e )
	{
		select( 'all' );
		
		if(!rendered)
		{
			Log('tweets rendered');
			dispatchEvent('tweetListRendered', self);
			rendered = true;
		}
	};
	
	
	function viewerListLoaded( e )
	{
		e.target.show();
	}
	
	
	function select( id )
	{		
		if(last != null) last.hide();

		for(i in lists)
		{
			if(lists[i].id == id )
			{
				var list = lists[i].obj;
				if(last == null) 
				{
					list.show();
					tweetCount.setCount(50);
				};
				last = list;
				return;
			};
		} ;
	};
	
	
	
	//  Event handlers
	function onHidden(e)
	{
		last.show();
		tweetCount.setCount(90);
	};
	
	
	function onListShowing( e )
	{
		//alert(e.target.id+'list showing');
	}
	
	
	return this;
};