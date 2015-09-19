//Preloading audio stuff
var mainMusic = document.getElementById("main_music"),
		bombMusic = document.getElementById("bomb"), 
		goMusic = document.getElementById("gameOver");
var files = [mainMusic, bombMusic, goMusic];
var counter = 0;

var start = document.getElementById("start"),
		loading = document.getElementById("loading");

for(var i = 0; i < files.length; i++) {
	var file = files[i];
	file.addEventListener("loadeddata", function() {
		counter++;
		var percent = Math.floor((counter/files.length)*100);
		loading.innerHTML = "Loading " + percent + "%";
		if(percent == 100) showButton();
	});
}

//  audio loaded \\

//show button for starting the game

function showButton() {
	start.style.top = "30%";
	loading.style.top = "100%";
}

// end of button show \\


//Initializing Canvas
var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		
		//Full width and height
		w = window.innerWidth,
		h = window.innerHeight;
	
canvas.height = h;
canvas.width = w;


//for canvas full height and width are taken 


var reset, scoreText,menu, reMenu,bordery,borderbottom,speedofbomb=800,speedofbasket, score = 0;


//initialisation func.


function init() {
	mainMusic.play();
	menu.style.zIndex=-1;
	menu.className="hide";
	

	var Basket,
			size = Math.ceil(w/100),
			speed = 25,
			dir,
			game_loop,
			over = 0,
			hitType,life=100,no_of_bomb=1,gamelive=1;


	var f = [];//array that holds bombs

	borderbottom=(9*h/10);


// paint the canvas

	function paintCanvas() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, w, h);
	}
	
// full canvas painted black 
//snake area paonted black
function paintsnakearea(){
		ctx.fillStyle = "black";
		ctx.fillRect(0, borderbottom-1, w, 10*size);
}

//func to design bombs by defining a variable bomb as a func.

	var bomb = function(){
		var H = h/10;
		Bomb=[];
		this.x = Math.round(Math.random() * (w - size) / size);
		this.y = Math.round(Math.random() * (H - size) / size);
		Bomb.push({x: this.x, y: this.y });
		this.draw = function() {
			ctx.fillStyle = "green";
			ctx.fillRect(this.x*size, this.y*size, size, size);

		}


		var head_x = Bomb[0].x;
		var head_y = Bomb[0].y;
	

			//Move Basket

			var	paintback=
				setInterval(function()
					{
					var tail = Bomb.pop();
					tail.x = head_x;
					tail.y = head_y;
					Bomb.unshift(tail);
					ctx.fillStyle = "black";
					ctx.fillRect(Bomb[0].x*size, head_y*size, size, size);


					head_y+=2;
					if(head_y*size<borderbottom)
					{ctx.fillStyle = "green";
					ctx.fillRect(Bomb[0].x*size, head_y*size, size, size);			
					}
					else
					{
					ctx.fillStyle = "red";
					ctx.fillRect(Bomb[0].x*size, head_y*size, size, size);			

					}

//bomb collision
		var collide=0;
		for(var i=0;i<Basket.length;i++)
		{
			if(Basket[i].x==head_x&&head_y*size>=borderbottom-size&&head_y*size<borderbottom+(2*size))
				{collide=1;
					break;
				}
		}
		if(collide&&gamelive) {	
			score += 10;
			bombMusic.pause();
			bombMusic.currentTime = 0;
			bombMusic.play();
			
			//Increase speed
			if(speed <= 45) speed ++;

					ctx.fillStyle = "white";
					ctx.fillRect(Bomb[0].x*size, head_y*size, size, size);	

					ctx.fillStyle = "black";
					ctx.fillRect(Bomb[0].x*size, head_y*size, size, size);	

					clearInterval(paintback);	

		}

			if(life>=0&&gamelive)
			scoreText.innerHTML = "Score: "+score+" &nbsp;||&nbsp; Life: "+life;
	
			if(head_y*size>=borderbottom+(2*size))
			{clearInterval(paintback);
				life--;
				if(life<=0)
					gameover();
			}
				},500);	


	}

// bomb defined \\



//create bombs
	function createbombs(){
		for(var i=0;i<no_of_bomb;i++ )
		     f[i] = new bomb();
	}

// bombs created \\



//Initialize the Basket as a skeleton 
	function initBasket() {
		var length = 10;//length of basket rectangle  
		Basket = [];
		for(var i = length - 1; i >= 0; i--) {
			Basket.push({x: i, y: borderbottom/size });
		}
	}

// paint the skeleton basket above created


	function paintBasket() {
		paintsnakearea();
		for(var i = 0; i < Basket.length; i++) {
			var s = Basket[i];
			ctx.fillStyle = "white";
			ctx.fillRect(s.x*size, s.y*size, size, size);

		}
	}
// painting done \\

//remove basket 
	function removeBasket() {
		for(var i = 0; i < Basket.length; i++) {
			var s = Basket[i];
			ctx.fillStyle = "black";
			ctx.fillRect(s.x*size, s.y*size, size, size);

		}
	}


//update the basket timely 


	function updateBasket() {

//Update the position of the Basket
		var head_x = Basket[0].x;
		var head_y = Basket[0].y;
		
//Get the directions
		document.onkeydown = function(e) {
			var key = e.keyCode;
			//console.log(key);
			
			if(key == 37 ) setTimeout(function() {dir = "left"; }, 30);
			else if(key == 39) setTimeout(function() {dir = "right"; }, 30);

			if(key) e.preventDefault();

		}
// directions done \\			


//Directions updated based on key pressed above
			if(dir == "right") head_x++;
		    else if(dir == "left") head_x--;

		
//Move Basket
		var tail = Basket.pop();
		tail.x = head_x;
		tail.y = head_y;
		Basket.unshift(tail);
		  

//Wall Collision
		if(head_x >= w/size || head_x <= -1) {					
			if(over == 0) {
				hitType = "wall";
				gameover();
			}
			over++;
		}
		
		
	}

/// basket updated 


paintCanvas();//fill the canvas black

bomb_loop=setInterval(function(){drawbomb()},speedofbomb);
setInterval(function(){updateBasket()},50);


		function draw() {
			paintBasket();//paint the basket as white
		}
			//Draw bomb
			function drawbomb(){
			for(var i=0;i<no_of_bomb;i++ )
				{		
					createbombs();
					f[i].draw();
				}
		}
	
		reset = function() {
			initBasket();
			reMenu.style.zIndex = "-1"
			dir = "right";
			over = 0;
			speed = 30;
			if(typeof game_loop != "undefined")  clearInterval(game_loop); 
			game_loop = setInterval(draw, 1000/speed);
			

			score = 0;
			scoreText.innerHTML = "Score: "+score+" &nbsp;||&nbsp; Life: "+life;
			mainMusic.currentTime = 0;
			mainMusic.play();
			
			return;
		}
///////////////////////////////////cookie loaders ;) /////////////////////////////////////////



function setCookie(cname,str,exdays)
{

var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
var cq=getCookie("collectorhs");
if(parseInt(cq)<str)
{

  document.cookie = cname+"="+str+";"+expires;
  return true;
}
return false;
}


function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) 
  return c.substring(name.length,c.length);
  }

return "0";
}


///////////////////////////cookie loaded ;)/////////////////////////////////////////////////////
		
		function gameover() {

			clearInterval(bomb_loop);
			clearInterval(game_loop);
			mainMusic.pause();
			goMusic.play();
			gamelive=0;
			removeBasket();
			if(setCookie("collectorhs",score,365))
     			alert("Wow! You created a new high score "+score);
			var hiscore = getCookie("collectorhs");
		    scoreText.innerHTML = "Your score: "+score+" || High score: "+hiscore;
     		reMenu.style.zIndex = "1";



		}
	
	reset();
}

//Menus
function startMenu() {
	menu = document.getElementById("menu");
	reMenu = document.getElementById("reMenu");
	
	scoreText = document.getElementById("score");
	reMenu.style.zIndex = "-1";
}

function restart()
{
	window.location.reload();
}
startMenu();
