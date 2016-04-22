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
  //{ // this is sooooo slow and the image changes each time too
  //   name: 'Slow Chameleon',
  //   image: 'http://loremflickr.com/300/200/kitten?random=2',
  //   sourceURL: 'http://loremflickr.com',
  //   source: 'loremflickr.com',
  //   clickCount: 0
  // },
  {
    name: 'Free',
    image: 'img/cat01.jpg',
    sourceURL: 'http://all-free-download.com/',
    source: 'all-free-download.com',
    clickCount: 0
  },
  {
    name: "Andy",
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
    // grab elements and html for using in the render function
    this.$navList = $('#cat-list');
    this.render();
  },
  render: function(){
        console.log('hello viewList');
    // Cache vars for use in forEach() callback
    var $navList = this.$navList,
        catListID = '#';

    console.log('$navList: ' + $navList);
    console.log('octopus.getCats(): ' + octopus.getCats());

    // for each cat create a nav <li> item with unique id
    // and click handler to display chosen cat
    octopus.getCats().forEach(function(cat) {
      // nav item
      $navList.append('<li><a href="#" class="cat-list-item" id="show' + cat.catID + '">' + cat.name + '</a></li>');
      console.log('cat.name: ' + cat.name + 'cat.catID: ' + cat.catID);
      // save unique menu id
      var catListID = '#show' + cat.catID;
      // attach click event to unique id
      $(catListID).click(function(e){
        console.log('Display this cat: ' + catListID + ': ' + cat.name);
        viewCat.render(cat.catID);
      })
    });
  }
};

viewCat = {
  init: function(){
    // grab elements and html for using in the render function
    this.catShow = $('#selected-cat');
    // create random first cat
    octopus.setRandomCat();
    var randomCat = octopus.getSelectedCatID();
    this.render(randomCat);
  },
  // render specified cat receives catID as argument
  render: function(catRef){
    console.log('selectedCat: ' + catRef);
    console.log('hello viewCat: ' + octopus.getSelectedCat(catRef).name);
    var cat = octopus.getSelectedCat(catRef);
    // create html string for specified cat
    var htmlStr = '';
    htmlStr += '<figcaption><h3>' + cat.name + '</h3></figcaption>' +
            '<figcaption class="catCount">I has been clicked ' + cat.clickCount + ' times</figcaption>' +
            '<picture id="pic' + cat.catID + '"><img src="' + cat.image + '" alt="picture of kitten"></picture>' +
            '<figcaption>Kitten thanks to <a href="' + cat.sourceURL + '">' + cat.source + '</a></figcaption>';
    this.catShow.html( htmlStr );

    // add event handler for selected cat image
    this.catPic = $('#pic' + cat.catID + '');
    // attach click event to cat pic id
    $(this.catPic).click(function(e){
      console.log('Count this cat: ' + cat.name);
      // increment count
      octopus.incrementClicksForCat(cat.catID);
      e.preventDefault();
    })
  }
};

//************************
// Octopus
//************************

octopus = {
  init: function(){
    console.log('hello octopus');
    this.setCatID();
    viewList.init();
    viewCat.init();
  },
    // set all cat ids
  setCatID: function(){
    var i = 0;
    this.getCats().forEach(function(cat) {
      cat.catID = i++;
    });
  },

  //////////////////////////
  // model.selectedCat
  //////////////////////////

  // set a random id for the first cat to display
  setRandomCat: function(){
    var numCats = this.getNumCats();
    model.selectedCat = Math.floor(Math.random() * numCats);
  },
    // get selected cat ID from model
  getSelectedCatID: function(){
    return model.selectedCat;
  },

  //////////////////////////
  // model.cats[]
  //////////////////////////

  // get all cat objects from model
  getCats: function(){
    return model.cats;
  },
  // get number of cats from model
  getNumCats: function(){
    return model.cats.length;
  },
  // get list of cat names from model
  // http://stackoverflow.com/a/19590901/6156379
  getCatList: function(){
    return model.cats.map(function(catList) {return catList.name;});
  },
  // get selected cat object from model
  getSelectedCat: function(catRef){
    return model.cats[catRef];
  },
  // get selected cat name from model
  getCatName: function(catRef){
    return model.cats[catRef].name;
  },
  // get clickCount for selected cat
  getClicksForCat: function(catRef){
    return model.cats[catRef].clickCount;
  },
  // increment clickCount for selected cat
  incrementClicksForCat: function(catRef){
    model.cats[catRef].clickCount++;
    viewCat.render(catRef);
  }
};

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


octopus.init();

console.log( 'still working!' );
})
} ( jQuery ) );  // end of iife