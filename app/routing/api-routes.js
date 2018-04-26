console.log('API Route connected Successfully');

//Link in friends Data
var friendsData = require('../data/friends.js');

//Includes two Routes
function apiRoutes(app) {
  app.get('/api/friends', function (req, res) {
    res.json(friendsData);
  });

  //A POST routes /api/friends.
  app.post('/api/friends', function (req, res) {
    
    //parse new friend input to get integers
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push( parseInt(req.body.scores[i] ))
    }
    newFriend.scores = scoresArray;

    // cross check the new friend entry with the existing ones
    var scoreComparisonArray = [];
    for(var i=0; i < friendsData.length; i++) {

      //check the friend's scores and sum difference in points
      var currentComparison = 0;
      for(var j = 0; j < newFriend.scores.length; j++) {
        currentComparison += Math.abs( newFriend.scores[j] - friendsData[i].scores[j] );
      }

      //push each comparison between friends to array
      scoreComparisonArray.push(currentComparison);
    }
    //Determine the best match using the position of best match
    var bestMatchPosition = 0; // assume its the first person
    for (var i = 1; i < scoreComparisonArray.length; i++) {

      //Lower number in comparison difference means better match
      if (scoreComparisonArray[i] <= scoreComparisonArray[bestMatchPosition]) {
        bestMatchPosition = i;
      }
    }
    //**if the 2 friends have the same comparison, then the NEWEST entry in the friendsData array is chosen *
    var bestFriendMatch = friendsData[bestMatchPosition];

    //reply with a JSON object of the best match
    res.json(bestFriendMatch);

    //push the new friend to the friends data array for storage
    friendsData.push(newFriend);
  });
}
//Export for use in main server.js file
module.exports = apiRoutes;



