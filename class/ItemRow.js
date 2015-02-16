var ItemRow = React.createClass({
	getItemSource : function(){
		if (this.props.item.fk_source_id) {
			var source = this.props.getSource(this.props.item.fk_source_id);
			return (
				<a href="{source.link}">{source.name}</a>
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
				<tr className="item-row item-row__new">
					<td>
						<input
							placeholder={this.props.placeholder}
							value={this.props.item.content}
							onChange={this.props.onChange.bind(null, this.props.index)}
						/>
					</td>
					<td>
						<select>
						</select>
					</td>
					<td>
						<button className="del" onClick={this.props.onDelete.bind(null, this.props.index)}>x</button>
					</td>
				</tr>
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
