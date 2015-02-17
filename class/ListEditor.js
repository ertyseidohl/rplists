var STATE_EDITING = 0;
var STATE_SUBMITTED = 1;
var STATE_SUBMITTING = 2;

var ListEditor = React.createClass({
	getInitialState : function() {
		return {
			items : [
				{
					content : "",
					source : 0
				}
			],
			title : "",
			state : STATE_EDITING,
			showAddSuggestions : this.props.showAddSuggestions || false
		}
	},
	onRowChange : function(index, event) {
		var newState = this.state;
		newState.items[index].content = $(event.target).val();
		if (index == this.state.items.length - 1) {
			newState.items.push(
				{
					content : "",
					source : this.state.items[index].source
				}
			);
		}
		this.setState({
			items : newState.items
		});
	},
	onRowSourceChange : function(index, event){
		var newState = this.state;
		newState.items[index].source = $(event.target).val();
		this.setState({
			items : newState.items
		});
	},
	onRowDelete : function(index, event) {
		this.state.items.splice(index, 1);
		if (!this.state.items.length) {
			this.state.items = this.getInitialState().items;
		}
		this.setState({
			items : this.state.items
		});
	},
	onSubmit : function(event) {
		this.setState({
			state : STATE_SUBMITTING
		});
		var params = {
			items : this.state.items
		};
		if (this.props.isExisting) {
			params.list = this.props.listId;
		} else {
			params.title = this.state.title;
		}
		$.ajax(
			this.props.isExisting ? "./api/put.php" : "./api/post.php",
			{
				type : "POST",
				data : params,
				dataType : "text",
				context : this,
				success : function(result) {
					if (result == "success") {
						this.setState({
							error : "",
							state : STATE_SUBMITTED
						});
					}
				},
				error : function(result) {
					this.setState({
						error : "There was an error. Please try again.",
						state : STATE_EDITING
					});
				}
			}
		);
	},
	onTitleChange : function(event) {
		this.setState({
			title : $(event.target).val()
		});
	},
	onSubmitAnother : function(event) {
		this.setState(
			this.getInitialState()
		);
	},
	showAddSuggestions : function() {
		this.setState({
			showAddSuggestions : true
		});
	},
	addSource : function() {
		this.props.addSource('sourece');
	},
	render: function() {
		if (this.props.isExisting && !this.props.listId) {
			return (<div></div>);
		}
		switch(this.state.state) {
			case STATE_SUBMITTING:
				return (
					<p>
						Submitting list...
					</p>
				);
			case STATE_SUBMITTED:
				return (
					<p>
						List has been submitted and is awaiting moderator approval.
						<button onClick={this.onSubmitAnother}>Neat!</button>
					</p>
				);
			case STATE_EDITING:
			default:
				if (this.state.showAddSuggestions) {
					return (
						<div>
							{
								this.state.error ?
								<p>{this.state.error}</p> :
								null
							}
							{
								this.props.isExisting ?
								null :
								<p><input type="text" placeholder="title" onChange={this.onTitleChange} /></p>
							}
							<table className="list-editor">
								<thead>
									<tr>
										<th>Item</th>
										<th>Source (<a onClick={this.addSource}>add new</a>)</th>
										<th>Del</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.items.map(function(item, index){
											return (
												<ItemRow
													editable={true}
													item={item}
													index={index}
													key={index}
													onChange={this.onRowChange}
													onDelete={this.onRowDelete}
													placeholder={this.props.isExisting ? "Suggest Something" : "New Row"}
													getSource={this.props.getSource}
													onSourceChange={this.onRowSourceChange}
												/>
											);
										}.bind(this))
									}
								</tbody>
							</table>
							<p><button onClick={this.onSubmit}>Submit Suggestions</button></p>
						</div>
					);
				} else {
					return (
						<p><button onClick={this.showAddSuggestions}>Suggest new items</button></p>
					);
				}
		}
	}
});
