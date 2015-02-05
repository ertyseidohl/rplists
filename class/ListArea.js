var ListArea = React.createClass({
	getInitialState : function() {
		return {
			lists : [],
			selectedList : undefined,
			isLoadingListSelector : true,
			isLoadingListItems : true
		};
	},

	onListSelectorChange : function(event) {
		this.changeSelectedList($(event.target).val());
	},

	changeSelectedList : function(newList) {
		this.state.selectedList = newList;
		this.setState({
			isLoadingListItems : true
		});
		$.get('./api/get.php?list=' + newList, function(result) {
			if (this.isMounted()) {
				this.setState({
					items : eval(result),
					isLoadingListItems : false
				});
			}
		}.bind(this));
	},

	componentDidMount : function() {
		this.setState({
			isLoadingListSelector : true
		});
		$.get('./api/get.php', function(result) {
			var newLists = eval(result);
			if (this.isMounted()) {
				this.setState({
					lists : newLists,
					isLoadingListSelector : false
				});
				this.changeSelectedList(newLists[0].pk_list_id);
			}
		}.bind(this));
	},

	render: function() {
		return (
			<div>
				<ListSelector
					lists={this.state.lists}
					selectedList={this.state.selectedList}
					onChange={this.onListSelectorChange}
					isLoading={this.state.isLoadingListSelector}
				/>
				<ListView
					isLoading={this.state.isLoadingListItems}
					items={this.state.items || []}
				/>
			</div>
		);
	}
});
