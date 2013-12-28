/** @jsx React.DOM */

/**
 * List of followed Hashtags
 * */
var ListHashtags = React.createClass({
  render: function() {
    var getList = function(tag) {
      return <li className="text-success">{tag}</li>;
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
  render: function() {
    return (
        <div className="follow-hashtag">
            <form onSubmit={this.onSubmit}>
                <div className="input-prepend input-append">
                    <span className="add-on">#</span>
                    <input className="span9" type="text" placeholder="hashtag" onChange={this.onChange} value={this.state.currTag} />
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
            {this.props.tag}
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
    componentDidMount: function() {
        this.interval = setInterval(this.updateTags, 500);
    },
    render: function() {
        var createShoutBox = function(tag) {
            return <TweetieShoutbox tag={tag} />;
        };
        
        return (
            <div className="shout-list">
                {this.state.tags.map(createShoutBox)}
            </div>
        );
    }
});

// Function to add <TweetieShoutboxList />
function addTweetieShoutboxList() {
    React.renderComponent(<TweetieShoutboxList />, document.getElementById('shouthere'));
}
