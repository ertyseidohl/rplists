var ListView = React.createClass({
	onRoll: function() {
		var item = this.props.items[Math.floor(Math.random() * this.props.items.length)]
		// lolololol alert
		alert(item.content + " (via " + this.props.getSource(item.fk_source_id).name + ")");
	},
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
							<th><img src="./img/die_face.png" alt="&#9860;" className="die" onClick={this.onRoll} /></th>
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
