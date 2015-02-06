var ListSelector = React.createClass({
	render: function() {
		if (this.props.isLoading) {
			return (
				<p>Loading...</p>
			);
		} else {
			return (
				<div>
					<select onChange={this.props.onChange}>
						{this.props.lists.map(function(list, index) {
							return (
								<option value={index} key={index}>{list.title}</option>
							);
						})}
					</select>
				</div>
			);
		}
	}
});
