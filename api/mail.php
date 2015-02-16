<?php

	$dbh = new PDO('mysql:host=localhost;dbname=ertyse5_rplists', 'ertyse5_rplists', '4rB4Qt7SNZD2WeLK');

	if (!isset($_POST['email']) || !isset($_POST['text'])) {
		header("HTTP/1.0 400 Bad Request");
	}

	$headers   = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/plain; charset=utf-8";
	$headers[] = "From: " . $_POST['email'];
	$headers[] = "X-Mailer: PHP/" . phpversion();
	$message = wordwrap($_POST['text'], 70, "\r\n");
	if (mail("Erty Seidel <erty@dihscover.com>", "RPLists Message", $message, implode("\r\n", $headers))) {
		echo ("success");
	} else {
		echo ("error");
	}
