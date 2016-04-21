( function ( $ ) {
  //'use strict';
  // temporarily define mvc in global scope to check functionality using console

  // use $(document).ready() for jQuery code in external js file
  // $(function(){}) is shorthand for $(document).ready(function(){}

    $( function () {
      console.log( 'working!' );

//************************
// Model
// cat data is here
//************************

model = {
  cats: [
  {
    name: 'Mystery',
    image: 'http://placekitten.com/300/200',
    sourceURL: 'http://placekitten.com',
    source: 'placekitten.com',
    clickCount: 0
  },
  {
    name: 'Elsa',
    image: 'img/elsa.jpg',
    sourceURL: '#',
    source: "Mum's Cat",
    clickCount: 0
  },
  {
    name: 'Molly',
    image: 'img/molly.jpg',
    sourceURL: '#',
    source: "Lin's Cat",
    clickCount: 0
  },
  {
    name: 'Nero',
    image: 'img/nero.jpg',
    sourceURL: '#',
    source: "Mum's Cat",
    clickCount: 0
  },
  {
    name: 'Reggie',
    image: 'img/reggie.jpg',
    sourceURL: '#',
    source: "Mum's Cat",
    clickCount: 0
  },
  {
    name: 'Flicker',
    image: 'http://loremflickr.com/300/200/kitten?random=2',
    sourceURL: 'http://loremflickr.com',
    source: 'loremflickr.com',
    clickCount: 0
  },
  {
    name: 'Free',
    image: 'img/cat01.jpg',
    sourceURL: 'http://all-free-download.com/',
    source: 'all-free-download.com',
    clickCount: 0
  },
  {
    name: "Andy's Cat",
    image: 'img/andy.jpg',
    sourceURL: 'https://github.com/udacity/ud989-cat-clicker-andy',
    source: 'Udacity Andy',
    clickCount: 0
  }
  ],
  selectedCat: 0
};

//************************
// Views
// viewList for the nav menu
// viewCat to display selected cat
//************************

viewList = {
  init: function(){
    console.log('hello viewList');
    // create octopus.getNumCats() to query model and return length of cat array
    this.numCats = octopus.getNumCats();
    console.log('this.numCats: ' + this.numCats);

    // grab elements and html for using in the render function
    this.$navList = $('#cat-list');

    this.render();
  },
  render: function(){
    // Cache vars for use in forEach() callback (performance)
    var $navList = this.$navList;
    console.log('$navList: ' + $navList);
    console.log('octopus.getCats(): ' + octopus.getCats());
    octopus.getCats().forEach(function(cat) {

      $navList.append('<li><a href="#" class="cat-list-item" id="' + cat.catID + '">' + cat.name + '</a></li>');

      console.log('cat.name: ' + cat.name + 'cat.catID: ' + cat.catID);
    });
  }
};

viewCat = {
  init: function(){},
  render: function(){}
};

//************************
// Octopus
//************************

octopus = {
  init: function(){
    this.setCatID();
    viewList.init();
  },
  // get number of cats from model
  getNumCats: function(){
    return model.cats.length;
  },
  // get selected cat object from model
  getSelectedCat: function(catRef){
    return model.cats[catRef];
  },
  // get all cat object from model
  getCats: function(){
    return model.cats;
  },
  // get selected cat name from model
  // http://stackoverflow.com/a/19590901/6156379
  getCatList: function(){
    return model.cats.map(function(catList) {return catList.name;});
  },
  // get selected cat name from model
  getCatName: function(catRef){
    return model.cats[catRef].name;
  },
  // increment clickCount for selected cat
  getClicksForCat: function(catRef){
    return model.cats[catRef].clickCount;
  },
  // increment clickCount for selected cat
  incrementClicksForCat: function(catRef){
    model.cats[catRef].clickCount++;
  },
  // set a random id for the first cat to display
  setRandomCat: function(){
    var numCats = this.getNumCats();
    model.selectedCat = Math.floor(Math.random() * numCats);
  },
  // set a cat ids
  setCatID: function(){
    var i = 0;
    this.getCats().forEach(function(cat) {
      cat.catID = i++;
      console.log('cat.catID: ' + cat.catID);
  });


  }
};


// the chosen cat
var catSelected;


//************************
// Cat class
// old style create class: var Cat = function () {};
// new ECMAScript 6 style: var Cat = class {};
// numCats will be number of items in cat array in json
//************************

class Cat {
  constructor(num) {
    this.catID = num;
    this.count = 0;
    this.name = model.cats[num].name;
    this.image = model.cats[num].image;
    this.sourceURL = model.cats[num].sourceURL;
    this.source = model.cats[num].source;
  }

  clicked() {
    var pic = '#span' + this.catID + '';
    $(pic).text(++this.count);
  }
}

var catArray = [];

function createCats(numCats){
  for (var i = 0; i < numCats; i++) {
    catArray.push(new Cat(i));
  }

}

//************************
// Cat Navigation
//************************

var catNav = $('#cat-list');

function createCatNav(){
  //catNav.append('<ul></ul>');
  for (var i = 0; i < catArray.length; i++) {
    catNav.append('<li><a href="#" class="cat-list-item" id="' + catArray[i].catID + '">' + catArray[i].name + '</a></li>');
  }

  var catLinks = $('.cat-list-item').toArray();
  for (var i = 0; i < catLinks.length; i++) {
    catLinks[i].onclick = function() {
      //console.log(catArray[this.id]);
      catShow(catArray[this.id]);
    };
  }
}

//************************
// Cat Display
// Cat display format
//************************

function catDisplay(){
  var catUnit;
  var catName;
  var catImage;
  var catSource;

  for (var i = 0, kittyCount = catArray.length; i < kittyCount; i++){
    catUnit = '<div class="cat-unit" id="' + catArray[i].catID + '"><figure id="' + catArray[i].catID + '"></figure></div>';
    catName = '<figcaption><h3>' + catArray[i].name + '</h3></figcaption>';
    catImage = '<picture><img src="' + catArray[i].image + '" alt="picture of kitten"></picture>';
    catSource = '<figcaption>Kitten thanks to <a href="' + catArray[i].sourceURL + '">' + catArray[i].source + '</a></figcaption>';

    $('#cat-arena').append(catUnit);
    $('figure:last').append(catName);
    $('figure:last').append('<figcaption class="kitInfo">I has been clicked <span id="span' + catArray[i].catID + '">' + catArray[i].count + '</span> times</figcaption>');
    $('figure:last').append(catImage);
    $('figure:last').append(catSource);
  }
}

//************************
// Cat Show
// Show only the selected cat
//************************

function catShow(catChoice){
  catSelected = catChoice;
  model.selectedCat = catChoice.catID;

  $('div .cat-unit').each(function(){
    if($(this).attr('id') == model.selectedCat){
      $(this).show();
    }else{
      $(this).hide();
    }
  });
}

//************************
// Cat Clicker
//************************

function catClicker(numCats){
  createCats(numCats);
  createCatNav();
  catDisplay();
  var catRandom = Math.floor(Math.random() * numCats);
  model.selectedCat = catRandom;
  catShow(catArray[catRandom]);
}

// use $(document).ready() for jQuery code in external js file
// $(function(){}) is shorthand for $(document).ready(function(){})

$(document).ready(function() {
  $('picture').click(function (event) {
    // first succesful solution
    // var target = $(this).parent().children('.kitInfo');
    // // update number of clicks for the particular cat.
    // target.text('I has been clicked ' + ++catSelected.count + ' times');

    // // this acts as a closure on the currently selected cat - I think!
    catSelected.clicked();
  });
});

catClicker(model.cats.length);

octopus.init();

console.log( 'still working!' );
})
} ( jQuery ) );  // end of iife