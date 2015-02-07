var ItemRow = React.createClass({
	render: function() {
		if (this.props.editable) {
			return (
				<p class="item-row__new">
					<input
						placeholder={this.props.placeholder}
						value={this.props.item.content}
						onChange={this.props.onChange.bind(null, this.props.index)}
					/>
					<button onClick={this.props.onDelete.bind(null, this.props.index)}>x</button>
				</p>
			);
		} else {
			return (
				<p class="item-row__row">
					{this.props.item.content}
				</p>
			);
		}
	}
});
