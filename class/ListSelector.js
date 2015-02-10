var ListSelector = React.createClass({
	render: function() {
		if (this.props.isLoading) {
			return (
				<select><option>Loading...</option></select>
			);
		} else {
			return (
				<div>
					<p>
						<select onChange={this.props.onChange}>
							{this.props.lists.map(function(list, index) {
								return (
									<option value={index} key={index}>{list.title}</option>
								);
							})}
						</select>
					</p>
				</div>
			);
		}
	}
});
