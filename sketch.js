var  dog, happyDog, database, foodS, foodStock;
var dogIMG , dogIMG1 , val ;
var happy;

function preload()
{
  dogIMG = loadImage( "images/dogImg.png" );
  dogIMG1 = loadImage( "images/dogImg1.png" );
}

function setup()
{
  createCanvas( 500 , 500 );
  database = firebase.database();
  foodStock = database.ref( 'Food' );
  foodS = foodStock.on( "value" , readStock );
  dog = image( dogIMG , 200 , 350 , 100 , 100 );
  happy = "no";
  setfood(20);

}


function draw()
{  
  background("green");
  drawSprites();
  push();
  fill( "black" );
  textSize( 20 );
  text( val , 250 , 100 );
  pop();
  if( keyWentDown( UP_ARROW ) )
  {
    happy = "yes"
    writeStock( val );
    dog = null;
  }
  if(happy==="no")
  {
    dog = image( dogIMG , 200 , 350 , 100 , 100 );
  }else
  {
    dog = image( dogIMG1 , 200 , 350 , 100 , 100 );
  }
  if( frameCount%240===0 )
  {
    happy="no";
  }
}

function readStock(data)
{
  val = data.val();
}

function writeStock(x)
{
  if( x<=0 )
  {
    x = 0;
  }else
  {
    x = x - 1;
  }

  database.ref( '/' ).update(
                              {
                                Food:x
                              }
                            );
}
function setfood(num)
{
  database.ref( '/' ).update(
    {
      Food:num
    }
  );
}