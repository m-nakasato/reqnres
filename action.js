//時間経過
function timeProgress(elapsed) {
	timeLeft = TIME_LIMIT - elapsed;
	if (timeLeft <= 0) {
		messages = [];
		messages.push('408 Request Timeout');
		messages.push('Game over...');
		messages.push('(Press button A)');
		pause = true;
		gameOver = true;
	}
}


//プレイヤー操作
function playerVelocityAdjust() {
	var timestamp = new Date().getTime();
	if (!lastPlayerMoveTime) lastPlayerMoveTime = timestamp;
	
	if ((lastPlayerMoveTime + 250) < timestamp) {
		lastPlayerMoveTime = timestamp;
		return true;
	}
}
function up() {
	if (playerVelocityAdjust() && !pause && !gameOver) {
		messages = [];
		if (playerDirection == 'n') {
			moveNorth();
		} else if (playerDirection == 'e') {
			moveEast();
		} else if (playerDirection == 's') {
			moveSouth();
		} else if (playerDirection == 'w') {
			moveWest();
		}
		tutorial01();
	}
}
function right() {
	if (playerVelocityAdjust() && !pause && !gameOver) {
		messages = [];
		if (playerDirection == 'n') {
			playerDirection = 'e';
		} else if (playerDirection == 'e') {
			playerDirection = 's';
		} else if (playerDirection == 's') {
			playerDirection = 'w';
		} else if (playerDirection == 'w') {
			playerDirection = 'n';
		}
		tutorial01();
	}
}
function down() {
	if (playerVelocityAdjust() && !pause && !gameOver) {
		messages = [];
		if (playerDirection == 'n') {
			moveSouth();
		} else if (playerDirection == 'e') {
			moveWest();
		} else if (playerDirection == 's') {
			moveNorth();
		} else if (playerDirection == 'w') {
			moveEast();
		}
		tutorial01();
	}
}
function left() {
	if (playerVelocityAdjust() && !pause && !gameOver) {
		messages = [];
		if (playerDirection == 'n') {
			playerDirection = 'w';
		} else if (playerDirection == 'e') {
			playerDirection = 'n';
		} else if (playerDirection == 's') {
			playerDirection = 'e';
		} else if (playerDirection == 'w') {
			playerDirection = 's';
		}
		tutorial01();
	}
}

function moveNorth() {
	if (field[playerY - 1][playerX]['type'] <= 0 &&
	(enemyY !== playerY - 1 || enemyX !== playerX)) {
		playerY--;
	}
}
function moveEast() {
	if (field[playerY][playerX + 1]['type'] <= 0 &&
	(enemyY !== playerY || enemyX !== playerX + 1)) {
		playerX++;
	}
}
function moveSouth() {
	if (field[playerY + 1][playerX]['type'] <= 0 &&
	(enemyY !== playerY + 1 || enemyX !== playerX)) {
		playerY++;
	}
}
function moveWest() {
	if (field[playerY][playerX - 1]['type'] <= 0 &&
	(enemyY !== playerY || enemyX !== playerX - 1)) {
		playerX--;
	}
}

function tutorial01() {
	if (needTutorial01 && playerDirection == 'n' && field[playerY - 1][playerX]['type'] == 2 ||
	needTutorial01 && playerDirection == 'e' && field[playerY][playerX + 1]['type'] == 2 ||
	needTutorial01 && playerDirection == 's' && field[playerY + 1][playerX]['type'] == 2 ||
	needTutorial01 && playerDirection == 'w' && field[playerY][playerX - 1]['type'] == 2) {
		messages.push('Press button B toward the door');
		messages.push('to open it.');
	}
}

function a() {
//console.log('a');
	if (playerVelocityAdjust()) {
		if (mode == 'opening') {
			mode = 'main';
			messages = [];
			messages.push('Find \'Res\' in the maze of ');
			messages.push('network traffic.');
			messages.push('(Press button A)');
		} else
		if (mode == 'main') {
			if (pause && !gameOver) {
				messages = [];
				pause = false;

				if (exec307) {
					playerX = 1;
					playerY = 1;
					playerDirection = 'e';
					exec307 = false;
				}
				
				if (hasKey) {
					isDrawKey = false;
				}
			} else
			if (gameOver) {
				isInit = true;
//				init();
			}
		}
	}
}

function b() {
	if (playerVelocityAdjust() && !pause && !gameOver) {
		open();
	}
}

function open() {
	messages = [];

	//n
	if (playerDirection == 'n' && field[playerY - 1][playerX]['type'] == 2) {
		needTutorial01 = false;
		if (field[playerY - 1][playerX]['content'] == 'goal') {
			if (hasKey) {
				field[playerY - 1][playerX]['type'] = 0;
				messages.push('200 OK');
				messages.push('Res> Thank you Req!');
//				messages.push('(Press button A)');
				pause = true;
				gameOver = true;
			} else {
				messages.push('403 Forbidden');
				messages.push('Res> Help me!');
			}
		} else
		if (field[playerY - 1][playerX]['content'] == 'map') {
			field[playerY - 1][playerX]['type'] = 0;
			messages.push('Got the map.');
			hasMap = true;
		} else
		if (field[playerY - 1][playerX]['content'] == 'key') {
			field[playerY - 1][playerX]['type'] = 0;
			messages.push('Got the key.');
			messages.push('(Press button A)');
			pause = true;
			hasKey = true;
		} else {
			field[playerY - 1][playerX]['type'] = 0;
			messages.push('404 Not Found');
		}
	} else
	//e
	if (playerDirection == 'e' && field[playerY][playerX + 1]['type'] == 2) {
		needTutorial01 = false;
		if (field[playerY][playerX + 1]['content'] == 'goal') {
			if (hasKey) {
				field[playerY][playerX + 1]['type'] = 0;
				messages.push('200 OK');
				messages.push('Res> Thank you Req!');
//				messages.push('(Press button A)');
				pause = true;
				gameOver = true;
			} else {
				messages.push('403 Forbidden');
				messages.push('Res> Help me!');
			}
		} else
		if (field[playerY][playerX + 1]['content'] == 'map') {
			field[playerY][playerX + 1]['type'] = 0;
			messages.push('Got the map.');
			hasMap = true;
		} else
		if (field[playerY][playerX + 1]['content'] == 'key') {
			field[playerY][playerX + 1]['type'] = 0;
			messages.push('Got the key.');
			messages.push('(Press button A)');
			pause = true;
			hasKey = true;
		} else {
			field[playerY][playerX + 1]['type'] = 0;
			messages.push('404 Not Found');
		}
	} else
	//s
	if (playerDirection == 's' && field[playerY + 1][playerX]['type'] == 2) {
		needTutorial01 = false;
		if (field[playerY + 1][playerX]['content'] == 'goal') {
			if (hasKey) {
				field[playerY + 1][playerX]['type'] = 0;
				messages.push('200 OK');
				messages.push('Res> Thank you Req!');
//				messages.push('(Press button A)');
				pause = true;
				gameOver = true;
			} else {
				messages.push('403 Forbidden');
				messages.push('Res> Help me!');
			}
		} else
		if (field[playerY + 1][playerX]['content'] == 'map') {
			field[playerY + 1][playerX]['type'] = 0;
			messages.push('Got the map.');
			hasMap = true;
		} else
		if (field[playerY + 1][playerX]['content'] == 'key') {
			field[playerY + 1][playerX]['type'] = 0;
			messages.push('Got the key.');
			messages.push('(Press button A)');
			pause = true;
			hasKey = true;
		} else {
			field[playerY + 1][playerX]['type'] = 0;
			messages.push('404 Not Found');
		}
	} else
	//w
	if (playerDirection == 'w' && field[playerY][playerX - 1]['type'] == 2) {
		needTutorial01 = false;
		if (field[playerY][playerX - 1]['content'] == 'goal') {
			if (hasKey) {
				field[playerY][playerX - 1]['type'] = 0;
				messages.push('200 OK');
				messages.push('Res> Thank you Req!');
//				messages.push('(Press button A)');
				pause = true;
				gameOver = true;
			} else {
				messages.push('403 Forbidden');
				messages.push('Res> Help me!');
			}
		} else
		if (field[playerY][playerX - 1]['content'] == 'map') {
			field[playerY][playerX - 1]['type'] = 0;
			messages.push('Got the map.');
			hasMap = true;
		} else
		if (field[playerY][playerX - 1]['content'] == 'key') {
			field[playerY][playerX - 1]['type'] = 0;
			messages.push('Got the key.');
			messages.push('(Press button A)');
			pause = true;
			hasKey = true;
		} else {
			field[playerY][playerX - 1]['type'] = 0;
			messages.push('404 Not Found');
		}
	}
}

function moveEnemy() {
	var timestamp = new Date().getTime();
	if (!lastMoveEnemyTime) lastMoveEnemyTime = timestamp;
	
	if ((lastMoveEnemyTime + 250) < timestamp) {
		lastMoveEnemyTime = timestamp;
		
		let directions = {'n': 0, 'e': 0, 's': 0, 'w': 0};
		if (field[enemyY - 1][enemyX]['type'] == 0 &&
		    (enemyY - 1 !== playerY || enemyX !== playerX)) {
			directions.n = 1;
		}
		if (field[enemyY][enemyX + 1]['type'] == 0 &&
		    (enemyY !== playerY || enemyX + 1 !== playerX)) {
			directions.e = 1;
		}
		if (field[enemyY + 1][enemyX]['type'] == 0 &&
		    (enemyY + 1 !== playerY || enemyX !== playerX)) {
			directions.s = 1;
		}
		if (field[enemyY][enemyX - 1]['type'] == 0 &&
		    (enemyY !== playerY || enemyX - 1 !== playerX)) {
			directions.w = 1;
		}

		let aisles = []
		if (enemyDirection == 'n') {
			if (directions.w) aisles.push('w');
			if (directions.n) aisles.push('n');
			if (directions.e) aisles.push('e');
		} else
		if (enemyDirection == 'e') {
			if (directions.n) aisles.push('n');
			if (directions.e) aisles.push('e');
			if (directions.s) aisles.push('s');
		} else
		if (enemyDirection == 's') {
			if (directions.e) aisles.push('e');
			if (directions.s) aisles.push('s');
			if (directions.w) aisles.push('w');
		} else
		if (enemyDirection == 'w') {
			if (directions.s) aisles.push('s');
			if (directions.w) aisles.push('w');
			if (directions.n) aisles.push('n');
		}
		
		let move = true;
		
		//分岐
		if (aisles.length > 1) {
			enemyDirection = aisles[rand(0, aisles.length - 1)];
		} else
		//一択
		if (aisles.length == 1) {
			enemyDirection = aisles[0];
		} else {
			//後ろに戻れるか
			if (enemyDirection == 'n' && directions.s) {
				enemyDirection = 's';
			} else
			if (enemyDirection == 'e' && directions.w) {
				enemyDirection = 'w';
			} else
			if (enemyDirection == 's' && directions.n) {
				enemyDirection = 'n';
			} else
			if (enemyDirection == 'w' && directions.e) {
				enemyDirection = 'e';
			} else {
				move = false;
			}
		}
		
		if (move) {
			if (enemyDirection == 'n') enemyY--;
			if (enemyDirection == 'e') enemyX++;
			if (enemyDirection == 's') enemyY++;
			if (enemyDirection == 'w') enemyX--;
		}
		
/*		const direction = ['n', 'e', 's', 'w'];
		enemyDirection = direction[rand(0, 3)];
		if (enemyDirection == 'n') {
			if (enemyY > 0 &&
			field[enemyY - 1][enemyX]['type'] == 0 &&
			(enemyY - 1 !== playerY || enemyX !== playerX)) {
				enemyY--;
			}
		} else if (enemyDirection == 'e') {
			if (enemyX < FIELD_W - 1 &&
			field[enemyY][enemyX + 1]['type'] == 0 &&
			(enemyY !== playerY || enemyX + 1 !== playerX)) {
				enemyX++;
			}
		} else if (enemyDirection == 's') {
			if (enemyY < FIELD_H - 1
			&& field[enemyY + 1][enemyX]['type'] == 0 &&
			(enemyY + 1 !== playerY || enemyX !== playerX)) {
				enemyY++;
			}
		} else if (enemyDirection == 'w') {
			if (enemyX > 0 &&
			field[enemyY][enemyX - 1]['type'] == 0 &&
			(enemyY !== playerY || enemyX - 1 !== playerX)) {
				enemyX--;
			}
		}*/
	}
}

function encountEnemy() {
	let isEncount = false;
	//n
	if (playerDirection == 'n' && enemyX == playerX && enemyY == playerY - 1) {
		enemyDirection = 's';
		isEncount = true;
	}
	//e
	if (playerDirection == 'e' && enemyX == playerX + 1 && enemyY == playerY) {
		enemyDirection = 'w';
		isEncount = true;
	}
	//s
	if (playerDirection == 's' && enemyX == playerX && enemyY == playerY + 1) {
		enemyDirection = 'n';
		isEncount = true;
	}
	//w
	if (playerDirection == 'w' && enemyX == playerX - 1 && enemyY == playerY) {
		enemyDirection = 'e';
		isEncount = true;
	}
	if (isEncount) {
		messages.push('307 Temporary Redirect');
		messages.push('Bad Req> Go away!');
		messages.push('(Press button A)');
		pause = true;
		exec307 = true;
	}
}