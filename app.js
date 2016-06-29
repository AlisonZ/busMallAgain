'use strict';

function makeRandomNum(){
  return Math.floor(Math.random() * allImages.length);
};

var clicks = 0;
var allImages = [];
var currentIndices = [];
var nameData = [];
var clickedData = [];

var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var images = document.getElementById('images');

function Image(name,location){
  this.name = name;
  this.location = location;
  this.clicked = 0;
  this.displayed = 0;
  allImages.push(this);
}

var bag = new Image('bag','assets/bag.jpg');
var banana = new Image('banana','assets/banana.jpg');
var bathroom = new Image('bathroom','assets/bathroom.jpg' );
var boots = new Image ('boots','assets/boots.jpg');
var breakfast = new Image ('breakfast', 'assets/breakfast.jpg');
var bubblegum = new Image('bubblegum', 'assets/bubblegum.jpg');
var chair = new Image('chair', 'assets/chair.jpg');
var cthulhu = new Image ('cthulhu', 'assets/cthulhu.jpg');
var dogDuck = new Image ('dogDuck', 'assets/dog-duck.jpg');
var dragon = new Image ('dragon', 'assets/dragon.jpg');
var pen = new Image ('pen', 'assets/pen.jpg');
var petSweep = new Image ('petSweep', 'assets/pet-sweep.jpg');
var scissors = new Image ('scissors', 'assets/scissors.jpg');
var shark = new Image ('shark', 'assets/shark.jpg');
var sweep = new Image ('sweep', 'assets/sweep.png');
var tauntaun = new Image ('tauntaun', 'assets/tauntaun.jpg');
var unicorn = new Image ('unicorn', 'assets/unicorn.jpg');
var usb = new Image ('usb', 'assets/usb.png');
var waterCan = new Image ('waterCan', 'assets/water-can.jpg');
var wineGlass = new Image ('wineGlass', 'assets/wine-glass.jpg');

//NOW GOING TO ASSIGN SOME RANDOM NUMBERS TO
function assignIndices(){

  var oneIndex = makeRandomNum();
  while(oneIndex === currentIndices[0] || oneIndex === currentIndices[1] || oneIndex === currentIndices[2]){
    oneIndex = makeRandomNum();
    // console.log('duplicate in one');
  }

  var twoIndex = makeRandomNum();
  while(oneIndex === twoIndex || twoIndex === currentIndices[0] || twoIndex === currentIndices[1] || twoIndex === currentIndices[2]){
    twoIndex = makeRandomNum();
    // console.log('duplicate in two');
  }

  var threeIndex = makeRandomNum();
  while(threeIndex === oneIndex || threeIndex === twoIndex || threeIndex === currentIndices[0] || threeIndex === currentIndices[1] || threeIndex === currentIndices[2]){
    threeIndex = makeRandomNum();
    // console.log('duplicate in three');
  }
  // console.log('here is outside of the duplicate part');
  currentIndices = [oneIndex, twoIndex, threeIndex];
  return currentIndices;
}

function displayImages(){
  assignIndices();
  // console.log('the display function worked');
  one.src = allImages[currentIndices[0]].location;
  one.alt = allImages[currentIndices[0]].name;
  allImages[currentIndices[0]].displayed += 1;

  two.src = allImages[currentIndices[1]].location;
  two.alt = allImages[currentIndices[1]].name;
  allImages[currentIndices[1]].displayed += 1;

  three.src = allImages[currentIndices[2]].location;
  three.alt = allImages[currentIndices[2]].name;
  allImages[currentIndices[2]].displayed += 1;
}

function handleImageClicks(){
  clicks += 1;
  for(var i = 0; i < allImages.length; i++){
    if(event.target.alt === allImages[i].name){
      allImages[i].clicked += 1;
      console.log('The product ' + event.target.alt + ' has been clicked ' + allImages[i].clicked + ' times.');
      // clickedData[i] = allImages[i].clicked;
    }
  }
  if (clicks > 4){
    console.log('got to 5 clicks');
  }
  else{
    displayImages();
  }
}
images.addEventListener('click', handleImageClicks);
displayImages();

////NEED TO FIGURE OUT HOW TO POPULATE THESE ARRAYS TO PUT IN CHART, BUT LET'S TRY AND GET A CHART WORKING FIRST
function makeChartDataArrays(){
  for(var i = 0; i < allImages.length; i++){
    nameData[i] = allImages[i].name;
    clickedData[i] = allImages[i].clicked;
  }
};



//MAKING A CHART

var chartData = {
  labels: nameData,
  datasets:[
    {
      fillColor: 'red',
      strokeColor: 'black',
      data: clickedData
    }
  ]
};
function drawChart(){
  makeChartDataArrays();
  var chart = document.getElementById('chart').getContext('2d');
  new Chart.Bar(chart,{
    data: chartData,
  });
};

document.getElementById('button').addEventListener('click', function(){
  drawChart();
});
