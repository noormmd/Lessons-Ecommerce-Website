// importing http module
const http = require('http');

// lesson data, defining an array with the json data
const lessons = [
    { id: 1001, title: "Geography", location: "Oxford", price: 100, description: "Geography lessons" },
    { id: 1002, title: "English", location: "London", price: 100, description: "English lessons" },
    { id: 1003, title: "Maths", location: "Cambridge", price: 100, description: "Math lessons" }
  ];

  // creating the server