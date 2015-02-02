var ListView = React.createClass({
	render: function() {
		if (this.props.isLoading) {
			return(
				<p>Loading...</p>
			);
		} else {
			return (
				<table>
					{this.props.items.map(function(item) {
						return <tr key={item.pk_item_id}>
							<td>{item.content}</td>
						</tr>;
					})}
				</table>
			);
		}
	}
});
