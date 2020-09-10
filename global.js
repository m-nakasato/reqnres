
let startTime = null;

let gameOver = false;

let playerX = 1;
let playerY = 1;
let playerDirection = 'e'; //ewsn

let enemyX = FIELD_W - 2;
let enemyY = FIELD_H - 2;
let enemyDirection = 'w'; //ewsn

let messages = [];

let needTutorial01 = true;

let pause = true;

let pauseStartTime = null;

let downTime = 0;

let timeLeft = TIME_LIMIT;

//type: 0=通路, 1=壁, 2=扉
let field;

let hasKey = false;

//let hasMap = false;
let hasMap = true;

let isDrawKey = true;

//opening, main, ending
let mode = 'opening';

let playCount = 1;

let isInit = false;

let exec307 = false;

let lastMoveEnemyTime = null;

//let lastPlayerMoveTime = new Date().getTime();
let lastPlayerMoveTime = null;

let perspective = null;
let perspectiveRenderer = null;
