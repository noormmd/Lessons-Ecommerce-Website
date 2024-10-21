<template>
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script> -->
    <link href='https://fonts.googleapis.com/css?family=Fraunces' rel='stylesheet'>
    <title>Coursework for Full Stack</title>
  </head>

  <body>
    <div id="app">
      <!--
      <header>
        To add header using vue.js
        <h1 v-text="Coursework1Website"></h1>
      </header>
    -->
    </div>
  </body>
  <main>
    <img alt="Cart" id="cart" src="../public/cart-icon.png">
    <!-- Search functionality via to do list workshop-->
    <div id="SearchFunctionality">
      <h1>Lessons</h1>
      <input type="text" id="searchBar">
      <button id="searchButton">Search lessons</button>
    </div>
    <div id="Lessons">
      <div id="Lesson1">
        <h3>Geography</h3>
        <p>Information: </p>
        <button class="addToCartButton">Add to cart</button>
      </div>

      <div id="Lesson2">
        <h3>English</h3>
        <p>Information: </p>
        <button class="addToCartButton">Add to cart</button>
      </div>

      <div id="Lesson3">
        <h3>Maths</h3>
        <p>Information: </p>
        <button class="addToCartButton">Add to cart</button>
      </div>

    </div>

<!--
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
-->
  </main>

  </html>
</template>

<script>
/*
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
*/
</script>

<style>
/*Background and text styling*/
#app {
  background-color: beige;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Fraunces';font-size: 22px;
  /**font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;*/
 margin: -8px; /** To make website fit page */
}

p {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

/*Entire lessons section div*/
#Lessons {
  border: solid 2px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
  border-color: darkgrey;
}

/*Each individual div of the lesson items*/
#Lesson1, #Lesson2, #Lesson3{
  border: solid 2px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 70px;
  padding-bottom: 20px;
  flex: content;
  align-items: flex-start;
  border-style:inset;
  padding-right: 80%;
  padding-left: 20px;
}

/*When hovering over lesson item, change background*/
#Lesson1:hover{
  background-image: url(../public/geography.jpg);
  color: white;
}

#Lesson2:hover{
  background-image: url(../public/english.jpg);
  color: white;
}

#Lesson3:hover{
  background-image: url(../public/maths.jpg);
  color: white;
}

/*Search bar input form*/
  #searchBar {
    color: black;
border-radius: 30px;
border: 1px solid;
padding: 10px;
width: 250px;
margin-left: 16%;
  align-items: center;
    justify-content: center;
}

/*Buttons styling*/
#searchButton, .addToCartButton {
border-radius: 30px;
border: 1px solid;
padding: 10px;
  align-items: center;
    justify-content: center;
    margin-left: 10px;
    text-decoration-color: azure;

  appearance: none;
  background-color: transparent;
  border: 1px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  height:50px;
  width:190px;
  outline: none;
  padding: 12px 10px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
  margin-left: 15px;
}

#searchButton:disabled, .addToCartButton:disabled {
  pointer-events: none;
}

/*Change style and background colour when hovering*/
#searchButton:hover, .addToCartButton:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button-28:active {
  box-shadow: none;
  transform: translateY(0);
}

/*Cart icon*/
#cart {
  margin-left: 70%;
  margin-top: 10px;
}

/*Styling of add to cart button*/
.addToCartButton {
border-radius: 15px;
border: solid 1px;
}

/*Change colour of button when hovering over it*/
button:hover {
background-color: darkgray;
}
</style>
