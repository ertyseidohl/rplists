var ListApplication = React.createClass({
	getInitialState : function() {
		this.updateSources();
		return {
			tab : "browse",
			sources : []
		};
	},
	updateSources : function(callback) {
		$.get(
			"./api/sources.php",
			{},
			function(result) {
				this.setState({
					sources : eval(result)
				});
				if (callback) {
					callback.call(this);
				}
			}.bind(this),
			"json"
		);
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
	changeTabAbout : function() {
		this.setState({
			tab : "about"
		});
	},
	getSource : function(sourceId) {
		if (sourceId == -1) {
			return this.state.sources;
		}
		return this.state.sources.filter(function(s) {
			return s.pk_source_id == sourceId;
		})[0];
	},
	addSource : function(newSource) {
		var newSources = this.state.sources;
		newSources.push({
			pk_source_id : Math.max.apply(null, newSources.map(function(s) {
				return parseInt(s.pk_source_id, 10);
			})) + 1,
			name : newSource,
			new_source : true
		});
		this.setState({
			sources : newSources
		});
	},
	render: function() {
		return(
			<div>
				<h1>Lists for RPGs</h1>
				<p>Moderated, rollable, crowdsourced lists for use in tabletop role-playing games.</p>
				<h2>
					<a onClick={this.changeTabBrowse}>Browse Lists</a>
					&nbsp;|&nbsp;
					<a onClick={this.changeTabSubmit}>Submit a New List</a>
					&nbsp;|&nbsp;
					<a onClick={this.changeTabAbout}>About & Contact</a>
				</h2>
				{
					this.state.tab == "browse" ?
						<div>
							<ListArea
								getSource={this.getSource}
								addSource={this.addSource}
								updateSources={this.updateSources}
							/>
						</div> :
					null
				}
				{
					this.state.tab == "submit" ?
						<div>
							<ListEditor
								showAddSuggestions={true}
								getSource={this.getSource}
								addSource={this.addSource}
								updateSources={this.updateSources}
							/>
						</div> :
					null
				}
				{
					this.state.tab == "about" ?
						<div>
							<About />
						</div> :
					null
				}
			</div>
		);
	}
});
