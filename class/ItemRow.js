var ItemRow = React.createClass({
	render: function() {
		if (this.props.editable) {
			return (
				<div>
					<input
						placeholder="New Row"
						value={this.props.item.content}
						onChange={this.props.onChange.bind(null, this.props.index)}
					/>
					<button onClick={this.props.onDelete.bind(null, this.props.index)}>x</button>
				</div>
			);
		} else {
			return (
				<div>
					{this.props.item.content}
				</div>
			);
		}
	}
});
