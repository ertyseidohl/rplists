<?php

	include('../settings.php');

	$dbh = new PDO('mysql:host=' . DB_ADDR . ';dbname=' . DB_NAME, DB_USER, DB_PASS);

	if (!isset($_POST['title']) || !isset($_POST['items'])) {
		header("HTTP/1.0 400 Bad Request");
	}

	//insert list into db
	$sth = $dbh->prepare('INSERT INTO lists (title) VALUES (:title)');
	$sth->execute([
		'title' => $_POST['title']
	]);
	$list_id = $dbh->lastInsertId();

	//insert new sources
	$sources_map = [];
	if (!empty($_POST['sources'])) {
		$sth = $dbh->prepare('INSERT INTO sources (name) VALUES (:name)');
		foreach ($_POST['sources'] as $source) {
			if (empty($source['name']) || empty($source['source_id'])) {
				continue;
			}
			$sth->execute([
				'name' => $source['name']
			]);
			$real_source_id = $dbh->lastInsertId();
			$sources_map[$source['source_id']] = $real_source_id;
		}
	}

	//insert items into db
	$sth = $dbh->prepare('INSERT INTO items (fk_list_id, content, fk_source_id) VALUES (:list_id, :content, :source_id)');
	foreach($_POST['items'] as $item) {
		if ($item && $item['content']) {
			if (!empty($item['source'])) {
				$source = array_key_exists($item['source'], $sources_map) ? $sources_map[$item['source']] : $item['source'];
			} else {
				$source = 0;
			}
			$sth->execute([
				'list_id' => $list_id,
				'content' => $item['content'],
				'source_id' => $source
			]);
		}
	}

	echo ("success");
