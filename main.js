function main(timestamp) {
	if (isInit) {
//		init();
	}
	
	if (!startTime) startTime = timestamp;
	var progress = timestamp - startTime;
//console.log('draw');
	
	if (pause) {
		if (!pauseStartTime) pauseStartTime = timestamp;
	} else {
		if (pauseStartTime !== null) {
			downTime += parseInt((timestamp - pauseStartTime) / 1000);
			pauseStartTime = null;
		}
		timeProgress(parseInt(progress / 1000) - downTime);
	}
	
	perspectiveRenderer.clearRect(0, 0, perspective.width, perspective.height);
	
	if (mode == 'opening') {
		opening();
	} else
	if (mode == 'main') {
		if (!pause && !gameOver) {
			moveEnemy();
			
	//		encountEnemy();
		}
		
		drawPerspective();
		
		drawCompass();

		drawEnemy();
		
		drawGoal();
		
		if (isDrawKey) {
			drawKey();
		}
		
	//	if (!gameOver) {
			drawPlayer();
	//	}
		
		if (hasMap) {
			drawMap();
		}
		
		if (hasKey && !isDrawKey) {
			drawKeySign();
		}
		
		drawMessage();
		
		drawTimeLimit();
	}
	
	//終了条件
	var isContinue = true;
	if (isContinue) {
		requestAnimationFrame(main);
	}
}
