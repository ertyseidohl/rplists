var STATE_EDITING = 0;
var STATE_SUBMITTED = 1;
var STATE_SUBMITTING = 2;

var ListEditor = React.createClass({
	getInitialState : function() {
		return {
			items : [
				{content : ""}
			],
			title : "",
			state : STATE_EDITING
		}
	},
	onRowChange : function(index, event) {
		var newState = this.state;
		newState.items[index].content = $(event.target).val();
		if (index == this.state.items.length - 1) {
			newState.items.push(
				{content : ""}
			);
		}
		this.setState({
			items : newState.items
		});
	},
	onRowDelete : function(index, event) {
		this.state.items.splice(index, 1);
		this.setState({
			items : this.state.items
		});
	},
	onSubmit : function(event) {
		this.setState({
			state : STATE_SUBMITTING
		});
		var params = {
			items : this.state.items.map(function(item) {
				return item.content;
			})
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
	render: function() {
		if (this.props.isExisting && !this.props.listId) {
			return (<div></div>);
		}
		switch(this.state.state) {
			case STATE_SUBMITTING:
				return (
					<div>
						Submitting list...
					</div>
				);
			case STATE_SUBMITTED:
				return (
					<div>
						List has been submitted and is awaiting moderator approval.
						<button onClick={this.onSubmitAnother}>Submit Another</button>
					</div>
				);
			case STATE_EDITING:
			default:
				return (
					<div>
						<p>{this.state.error}</p>
						{
							this.props.isExisting ?
							null :
							<input type="text" placeholder="title" onChange={this.onTitleChange} />
						}
						{
							this.state.items.map(function(item, index){
								return (<ItemRow editable={true} item={item} index={index} key={index} onChange={this.onRowChange} onDelete={this.onRowDelete} />);
							}.bind(this))
						}
						<button onClick={this.onSubmit}>Submit List</button>
					</div>
				);
		}
	}
});
