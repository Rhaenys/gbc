/**
 * Created by Excelle on 2017-03-30.
 */

var div = document.getElementById("div");
var canvas = document.querySelector("canvas");
canvas.width=700;
canvas.height = 600;
var surface = canvas.getContext("2d");

const ROWS = 6;
const COLS = 7;
const SIZE = 100;
const SCROLL = 5;

var antonaut = {x:SIZE*2, y:SIZE*3, speed:10,
    dX:0, dY:0, image:null};

var fire = {x:SIZE*3, y:SIZE*3, speed:10,
    dX:0, dY:0, image:null};

var uIval = setInterval(update, 33.34); // 30fps

var map = []; // = new Array(ROWS);

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var fireIsMoving = false;
var fireX;
var fireY;

startGame();

function startGame()
{
    var pImage = new Image();
    pImage.src = "img/antonaut.png";
    antonaut.image = pImage;
    var fImage = new Image();
    fImage.src = "img/fire.png";
    fire.image = fImage;
    doMap();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function doMap()
{
    for (var row = 0; row < ROWS+1; row++) // Run 6 times for each row
    {
        map[row] = []; // = new Array(COLS+1);
        for (var col = 0; col < COLS; col++) // Runs 9 times for each col
        {
            var tempTile = { x:col*SIZE, y:row*SIZE, image:null };
            tempTile.image = new Image();// Temp line.
            tempTile.image.src = "img/rock.png";
            map[row][col] = tempTile;
        }
    }
}

window.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {



}


function onKeyDown(event)
{
    switch(event.keyCode)
    {
        case 37: // Left.
            if ( leftPressed == false )
                leftPressed = true;
            break;
        case 39: // Right.
            if ( rightPressed == false )
                rightPressed = true;
            break;
        case 38: // Up.
            if ( upPressed == false )
                upPressed = true;
            break;
        case 40: // Down.
            if ( downPressed == false )
                downPressed = true;
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
        case 37: // Left.
            leftPressed = false;
            break;
        case 39: // Right.
            rightPressed = false;
            break;
        case 38: // Up.
            upPressed = false;
            break;
        case 40: // Down.
            downPressed = false;
            break;
        default:
            console.log("Unhandled key.");
            break;
    }
}

function update() // Going to run 30fps
{
    movePlayer();
    moveFire();
    scrollMap();
    // move enemies
    // collision check
    // animate sprites
    render();
}

function movePlayer()
{
    if ( leftPressed == true && antonaut.x > SIZE/2 )
    {
        antonaut.x -= antonaut.speed;
        fire.x -= fire.speed;
    }
    if ( rightPressed == true && antonaut.x < 800 - SIZE/2 )
    {
        antonaut.x += antonaut.speed;
        fire.x += fire.speed;
    }

    if ( upPressed == true && antonaut.y > SIZE/2)
    {
        antonaut.y -= antonaut.speed;
        fire.y -= fire.speed;
    }

    if ( downPressed == true && antonaut.y < 600 - SIZE/2)
    {
        antonaut.y += antonaut.speed;
        fire.y += fire.speed;
    }

}

/*
function moveFire()
{
    if ( leftPressed == true && fire.x > SIZE/2 )
        fire.x -= fire.speed;
    if ( rightPressed == true && fire.x < 800 - SIZE/2 )

    if ( upPressed == true && fire.y > SIZE/2)

    if ( downPressed == true && fire.y < 600 - SIZE/2)

}
*/

function scrollMap()
{
    for (var row = 0; row < map.length; row++)
    {
        for (var col = 0; col < map[0].length; col++)
        {
            map[row][col].y += SCROLL;
        }
    }
    var temRow=[];
    for (var row = 0; row < map.length; row++)
    {
        var tempTile = { x:row*SIZE, y:-1*SIZE, image:null };
        tempTile.image = new Image();// Temp line.
        tempTile.image.src = "img/rock.png";
        temRow[row]=tempTile;
    }
    for(var r = 0; r < ROWS+1; r++){
        for(var c = 0; c < COLS; c++){
            if (map[r][c].y >= 600)
            {

                map[r][c].y=-100;

            }}}
}

function keyDownHandler(e)
{
    if(e.keyCode == 32) {  // if spacebar was pressed

        if (!fireIsMoving) // Only fire missile if one is not already in the air

            firing();
    }
}

function firing()
{
    fireIsMoving = true;
    intvId = setInterval(moveFire, 30);
}

function moveFire()
{
    if(fireIsMoving)
    {
        fire.y -= 7;
        fire.dX += 5;
        if(fire.y <= 0) {
            clearInterval(intvId);
            fire.y=antonaut.y+1;
        }}

}


function render()
{
    surface.clearRect(0, 0, canvas.width, canvas.height); // x, y, w, h
    // Render map...
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
    // Render player...

    surface.drawImage(fire.image,fire.x-SIZE,fire.y-SIZE+50);
    surface.drawImage(antonaut.image,antonaut.x-SIZE/2,antonaut.y-SIZE/2);
    //i want to press spacebar before drawing the fire

}
