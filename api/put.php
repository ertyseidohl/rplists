<?php

	$dbh = new PDO('mysql:host=localhost;dbname=ertyse5_rplists', 'ertyse5_rplists', '4rB4Qt7SNZD2WeLK');

	if (!isset($_POST['list']) || !isset($_POST['items'])) {
		header("HTTP/1.0 400 Bad Request");
		die("not set");
	}

	//check if list exists
	$sth = $dbh->prepare('SELECT COUNT(pk_list_id) FROM lists WHERE pk_list_id = :list');
	$sth->execute([
		'list' => $_POST['list']
	]);
	$count = $sth->fetchColumn(0);
	if (!$count) {
		header("HTTP/1.0 400 Bad Request");
		die("no such list : " . (int)$_POST['list']);
	}

	//insert items into db
	$sth = $dbh->prepare('INSERT INTO items (fk_list_id, content) VALUES (:list, :content)');
	foreach($_POST['items'] as $item) {
		if ($item) {
			$sth->execute([
				'list' => $_POST['list'],
				'content' => $item
			]);
		}
	}

	echo ("success");
