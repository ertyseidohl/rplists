<?php

	$dbh = new PDO('mysql:host=localhost;dbname=ertyse5_rplists', 'ertyse5_rplists', '4rB4Qt7SNZD2WeLK');

	if (isset($_GET['list'])){
		$sth = $dbh->prepare('SELECT * from items WHERE fk_list_id = :list AND approved = 1 ');
		$sth->execute(['list' => $_GET['list']]);
		echo(json_encode($sth->fetchAll(PDO::FETCH_CLASS)));
	} else {
		$sth = $dbh->query('SELECT * from lists WHERE approved = 1 ORDER BY title ASC');
		echo(json_encode($sth->fetchAll(PDO::FETCH_CLASS)));
	}
