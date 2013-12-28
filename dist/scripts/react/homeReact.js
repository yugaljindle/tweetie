/** @jsx React.DOM */

/**
 * List of followed Hashtags
 * */
var ListHashtags = React.createClass({displayName: 'ListHashtags',
  render: function() {
    var getList = function(tag) {
      return React.DOM.li( {className:"text-info"}, tag);
    };
    return (
        React.DOM.ul( {className:"nav nav-list taglist"}, 
            this.props.tags.map(getList)
        )
    );
  }
});

/**
 * Form to add hashtags
 * */
var AddHashtag = React.createClass({displayName: 'AddHashtag',
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
            React.DOM.div( {className:"follow-hashtag"}, 
                React.DOM.form( {onSubmit:this.onSubmit}, 
                    React.DOM.div( {className:"input-prepend input-append"}, 
                        React.DOM.span( {className:"add-on"}, "#"),
                        React.DOM.input( {className:"span9 addNewTag", type:"text", placeholder:"hashtag", onChange:this.onChange, value:this.state.currTag} ),
                        React.DOM.button( {className:"btn"}, "Follow")
                    )
                ),
                ListHashtags( {tags:this.state.tags} )
            )
        );
    }
});

// Function to attach <AddHashtag />
function attachFollowHashTag() {
    React.renderComponent(AddHashtag(null ), document.getElementById('followHashTag'));
}


/*
 *  Tweetie shoutbox
 */
var TweetieShoutbox = React.createClass({displayName: 'TweetieShoutbox',
    getInitialState: function() {
        return {tweets: []};
    },
    showTweet: function(tweet) {
        return (
            React.DOM.div( {className:"tweet span12"}, 
                React.DOM.div( {className:"tweet-image span2"}, 
                    React.DOM.img( {src:tweet.image} )
                ),
                React.DOM.div( {className:"tweet-content span10"}, 
                    React.DOM.div( {className:"tweet-name"}, 
                        tweet.name,
                        " (",React.DOM.span( {className:"tweet-screenName"}, 
                            React.DOM.a( {target:"_blank", href:"https://twitter.com/" + tweet.screen_name}, '@'+tweet.screen_name)
                        ),") "
                    ),
                    React.DOM.div( {className:"tweet-text"}, tweet.text)
                )
            )
        );
    },
    showAllTweets: function() {
        if(this.state.tweets.length !== 0) {
            return (this.state.tweets.map(this.showTweet));
        } else {
            return (React.DOM.div( {className:"tweet-waiting"}));
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
            React.DOM.div( {className:"tweet-box"}, 
                React.DOM.div( {className:"heading"}, 
                    React.DOM.span( {className:"headingText pull-left"}, this.props.tag), 
                    React.DOM.span( {className:"headingText pull-right refreshing"}, "Refreshing.."), 
                    React.DOM.span( {className:"clearfix"}) 
                ),
                React.DOM.div( {className:"tweet-list"}, 
                    this.showAllTweets()
                )
            )
        );
    }
});

/*
 *  Tweetie shoutbox List
 */
var TweetieShoutboxList = React.createClass({displayName: 'TweetieShoutboxList',
    getInitialState: function() {
        return { tags: [] };
    },
    updateTags: function() {
        this.setState({tags: window.displayTags});
    },
    showList: function() {
        var createShoutBox = function(tag) {
            return TweetieShoutbox( {tag:tag} );
        };

        if(this.state.tags.length !== 0) {
            return this.state.tags.map(createShoutBox);
        } else {
            return (React.DOM.div( {className:"empty-banner"}, 
                "Enter new #Hashtag !"
            ));
        }
    },
    componentDidMount: function() {
        this.interval = setInterval(this.updateTags, 500);
    },
    render: function() {

        return (
            React.DOM.div( {className:"shout-list"}, 
                this.showList()
            )
        );
    }
});

// Function to add <TweetieShoutboxList />
function addTweetieShoutboxList() {
    React.renderComponent(TweetieShoutboxList(null ), document.getElementById('shout-here'));
}
