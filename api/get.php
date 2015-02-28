<?php

	include('./settings.php');

	$dbh = new PDO('mysql:host=' . DB_ADDR . ';dbname=' . DB_NAME, DB_USER, DB_PASS);

	if (isset($_GET['list'])){
		$sth = $dbh->prepare('SELECT * from items WHERE fk_list_id = :list AND approved = 1 ');
		$sth->execute(['list' => $_GET['list']]);
		echo(json_encode($sth->fetchAll(PDO::FETCH_CLASS)));
	} else {
		$sth = $dbh->query('SELECT * from lists WHERE approved = 1 ORDER BY title ASC');
		echo(json_encode($sth->fetchAll(PDO::FETCH_CLASS)));
	}
