<template>
  <div id="app">

    <header>
      <!-- Website name -->
      <h1>{{ sitename }}</h1>
    </header>

    <!-- <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script> -->
    <link href='https://fonts.googleapis.com/css?family=Fraunces' rel='stylesheet'>
    <title>Coursework for Full Stack</title>

    <!--
      <header>
        Header using vue.js
        <h1 v-text="Coursework1Website"></h1>
      </header>
    -->
  </div>

  <main>
    <!-- Cart -->
    <a @click="toggleCart" id="cart"><img alt="Cart" id="carticon" src="../public/cart-icon.png"> {{ NOfItemsInCart }}
    </a>
    <!--Function to show cart-->
    <!--<div v-if="cart">-->

    <!-- Search functionality via to do list workshop-->
    <div id="SearchFunctionality">
      <h1>Lessons</h1>
      <input type="text" id="searchBar">
      <button id="searchButton">Search lessons</button>
    </div>

    <!-- Displaying all lessons using v-for -->
    <div id="Lessons">
      <div id="lessonItems">
        <!-- Using v-for to loop through lessons array -->
        <!-- For each lesson in the array create a new div using the id as the key -->
        <div v-for="lesson in lessons" :key="lesson.id" class="lesson-item">

          <!-- Displaying lesson properties from lesson array -->
          <h3>{{ lesson.subject }}</h3>
          <p>Location: {{ lesson.location }}</p>
          <p>Price: £{{ lesson.price }} per hour</p>
          <p>Description: {{ lesson.description }}</p>
          <p>Availability: {{ lesson.availability }} spaces</p>
          <!-- To display individual image from image property in lesson array -->
          <img v-bind:src="lesson.image" alt="Lesson Image" class="lesson-image">
          <br>
          <!-- Button to add to cart with Vue event handler, using id -->
          <!-- When availability is less than or equal to 0 disable button -->
          <button class="addToCartButton" @click="addToCart(lesson.id)" :disabled="lesson.availability <= 0">
            <!--Using ternary operator (IF statement TRUE ? option 1 : ELSE option 2)-->
            <!-- If lesson availability is greater than 0, then show "add to cart" for button, else show "no lessons available"-->
            {{ lesson.availability > 0 ? "Add to Cart" : "No lessons available" }}
          </button>

        </div>
      </div>
    </div>

    <div id="Lessons">
      <div id="Lesson1">
        <h3>Geography</h3>
        <p>Information: </p>
        <!--When clicked on, will add 1 lesson id to cart-->
        <button class="addToCartButton" value="Add to the Cart" @click="addToCart">Add to cart</button>
        <!-- v-on:click - when button is clicked add to cart function is ran -->
        <!-- v-show - when isAvailable is true the button will show, otherwise have added too many items to cart -->
        <!-- v-show="isAvailable -->
      </div>

      <div id="Lesson2">
        <h3>English</h3>
        <p>Information: </p>
        <button class="addToCartButton" value="Add to the Cart" @click="addToCart">Add to cart</button>
      </div>

      <div id="Lesson3">
        <h3>Maths</h3>
        <p>Information: {{ lessons.description }}</p>
        <button class="addToCartButton" value="Add to the Cart" v-if="isAvailable" @click="addToCart">Add to
          cart</button>
        <!-- IF ELSE CASE If you have added too many items, if else gets run
         where button gets disabled and message shows -->
        <div v-else>
          <button disabled>
            Disabled button
          </button>
          Selected the maximum number of available lessons
        </div>

      </div>
    </div>

  </main>

  <!--
</div>
Show cart outside of main through cart if div 
<div v-else>

  </div>
-->

  <h1>Welcome to Checkout</h1>
  <p><!--Binding name with v-model-->
    Name:
  </p>
  <input type="text" v-model="order.name">
  <!--V-model- Gets sent to order.name, binding element with order.name-->

  <p>Surname:</p>
  <input type="text" v-model="order.surname">

  <p>Email:</p>
  <input type="text" v-model="order.email">

  <!--Select button using v-model-->
  <p>Select region</p>
  <select v-model="order.region">
    <option disabled>Select Region</option>
    <option v-bind:value="order.region">Europe</option>
    <option v-bind:value="order.region">USA</option>
    <option v-bind:value="order.region">Asia</option>
    <option v-bind:value="order.region">Middle East</option>
    <option v-bind:value="order.region">Africa</option>
  </select>

  <p>Zip/Postcode:</p>
  <input type="text" v-model="order.postcode">

  <p>Address:</p>
  <input type="text" v-model="order.address">
  <!--Button for checking out-->
  <button v-on:click="submitCheckoutButton">Place Order</button>

  <h2> Order Information </h2>
  <p>Name: {{ order.name }}</p>
  <p>Surname: {{ order.surname }}</p>
  <p>Email: {{ order.email }}</p>
  <p>Region: {{ order.region }}</p>
  <p>Zip/Postcode: {{ order.postcode }}</p>
  <p>Deliver to address: {{ order.address }}</p>
  {{ order.lesson }}

  <!--
using v-for without key
If you don't need key
<ol>
  <li v-for="lesson in lessonCategories">{{lesson}}</li>
</ol>
-->

  <!-- Checkbox and Radio buttons for method.order
<p><input type="checkbox" id="gift" value="true" v-model="order.gift">
<label for="gift">Ship As Gift?</label></p>

Radio gives the choices, if above is seleted as true, like home or business address
<p><input type="radio" id="home" value="Home" v-model="order.method"></p>
Can select default options in order with 'home' for method and false properties for gift
-->
</template>

<script>

//import { ref } from 'vue';

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      sitename: "Lessons Website",
      lessons: [
        { id: 1001, subject: "Geography", location: "Oxford", price: 100, description: "Lessons located at the highly esteemed educational institute", availability: "5", image: "../public/geography.jpg" },
        { id: 1002, subject: "English Language", location: "London", price: 100, description: "Lessons aimed at improving english language skills", availability: "5", image: "../public/english.jpg" },
        { id: 1003, subject: "Maths", location: "Cambridge", price: 100, description: "Working on developing mathematical ability at Cambridge", availability: "5", image: "../public/maths.jpg" },
        { id: 1004, subject: "History", location: "Edinburgh", price: 90, description: "In-depth lessons on historical events and analysis in Edinburgh", availability: "5" },
        { id: 1005, subject: "Physics", location: "Manchester", price: 110, description: "Focused lessons on physics concepts and experiments in Manchester", availability: "5" },
        { id: 1006, subject: "Biology", location: "Bristol", price: 95, description: "Lessons designed to improve understanding of biological systems at Bristol", availability: "5" },
        { id: 1007, subject: "Chemistry", location: "Leeds", price: 105, description: "Lessons focusing on chemical reactions and principles in Leeds", availability: "5" },
        { id: 1008, subject: "Art", location: "Brighton", price: 80, description: "Creative art lessons to explore techniques and styles in Brighton", availability: "5" },
        { id: 1009, subject: "Music", location: "Liverpool", price: 120, description: "Music lessons designed to enhance skills and theory in Liverpool", availability: "5" },
        { id: 1010, subject: "Economics", location: "Birmingham", price: 110, description: "Lessons to improve economic understanding and application in Birmingham", availability: "5" }
      ],
      cart: [],
      lessonCategories: ['English', 'Maths', 'Science', 'Geography'],
      order: { // order details, by default setting it to empty string
        name: "",
        surname: "",
        email: "",
        region: "",
        postcode: "",
        address: "",
      }
      /**lesson1: {
        id: 1, title: "Geography", location: "Oxford", price: 100, description: "Geography lessons", availability: "5"
      },
      lesson2: {
        id: 2, title: "English", location: "London", price: 100, description: "English lessons", availability: "5"
      },
      lesson3: {
        id: 3, title: "Maths", location: "Cambridge", price: 100, description: "Math lessons", availability: "5"
      } */
    };
  },

  methods: {
    // function to push the lesson id of product into cart
    //define lessonId
    addToCart(lessonId) {
      this.cart.push(lessonId);
    },
    //function runs when checkout button is pressed
    //no parameters, call an alert that says congrats
    submitCheckoutButton() {
      alert("Purchase successful, thank you for shopping with us")
    }
  },
  computed: {
    // function to show number of items in cart
    // by returning cart length (number of product ids)
    NOfItemsInCart() {
      return this.cart.length;
    },
    //total elements available in inventory are more than elements added to cart 
    isAvailable() {
      // when total number of available elements have been added, button will be disabled
      //for each item
      return this.lessons.availability > this.NOfItemsInCart;
      // if (this.cart.length) isEqual (this.lessons.availability)
    }
  }
};


/** 
// Functionality to show specific sections after hiding the mainPage section
  // To hide the mainPage section that's visible by default
  function hideMainPage() {
    document.getElementById('mainPage').style.display = 'none';
  }

  // To show the targeted section and hide the mainPage section once another section is selected
  function showSection(sectionId) {
    // Calling function that hides the mainPage section
    hideMainPage();
    // Updates the hash in the URL to show the targeted section
    window.location.hash = sectionId.substring(1);
  }
  */

/*

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
  font-family: 'Fraunces';
  font-size: 22px;
  /**font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;*/
  margin: -8px;
  /** To make website fit page */
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

/* Styling for each individual lesson / lesson div
#lesson-item {

}

Styling of each individual image displayed in div
#lesson-image {
}
*/

/*Each individual div of the lesson items*/
#Lesson1,
#Lesson2,
#Lesson3 {
  border: solid 2px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 70px;
  padding-bottom: 20px;
  flex: content;
  align-items: flex-start;
  border-style: inset;
  padding-right: 80%;
  padding-left: 20px;
}

/*When hovering over lesson item, change background*/
#Lesson1:hover {
  background-image: url(../public/geography.jpg);
  color: white;
}

#Lesson2:hover {
  background-image: url(../public/english.jpg);
  color: white;
}

#Lesson3:hover {
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
#searchButton,
.addToCartButton {
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
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  height: 50px;
  width: 190px;
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

#searchButton:disabled,
.addToCartButton:disabled {
  pointer-events: none;
}

/*Change style and background colour when hovering*/
#searchButton:hover,
.addToCartButton:hover {
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
#carticon {
  margin-left: 70%;
  margin-top: 10px;
  margin-bottom: -30px;
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
