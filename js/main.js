'use strict';

// need some clarity! try creating a Cat class.

// the chosen cat
var catSelected;

// cat JSON

var cats = {
  cat: [
  {
    name: 'Mystery',
    image: 'http://placekitten.com/300/200',
    sourceURL: 'http://placekitten.com',
    source: 'placekitten.com',
  },
  {
    name: 'Elsa',
    image: 'img/elsa.jpg',
    sourceURL: '#',
    source: "Mum's Cat",
  },
  {
    name: 'Molly',
    image: 'img/molly.jpg',
    sourceURL: '#',
    source: "Lin's Cat",
  },
  {
    name: 'Nero',
    image: 'img/nero.jpg',
    sourceURL: '#',
    source: "Mum's Cat",
  },
  {
    name: 'Reggie',
    image: 'img/reggie.jpg',
    sourceURL: '#',
    source: "Mum's Cat",
  },
  {
    name: 'Flicker',
    image: 'http://loremflickr.com/300/200/kitten?random=2',
    sourceURL: 'http://loremflickr.com',
    source: 'loremflickr.com',
  },
  {
    name: 'Free',
    image: 'img/cat01.jpg',
    sourceURL: 'http://all-free-download.com/',
    source: 'all-free-download.com',
  },
  {
    name: "Andy's Cat",
    image: 'img/andy.jpg',
    sourceURL: 'https://github.com/udacity/ud989-cat-clicker-andy',
    source: 'Udacity Andy',
  }
  ]
};

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
    this.name = cats.cat[num].name;
    this.image = cats.cat[num].image;
    this.sourceURL = cats.cat[num].sourceURL;
    this.source = cats.cat[num].source;
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
  catNav.append('<ul></ul>');
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

  $('div .cat-unit').each(function(){
    if($(this).attr('id') == catSelected.catID){
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

catClicker(cats.cat.length);