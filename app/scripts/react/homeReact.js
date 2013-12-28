/** @jsx React.DOM */

/**
 * List of followed Hashtags
 * */
var ListHashtags = React.createClass({
  render: function() {
    var getList = function(tag) {
      return <li className="text-info">{tag}</li>;
    };
    return (
        <ul className="nav nav-list taglist">
            {this.props.tags.map(getList)}
        </ul>
    );
  }
});

/**
 * Form to add hashtags
 * */
var AddHashtag = React.createClass({
    getInitialState: function() {
        return {tags: [], currTag: ''};
    },
    onChange: function(e) {
        var v = e.target.value.trim();
        this.setState({currTag: v});
    },
    onSubmit: function(e) {
        e.preventDefault();
        if(!this.state.currTag) {
            return;
        }
        var tag = '#' + this.state.currTag;
            updatedTags = this.state.tags.concat([tag]);
        this.setState({tags: updatedTags, currTag: ''});
        // Set angular scope
        window.scope.tags.push(tag);
        window.scope.$apply();
    },
    componentDidMount: function() {
        $('.addNewTag').focus();
    },
    render: function() {
        return (
            <div className="follow-hashtag">
                <form onSubmit={this.onSubmit}>
                    <div className="input-prepend input-append">
                        <span className="add-on">#</span>
                        <input className="span9 addNewTag" type="text" placeholder="hashtag" onChange={this.onChange} value={this.state.currTag} />
                        <button className="btn">Follow</button>
                    </div>
                </form>
                <ListHashtags tags={this.state.tags} />
            </div>
        );
    }
});

// Function to attach <AddHashtag />
function attachFollowHashTag() {
    React.renderComponent(<AddHashtag />, document.getElementById('followHashTag'));
}


/*
 *  Tweetie shoutbox
 */
var TweetieShoutbox = React.createClass({
    getInitialState: function() {
        return {tweets: []};
    },
    showTweet: function(tweet) {
        return (
            <div className="tweet span12">
                <div className="tweet-image span2">
                    <img src={tweet.image} />
                </div>
                <div className="tweet-content span10">
                    <div className="tweet-name">
                        {tweet.name}
                        (<span className="tweet-screenName">
                            <a target="_blank" href={"https://twitter.com/" + tweet.screen_name}>{'@'+tweet.screen_name}</a>
                        </span>)
                    </div>
                    <div className="tweet-text">{tweet.text}</div>
                </div>
            </div>
        );
    },
    showAllTweets: function() {
        if(this.state.tweets.length !== 0) {
            return (this.state.tweets.map(this.showTweet));
        } else {
            return (<div className="tweet-waiting"></div>);
        }
    },
    getTweets: function() {
        $('.refreshing').show();
        var self = this,
            params = {
                lang: 'en',
                count: 10,
                q: this.props.tag,
                result_type: 'recent'
            };
        window.cb.__call("search_tweets", params, function(reply) {
            var tweets = [],
                statuses = reply.statuses;
            for(i=0; i<statuses.length; i++) {
                var tweet = {},
                    status = reply.statuses[i];
                    tweet['name'] = status.user.name;
                    tweet['screen_name'] = status.user.screen_name;
                    tweet['image'] = status.user.profile_image_url;
                    tweet['text'] = status.text;
                    tweets.push(tweet);
            }
            self.setState({tweets: tweets});
            $('.refreshing').hide();
        });
    },
    componentDidMount: function() {
        this.getTweets();
        this.interval = setInterval(this.getTweets, 2000);
    },
    render: function() {
        return (
            <div className="tweet-box">
                <div className="heading">
                    <span className="headingText pull-left">{this.props.tag}</span> 
                    <span className="headingText pull-right refreshing">Refreshing..</span> 
                    <span className="clearfix"></span> 
                </div>
                <div className="tweet-list">
                    {this.showAllTweets()}
                </div>
            </div>
        );
    }
});

/*
 *  Tweetie shoutbox List
 */
var TweetieShoutboxList = React.createClass({
    getInitialState: function() {
        return { tags: [] };
    },
    updateTags: function() {
        this.setState({tags: window.displayTags});
    },
    showList: function() {
        var createShoutBox = function(tag) {
            return <TweetieShoutbox tag={tag} />;
        };

        if(this.state.tags.length !== 0) {
            return this.state.tags.map(createShoutBox);
        } else {
            return (<div className="empty-banner">
                {"Enter new #Hashtag !"}
            </div>);
        }
    },
    componentDidMount: function() {
        this.interval = setInterval(this.updateTags, 500);
    },
    render: function() {

        return (
            <div className="shout-list">
                {this.showList()}
            </div>
        );
    }
});

// Function to add <TweetieShoutboxList />
function addTweetieShoutboxList() {
    React.renderComponent(<TweetieShoutboxList />, document.getElementById('shout-here'));
}
