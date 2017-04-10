/**
 * Created by Excelle on 2017-03-30.
 */

var canvas = document.getElementById("canvas");
canvas.width=700;
canvas.height = 600;
var surface = canvas.getContext("2d");
var output=document.getElementById("output");
const SIZE = 100;
const ROWS = 6;
const COLS = 7;
var score=0;
var left = false;
var right = false;
var up = false;
var down = false;
var fired=false;
var y=false;
var astro = {x:SIZE*3, y:550, speed:10,
              dX:0, dY:0, image:null};
var blast = {x:astro.x+40, y:astro.y, speed:10,
              dX:0, dY:0, image:null};			
var enemy=[];
var enemy1 = new Image();
enemy1.src = "images/enemy01.png";
var enemy2 = new Image();
enemy2.src = "images/enemy02.png";
var enemy3 = new Image();
enemy3.src = "images/enemy03.png";
var aster = new Image();
aster.src = "images/aste.png";
var particle = new Image();
particle.src = "images/particle.png";
var map = [];

startGame();

function startGame()
{
	var astron = new Image();
	astron.src = "images/antonaut.png";
    astro.image = astron;
	var fire = new Image();
	fire.src = "images/fire.png";
    blast.image = fire;
	generateMap();
	spawnEnemy();
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}

function generateMap()
{
	for (var row = 0; row < ROWS+1; row++) 
	{
		map[row] = []; 
		for (var col = 0; col < COLS; col++) 
		{
			var tempTile = { x:col*SIZE, y:row*SIZE,image:null,
							aRock:false};
			tempTile.image = particle;
			map[row][col] = tempTile;			
		}
	}
}

function spawnEnemy()
{
	for (var i = 0; i< 3; i++)
	{ 
		var tile = {};
		tile.x = (i+1 )*COLS*SIZE ;
		tile.y = Math.floor(Math.random()*300+1); 
		tile.alive=true;
		switch(i)
		{
			case i=0:
				tile.img = enemy1;
				break;
			case i=1:
				tile.img = enemy2;
				break;
			case i=2:
				tile.img = enemy3;
				break;				 
		}
        enemy[i] = tile;
	}
}

function onKeyDown(event)
{
	switch(event.keyCode)
	{
		case 37: // Left Button
				if ( left == false )
					left = true;
				break;
		case 39: // Right Button
				if ( right == false )
					right = true;
				break;
		case 38: // Up Button
				if ( up == false )
					up = true;
				break;
		case 40: // Down Button
				if ( down == false )
				down = true;
				break;
		case 32:
				if ( fired == false )
				fired = true;
				fire();
				break;
		default:
				console.log("Unhandled key.");
				break;
	}
}

function onKeyUp(event)
{
	switch(event.keyCode)
	{
		case 37: // Left Button
				left = false;
				break;
		case 39: // Right Button
				right = false;
				break;
		case 38: // Up Button
				up = false;
				break;
		case 40: // Down Button
				down = false;
				break;
		case 32:
				fired=false;
				break;
		default:
				console.log("Unhandled key.");
				break;
	}
}

var idInt =	setInterval(update, 33.34);
function update()
{
	moveEnemy();
	moveAstro();
	collision();
	moveBg();
	render();	
}

function moveEnemy()
{
	for(var i = 0; i < enemy.length; i++)
	{
        enemy[i].x -= 3;
	}
	for(var s = 0; s < enemy.length; s++)
	{
		if(enemy[s].x <=  -100)
		{
            enemy[s].alive=true;
            enemy[s].x=2000 ;
            enemy[s].y= Math.floor(Math.random()*300+1);
		}	
	}
}

//QUOTED the blast (assumed) position reset as the bullet keeps on moving along the player's x axis as it moves
function moveAstro()
{
	if ( left == true && astro.x > SIZE/2 )
	{
        astro.x -= astro.speed;
        //blast.x -= blast.speed;
	}
	if ( right == true && astro.x < 700 - SIZE/2 )
	{
        astro.x += astro.speed;
        //blast.x += blast.speed;
	}
	if ( up == true && astro.y > SIZE/2)
	{
        astro.y -= astro.speed;
        //blast.y -= blast.speed;
	}
	if ( down == true && astro.y < 600 - SIZE/2)
	{
        astro.y += astro.speed;
        //blast.y += blast.speed;
	}
}

function moveBg()
{
	for (var row = 0; row < map.length; row++)
	{
		for (var col = 0; col < map[0].length; col++)
		{
			map[row][col].y += 5;
		}
	}

	if(map[map.length-1][map[0].length-1].y >= canvas.height)
	{
		var tempRow=[];
		map.pop();
		for(var i=0;i<map[0].length;i++)
		{
			var l = Math.floor(Math.random() * COLS);
			var tempTile = {x:i*SIZE, y:-1*SIZE,image:null,
								aRock:false};
				switch(l%4)
				{
					case 0:
					case 1:
					case 2:
						tempTile.image = particle;
						break;
					case 3:
						tempTile.image = aster;
						tempTile.aRock=true;
						break;			 
				}			
					tempRow.push(tempTile);
		}
		map.unshift(tempRow);
	}
}

function collision()
{
	for(var r = 0; r < map.length; r++)
	{
		for(var c = 0; c < map[0].length; c++)
		{
			if(map[r][c].aRock===true)
			{
				if( (astro.x+100 <= map[r][c].x-10) || (astro.x <= map[r][c].x-10  && astro.x >= map[r][c].x+90))
				{
					if(astro.y >= map[r][c].y && astro.y <= map[r][c].y+100 )
					{
							//alert("crash" + r+c);
					}
				}
			}
		}
	}
}

function fire()
{
		y=true;
		intId=setInterval(move,30);
}

function move()
{
	if(y)
	{
        //blast.x -= blast.speed;
        blast.y -= 5;
		if(blast.y <= 0)
		{
			clearInterval(intId);
            blast.y=astro.y-30;
		}
	}
	for(var i = 0; i < enemy.length; i++)
	{
		if( (blast.x+20   >= enemy[i].x+50 || blast.x >= enemy[i].x+50) && (blast.x <= enemy[i].x+150) )
		{
			if( (blast.y <= enemy[i].y+SIZE) && (blast.y >= enemy[i].y) )
			{
				clearInterval(intId);
                blast.y=astro.y-25;
				
				score+=1;
                enemy[i].alive = false;
			}
		}
	}
	output.innerHTML="Score : "+score;
}

function render()
{
	surface.clearRect(0, 0, canvas.width, canvas.height); 
	for (var row = 0; row < map.length; row++)
	{
		for (var col = 0; col < map[0].length; col++)
		{
			
			if (map[row][col].image != null)
				surface.drawImage(map[row][col].image,
								  map[row][col].x,
								  map[row][col].y);
				
		}
	}	
	for (var i = 0; i < enemy.length; i++)
	{
		if (enemy[i].alive == true)
		surface.drawImage(enemy[i].img, enemy[i].x, enemy[i].y);
		surface.beginPath();
			//surface.lineWidth="3";
			//surface.strockeStyle="green";
			surface.rect(enemy[i].x,enemy[i].y,SIZE,SIZE);
			//surface.stroke();
	}
	if(y)
	{surface.drawImage(blast.image,blast.x-SIZE/2,blast.y-SIZE/2+40);}
	surface.drawImage(astro.image,astro.x-SIZE/2,astro.y-SIZE/2)
}