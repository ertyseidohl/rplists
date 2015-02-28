var ListArea = React.createClass({
	getInitialState : function() {
		return {
			lists : [],
			selectedListIndex : undefined,
			isLoadingListSelector : true,
			isLoadingListItems : true
		};
	},

	onListSelectorChange : function(event) {
		console.log($(event.target).val());
		this.changeSelectedList($(event.target).val());
	},

	changeSelectedList : function(newListIndex) {
		this.state.selectedListIndex = newListIndex;
		this.setState({
			isLoadingListItems : true
		});
		$.get('./api/get.php?list=' + this.state.lists[newListIndex].pk_list_id, function(result) {
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
				this.changeSelectedList(0);
			}
		}.bind(this));
	},

	render: function() {
		return (
			<div>
				<ListSelector
					lists={this.state.lists}
					selectedListIndex={this.state.selectedListIndex}
					onChange={this.onListSelectorChange}
					isLoading={this.state.isLoadingListSelector}
				/>
				<ListView
					isLoading={this.state.isLoadingListItems}
					items={this.state.items || []}
					getSource={this.props.getSource}
				/>
				<ListEditor
					isExisting={true}
					listId={
						this.state.lists[this.state.selectedListIndex] ?
						this.state.lists[this.state.selectedListIndex].pk_list_id :
						0
					}
					getSource={this.props.getSource}
					addSource={this.props.addSource}
					updateSources={this.props.updateSources}
				/>
			</div>
		);
	}
});
