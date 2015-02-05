var ListView = React.createClass({
	render: function() {
		if (this.props.isLoading) {
			return(
				<p>Loading...</p>
			);
		} else {
			return (
				<div>
					{this.props.items.map(function(item, index) {
						return <ItemRow editable={false} item={item} key={index} />;
					})}
				</div>
			);
		}
	}
});
