var ListArea = React.createClass({
	getInitialState : function() {
		return {
			lists : [],
			selectedList : undefined
		};
	},

	changeSelectedList : function(event) {
		var newList = $(event.target).val();
		this.state.selectedList = newList;
		$.get('./api/get.php?list=' + newList, function(result) {
			if (this.isMounted()) {
				this.setState({
					items : eval(result)
				});
			}
		}.bind(this));
	},

	componentDidMount : function() {
		$.get('./api/get.php', function(result) {
			if (this.isMounted()) {
				this.setState({
					lists : eval(result)
				});
			}
		}.bind(this));
		this.changeSelectedList(1);
	},

	render: function() {
		return (
			<div className="list_area">
				<ListSelector
					lists={this.state.lists}
					selectedList={this.state.selectedList}
					onChange={this.changeSelectedList}
				/>
				<ListView
					items={this.state.items || []}
				/>
			</div>
		);
	}
});
