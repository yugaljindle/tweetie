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

function attachFollowHashTag() {
    React.renderComponent(<AddHashtag />, document.getElementById('followHashTag'));
}
