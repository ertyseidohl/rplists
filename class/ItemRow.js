var ItemRow = React.createClass({
	getItemSource : function(){
		if (this.props.item.fk_source_id) {
			var source = this.props.getSource(this.props.item.fk_source_id);
			if (source.link) {
				return (
					React.createElement('a', {href: source.link}, source.name)
				);
			} else {
				return (
					source.name
				);
			}
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
						<select
							value={this.props.item.source}
							onChange={this.props.onSourceChange.bind(null, this.props.index)}
						>
						<option value="0"></option>
						{
							this.props.getSource(-1).map(function(s) {
								return (
									<option
										key={s.pk_source_id}
										value={s.pk_source_id}
									>{s.name}</option>
								);
							}.bind(this))
						}
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
					<td className="item-row__source">{this.getItemSource()}</td>
				</tr>
			);
		}
	}
});
