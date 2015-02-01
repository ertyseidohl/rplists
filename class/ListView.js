var ListView = React.createClass({
	render: function() {
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
});
