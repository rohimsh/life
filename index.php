
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="games,simple games,html games, html5, javascript,js, collector," />
    <meta name="description" content="avoid left and right boundaries and collect as many food as you can!">
    <meta name="author" content="rohit mishra">
    <meta name="mail-id" content="rohitmishra.nitjsr@gmail.com">
 <link rel="shortcut icon" href="images/favicon.png">
    <title>Life - the game </title>

<link href="snake.css" rel="stylesheet">
</head>
<body>
<canvas id="canvas"></canvas>

<div id="reMenu">
	<h1 id="snake2">Life</h1>
	<p id="info2">Game Over</p>
	<a href="javascript: void(0)" id="restart" onclick="restart()" >Restart</a> 	
</div>

<div id="menu">
	<h1 id="snake">Life</h1>
	<a href="javascript: void(0)" id="start" onclick="init()" >Start</a>
	<p id="loading">Loading...</p>
</div>
<p id="borderline" >&nbsp;</p>
<p id="score">Score: 0</p>
<!-- <p id="life">Life: * * * * *</p>
 -->
<!-- Audio -->
<audio id="main_music" loop>
	<source src="main.mp3" type="audio/mp3" />
<!-- 	<source src="http://dl.dropbox.com/u/26141789/canvas/snake/main.ogg" type="audio/ogg"/>
 --></audio>

<audio id="gameOver">
	<source src="go.mp3" type="audio/mp3" />
<!-- 	<source src="http://dl.dropbox.com/u/26141789/canvas/snake/go.ogg" type="audio/ogg"/>
 --></audio>

<audio id="bomb">
	<source src="bomb.mp3" type="audio/mp3" />
<!-- 	<source src="http://dl.dropbox.com/u/26141789/canvas/snake/food.ogg" type="audio/ogg"/>
 --></audio>
 <script type="text/javascript" src ="snake.js"></script>
 <script type="text/javascript" src ="cookie.js"></script>
</body>
</html>