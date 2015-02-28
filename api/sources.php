<?php

	$dbh = new PDO('mysql:host=localhost;dbname=ertyse5_rplists', 'ertyse5_rplists', '4rB4Qt7SNZD2WeLK');

	$sth = $dbh->prepare('SELECT * from sources WHERE approved = 1');
	$sth->execute();
	echo(json_encode($sth->fetchAll(PDO::FETCH_CLASS)));
