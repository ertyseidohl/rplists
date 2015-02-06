<?php

	$dbh = new PDO('mysql:host=localhost;dbname=ertyse5_rplists', 'ertyse5_rplists', '4rB4Qt7SNZD2WeLK');

	if (!isset($_POST['title']) || !isset($_POST['items'])) {
		header("HTTP/1.0 400 Bad Request");
	}

	//insert list into db
	$sth = $dbh->prepare('INSERT INTO lists (title) VALUES (:title)');
	$sth->execute([
		'title' => $_POST['title']
	]);
	$list_id = $dbh->lastInsertId();

	//insert items into db
	$sth = $dbh->prepare('INSERT INTO items (fk_list_id, content) VALUES (:list_id, :content)');
	foreach($_POST['items'] as $item) {
		if ($item) {
			$sth->execute([
				'list_id' => $list_id,
				'content' => $item
			]);
		}
	}

	echo ("success");
