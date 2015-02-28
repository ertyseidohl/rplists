<?php

	include('../settings.php');

	$dbh = new PDO('mysql:host=' . DB_ADDR . ';dbname=' . DB_NAME, DB_USER, DB_PASS);

	$sth = $dbh->prepare('SELECT * from sources WHERE approved = 1');
	$sth->execute();
	echo(json_encode($sth->fetchAll(PDO::FETCH_CLASS)));
