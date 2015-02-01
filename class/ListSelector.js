var ListSelector = React.createClass({
	render: function() {
		return (
			<div className="list_selector">
				<select onChange={this.props.onChange}>
					{this.props.lists.map(function(list) {
						return (
							<option value={list.pk_list_id} key={list.pk_list_id}>{list.title}</option>
						);
					})}
				</select>
			</div>
		);
	}
});
