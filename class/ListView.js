var ListView = React.createClass({
	render: function() {
		if (this.props.isLoading) {
			return(
				<p>Loading...</p>
			);
		} else {
			return (
				<table className="list-view">
					<thead>
						<tr>
							<th>#</th>
							<th></th>
							<th>Source</th>
						</tr>
					</thead>
					<tbody>
						{this.props.items.map(function(item, index) {
							return (
								<ItemRow
									getSource={this.props.getSource}
									index={index}
									editable={false}
									item={item}
									key={index}
								/>
							);
						}.bind(this))}
					</tbody>
				</table>
			);
		}
	}
});
