;(function(exports) {
	React.render(
		(<div>
			<h1>Lists for RPGs</h1>
			<p>Moderated crowdsourced lists for use in tabletop role-playing games.</p>
			<h2>Browse Lists</h2>
			<ListArea />
			<h2>Submit a New List</h2>
			<ListEditor />
		</div>),
		document.getElementById('content')
	);
})(window);
