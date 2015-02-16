var ItemRow = React.createClass({
	getItemSource : function() {
		if (this.props.item.source) {
			return (
				<a href="{this.props.item.source_link}">{this.props.item.source}</a>
			);
		} else {
			return (
				"anonymous"
			);
		}
	},
	render: function() {
		if (this.props.editable) {
			return (
				<p className="item-row item-row__new">
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
				<tr className="item-row">
					<td>{this.props.index + 1}</td>
					<td>{this.props.item.content}</td>
					<td>{this.getItemSource()}</td>
				</tr>
			);
		}
	}
});
