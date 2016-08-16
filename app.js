  var config = {
      apiKey: "AIzaSyDMjNwn0OA3jmqHUU2tE1AS3-eqaoZbYSg",
      authDomain: "train-game-2fcfd.firebaseapp.com",
      databaseURL: "https://train-game-2fcfd.firebaseio.com",
      storageBucket: "train-game-2fcfd.appspot.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $("#addTrain").on("click", function() {

      var trainName = $("#trainNameInput").val().trim();
      var trainDest = $("#destinationInput").val().trim();
      var trainTime = moment($("#firstTimeInput").val().trim(), "HH:mm").format("LT");
      var trainFreq = $("#frequencyInput").val().trim();

      console.log(trainName + trainTime);


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
  });


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

      var trainName = childSnapshot.val().train;
      var trainDest = childSnapshot.val().destination;
      var trainTime = childSnapshot.val().time;
      var trainFreq = childSnapshot.val().frequency;

      var tFrequency = trainFreq;
      var firstTime = trainTime;

      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

      var currentTime = moment();

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

      var tRemainder = diffTime % tFrequency;

      var tMinutesTillTrain = tFrequency - tRemainder;

      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm")


      $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  });
