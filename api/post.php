<?php

	$dbh = new PDO('mysql:host=localhost;dbname=ertyse5_rplists', 'ertyse5_rplists', '4rB4Qt7SNZD2WeLK');

	if (!isset($_POST['items']) || (!isset($_POST['list']) && !isset($_POST['title']))) {
		header("HTTP/1.0 400 Bad Request");
	}

	if (isset($_POST['list'])){
		$list_id = $_POST['list'];
	} elseif (isset($_POST['title'])) {
		$sth = $dbh->prepare('INSERT INTO lists (title) VALUES (:title)');
		$sth->execute([
			'title' => $_POST['title']
		]);
		$list_id = $dbh->lastInsertId();
	}

	if (isset($_POST['items'])){
		$sth = $dbh->prepare('INSERT INTO items (fk_list_id, content) VALUES (:list_id, :content)');
		foreach($_POST['items'] as $item) {
			if ($item) {
				$sth->execute([
					'list_id' => $list_id,
					'content' => $item
				]);
			}
		}
	}

	echo ("success");
