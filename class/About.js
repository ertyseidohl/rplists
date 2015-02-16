var About = React.createClass({
	getInitialState : function() {
		return {
			state : STATE_EDITING,
			error : ""
		}
	},
	submitContact : function() {
		var $email = $("#contact_email");
		var $text = $("#contact_text");
		$.ajax(
			"./api/mail.php",
			{
				type : "POST",
				data : {
					email : $email.val(),
					text : $text.val()
				},
				dataType : "text",
				context : this,
				success : function(result) {
					if (result == "success") {
						this.setState({
							error : "",
							state : STATE_SUBMITTED
						});
					}
				},
				error : function(result) {
					this.setState({
						error : "There was an error. Please try again.",
						state : STATE_EDITING
					});
				}
			}
		);
		this.setState({
			state : STATE_SUBMITTING
		});
	},
	onSubmitAnother : function() {
		$email.val("");
		$text.val("");
		this.setState({
			state : STATE_EDITING
		});
	},
	render: function() {
		switch(this.state.state) {
			case STATE_SUBMITTING:
				return (
					<p>
						Sending...
					</p>
				);
			case STATE_SUBMITTED:
				return (
					<p>
						Sent! Thanks for the feedback!
						<button onClick={this.onSubmitAnother}>Neat!</button>
					</p>
				);
			case STATE_EDITING:
				return (
					<div>
						<h4>About RPLists</h4>
						<p>Lots of people have lots of really cool ideas for games like Dungeons and Dragons, Pathfinder, Gurps, etc.</p>
						<p>This is a site about sharing those ideas and discovering new ones.</p>
						<p>D&amp;D 5th edition, for example, uses a lot of these lists for character creation, but they are often only 10 items or less. Let&rsquo;s give people a bit more room to work.</p>

						<h4>Contact</h4>
						<p>Feedback, complaints, comments, etc.</p>
						<table className="contact">
							<tr>
								<td>Your Email</td>
								<td><input id="contact_email" type="text" placeholder="email" /></td>
							</tr>
							<tr>
								<td>Comment</td>
								<td><textarea id="contact_text"></textarea></td>
							</tr>
							<tr>
								<td></td>
								<td>
									<button onClick={this.submitContact}>Submit</button>
									<span className="error">&nbsp;{this.state.error || null}</span>
								</td>
							</tr>
						</table>
					</div>
				);
		}
	}
});
