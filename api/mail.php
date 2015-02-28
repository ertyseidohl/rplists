<?php

	include('../settings.php');

	$dbh = new PDO('mysql:host=' . DB_ADDR . ';dbname=' . DB_NAME, DB_USER, DB_PASS);

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
