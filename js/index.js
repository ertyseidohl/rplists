;(function(exports) {
	React.render(
		(<div className="react_content">
			<h2>get</h2>
			<ListArea />
			<h2>post</h2>
			<ListEditor />
		</div>),
		document.getElementById('content')
	);
})(window);