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
    this.setState({currTag: e.target.value});
  },
  onSubmit: function(e) {
    e.preventDefault();
    var updatedTags = this.state.tags.concat(['#' + this.state.currTag]);
    this.setState({tags: updatedTags, currTag: ''});
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

function attachFollowHashTag() {
    React.renderComponent(<AddHashtag />, document.getElementById('followHashTag'));
}
