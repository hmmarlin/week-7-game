 // add firebase config  
  var config = {
      apiKey: "AIzaSyDMjNwn0OA3jmqHUU2tE1AS3-eqaoZbYSg",
      authDomain: "train-game-2fcfd.firebaseapp.com",
      databaseURL: "https://train-game-2fcfd.firebaseio.com",
      storageBucket: "train-game-2fcfd.appspot.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// display the current time on the train schedule
  var timeNow = moment().format("HH:mm");
  $(document).ready(function() {
      $("#timeNow").append(timeNow);
});

// create functionality to add a new train to the board on click of "submit" button
  $("#addTrain").on("click", function() {

      var trainName = $("#trainNameInput").val().trim();
      var trainDest = $("#destinationInput").val().trim();
      var trainTime = moment($("#firstTimeInput").val().trim(), "HH:mm").format("LT");
      var trainFreq = $("#frequencyInput").val().trim();

// validat data to prevent users from entering null information
    if (trainName == null || trainName == "") {
        alert("Please add a name for the train");
        return false;
    }

      else if (trainDest == null || trainDest == "") {
        alert("Please add a destination for the train");
        return false;
    }
      else if (trainTime == null || trainTime == "") {
        alert("Please add a departure time for the train");
        return false;
    }

    else if (trainFreq == null || trainFreq == "") {
        alert("Please add a frequency for the train");
        return false;
    }

    else {

// functionality to create new object to capture the user data. 
      var newTrain = {
          train: trainName,
          destination: trainDest,
          time: trainTime,
          frequency: trainFreq
      }

      database.ref().push(newTrain);

      alert("ChoooChooo! Train added!");

      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTimeInput").val("");
      $("#frequencyInput").val("");

      return false;
    }
  });

// capture the data in firebase and append it to the main train table. 
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

      var trainName = childSnapshot.val().train;
      var trainDest = childSnapshot.val().destination;
      var trainTime = childSnapshot.val().time;
      var trainFreq = childSnapshot.val().frequency;

      var trainFrequency = trainFreq;
      var firstTime = trainTime;

      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

      var currentTime = moment();

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

      var tRemainder = diffTime % trainFrequency;

      var tMinutesTillTrain = trainFrequency - tRemainder;

      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm")

      $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  });


