var ListApplication = React.createClass({
	getInitialState : function() {
		return {
			tab : "browse"
		}
	},
	changeTabBrowse : function() {
		this.setState({
			tab : "browse"
		});
	},
	changeTabSubmit : function() {
		this.setState({
			tab : "submit"
		});
	},
	render: function() {
		return(
			<div>
				<h1>Lists for RPGs</h1>
				<p>Moderated crowdsourced lists for use in tabletop role-playing games.</p>
				<h2><a onClick={this.changeTabBrowse}>Browse Lists</a> | <a onClick={this.changeTabSubmit}>Submit a New List</a></h2>
				{
					this.state.tab == "browse" ?
						<div>
							<ListArea />
						</div> :
					null
				}
				{
					this.state.tab == "submit" ?
						<div>
							<ListEditor />
						</div> :
					null
				}
			</div>
		);
	}
});
