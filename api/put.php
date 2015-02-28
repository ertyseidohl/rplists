<?php

	include('../settings.php');

	$dbh = new PDO('mysql:host=' . DB_ADDR . ';dbname=' . DB_NAME, DB_USER, DB_PASS);

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
	$sth = $dbh->prepare('INSERT INTO items (fk_list_id, content, fk_source_id) VALUES (:list, :content, :source_id)');
	foreach($_POST['items'] as $item) {
		if ($item && $item['content']) {
			if (!empty($item['source'])) {
				$source = array_key_exists($item['source'], $sources_map) ? $sources_map[$item['source']] : $item['source'];
			} else {
				$source = 0;
			}
			$sth->execute([
				'list' => $_POST['list'],
				'content' => $item['content'],
				'source_id' => $source
			]);
		}
	}

	echo ("success");
