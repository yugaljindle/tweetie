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
  render: function() {
    return (
        <div className="tweet-box">
            <div className="heading">
                <span className="headingText">{this.props.tag}</span> 
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
