//This JS will be responsible for generating a new chat room.

//https://www.googleapis.com/youtube/v3/search?part=snippet&q=falling&maxResults=1&key=AIzaSyASwdpu78n7US8xShgVezu2FsSlYuvwwaE
//https://www.googleapis.com/youtube/v3/search?part=snippet&q=jordan&maxResults=1&key=AIzaSyASwdpu78n7US8xShgVezu2FsSlYuvwwaE
//https://www.googleapis.com/youtube/v3/search?part=snippet&q=jordan&type=video&maxResults=1&key=AIzaSyASwdpu78n7US8xShgVezu2FsSlYuvwwaE
// Initialize Firebase


  // Initialize Firebase



firebase.initializeApp(config);
var songName = "";
var grooveRoomName = "";
var database = firebase.database();

//youtube API call
// function youtubeApiCall(searchParam){
// 	console.log("enter youtubeAPI function");
// 	$.ajax({
// 	 method: "GET",
// 	 url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + searchParam + '&type=video&videoEmbeddable=true&maxResults=1&key=AIzaSyASwdpu78n7US8xShgVezu2FsSlYuvwwaE'	 
// 	}).done(function(data){return data});
// }

//get user information
function getUserInfo(){
	var authUser = Object.keys(window.localStorage)
	  .filter(item => item.startsWith('firebase:authUser'))[0]
	var user = authUser ? JSON.parse(localStorage.getItem(authUser)) : undefined;
	return user;
}

//write the correct controls for if a user is logged in
function displayCorrectUserControls(userObj){
	if(userVar == undefined){
		$("#signUpContainer").html('<a data-toggle="modal" data-target="#signUpModal"><span class="glyphicon glyphicon-user"></span> Sign Up</a>');
		$("#loginContainer").html('<a data-toggle="modal" data-target="#loginModal"><span class="glyphicon glyphicon-log-in"></span> Login</a>');
		$("#signOutContainer").html("");
	} else {
		$("#signUpContainer").html("");
		$("#loginContainer").html("");
		$("#signOutContainer").html('<a id="signOutButton"><span class="glyphicon glyphicon-log-out"></span> Sign out</a>');
	}
}

//document load operations
$(document).ready(function(){
	//check if user is logged in.
	userVar = getUserInfo();
	displayCorrectUserControls(userVar);
	// console.log(getUserInfo());
})

//signup function REQUIRED: email, password, (confirm password) and username
//this is the start of the login function!!
$("#signUpButton").on("click", function() {
  event.preventDefault();
  console.log("button press");
  var userName = $.trim($("#usernameInput").val());
  var password = $("#passwordInput").val();
  var confirmPassword = $("#passwordConfirmInput").val();
  var userEmail = $.trim($("#emailInput").val());
  console.log(userName);
  //checks to ensure all information is filled out using 
  	//conforming to the ECMAScript standards for evaluating user input (checking the truthy value)
  		//will evaluate to true if value is not: null, undefined, NaN, empty string (""), 0, or false.
  		//http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
  if(userName){
  	if(password){
  		if(confirmPassword){
  			if(userEmail){
  				if(password === confirmPassword){
				  	firebase.auth().createUserWithEmailAndPassword(userEmail, password)
				  	.then((success) => {
				  		//sucessfull account creation!
				  		
				  		// Updates the user attributes:
						success.updateProfile({
						  displayName: userName
						}).then(function() {
						  // Profile display name updated successfully!
						  
						}, function(error) {
						  // An error happened.
						});

						//call functions to grab userInfo and update the HTML
						//check if user is logged in.
						userVar = getUserInfo();
						displayCorrectUserControls(userVar);

						//make modal disappear
	  					$('button[data-dismiss="modal"]').click();
				  	})
				  	.catch(function(error) {
					    // Handle Errors here.
					    // make this more eloquent and update the html modal with an error message!!
					    console.log("there was an error");
					    var errorCode = error.code;
					    var errorMessage = error.message;
					    console.log(errorMessage);
					    $("#errorMessageContainerSignUp").html("<p class='modal-inline-text'>" + errorMessage + "</p>");
					    // ...
					  });

					  console.log("FIREBASE COMMAND CALLED");
				  } else {
				  	//write that password did not match!
				  	$("#errorMessageContainerSignUp").html("<p class='modal-inline-text'>Password confirmation did not match password, please correct!</p>")
				  }
  			} else {
  				//did not fill out email
  				$("#errorMessageContainerSignUp").html("<p class='modal-inline-text'>Please fill out the email field. HOW ELSE CAN WE ANNOY YOU?</p>")
  			}
  		} else {
  			//did not fill out confirmpassword
  			$("#errorMessageContainerSignUp").html("<p class='modal-inline-text'>Please fill out the confirm password field. YOU STUPID</p>")
  		}
  	} else {
  		//did not fill out password
  		$("#errorMessageContainerSignUp").html("<p class='modal-inline-text'>Please fill out the password field. YOU STOOPID</p>")
  	}
  } else {
  	//username not entered
  	$("#errorMessageContainerSignUp").html("<p class='modal-inline-text'>Please fill out the username field. YOU BAFOON</p>")
  }
  //checks to ensure all information is filled out using
});

//function to make signup/ login button NOT visible

//ON CLICK OF: New Groove Room
$(".buttonShowModal").on("click", function() {
	$("#errorMessageContainer").html("");
	//just get the return of this function to tell if the user is logged in or not MOTHAT FUCKA
	userVar = getUserInfo();
	console.log(getUserInfo());
	if(userVar == undefined){
		//print I AM SORRY YOU MUST BE LOGGED IN ASS HOLE
		$("#myModalBody").html("<p class='modal-inline-text'>You must be logged in to make a groove room!</p>");
		$("#myModalFooter").html('<button type="button" class="btn btn-default modal-closer" data-dismiss="modal">Close</button>');
	} else {
		//do nothing, just show the standard html
	}
});

//login system with user persistence stored in local storage.
$("#loginButton").on("click", function(){
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
	  .then(function() {
	    // New sign-in will be persisted with local persistence.
	    return firebase.auth().signInWithEmailAndPassword($("#usernameLoginInput").val(), $("#passwordLoginInput").val())
	    	.then(function(){
	    		userVar = getUserInfo();
	  			displayCorrectUserControls(userVar);
	  			//make modal disapear
	  			console.log("successful login");
	  			//make modal disappear
	  			$('button[data-dismiss="modal"]').click();
	    	})
	    	.catch(function(errorLog){
		    	$("#errorMessageContainerLogin").html("<p class='modal-inline-text'>Invalid username or password.. go away!</p>");
		    	console.log(errorLog);
		    });
	  })
	  .catch(function(error) {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;

	    

	    //comment the console log line below for production environment!
	    console.log(errorMessage);
	  });
	  authUser = Object.keys(window.localStorage)
		  .filter(item => item.startsWith('firebase:authUser'))[0]
	  user = authUser ? JSON.parse(localStorage.getItem(authUser)) : undefined;
	  
});

//sign out function to clear local storage.
$("#signOutContainer").on("click", function(){
	console.log("CLICKED SIGNOUT");
	firebase.auth().signOut().then(function() {
	  console.log('Signed Out');
	  userVar = getUserInfo();
	  displayCorrectUserControls(userVar);
	}, function(error) {
	  console.error('Sign Out Error', error);
	});
});


// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().once("value", function(childSnapshot) {
	// console.log(childSnapshot.val().youtubeID);
	// console.log(childSnapshot);
	childSnapshot.forEach(function(childFields){
		console.log(childFields.val())
	})
	// for(key in childSnapshot.val()){
	// 	console.log(key);
	// 	console.log(childSnapshot.child(key));
	// }
	childSnapshot.forEach(function(childFields){
		var chatRoomURL = "file:///Users//Documents/repos/Be-All-Ears/index.html/chatroom.html?roomBase=" + childFields.val().userUID + "&roomName=" + childFields.val().grooveRoomName + "&youtubeID=" + childFields.val().youtubeID + "&ticketLink=" + childFields.val().performerTicketLink + "&performerImg=" + childFields.val().ticketImage;
		  // full list of items to the well
		  $("#mainVideoChatrooms").append('<div class="row">\
										      <div class="">\
										        <div class="container jumbotron chat-room-main">\
										            <h2 class="text-center"><a href="' + chatRoomURL + '">' + childFields.val().grooveRoomName + '</a></h2>\
										          <div class="text-center col-sm-12 col-md-12 col-lg-6">\
										            <p>\
										              Artist: ' + childFields.val().artistInputName + '<br>\
										              Song Name: ' + childFields.val().songInputName + '\
										            </p>\
										          </div>\
										          <div class="text-center col-sm-12 col-md-12 col-lg-6">\
										            <img src=' + childFields.val().imageLink + ' class="chat-image-main" /><br />\
										            <img class="button" />\
										          </div>\
										      </div> \
										      </div>\
										  </div>');

	})
  
// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});



//ON CLICK OF: createGrooveRoom
$("#createGrooveRoom").on("click", function() {
	//initialize error message to show nothing
	$("#errorMessageContainer").html("");

	//VALIDATION
		console.log("Enter user input validation.")
		//need to fill out a song name
		songName = $.trim($("#initialSong").val());
		console.log(songName);
		//need to fill out artist
		artistName = $.trim($("#initialArtist").val());
		//need to fill out the name of the chat room.
		grooveRoomName = $.trim($("#grooveRoomInput").val());
		console.log(grooveRoomName);
		//check if either chat room, or song was NOT inputted
		if(songName){
			if(grooveRoomName){
				if(artistName){
					//YOUTUBE API HIT (we need to store title of song, and the iframe with video id in firebase)
					//this call gets you video ids https://www.googleapis.com/youtube/v3/search?part=snippet&q=buckethead&maxResults=1&key=AIzaSyASwdpu78n7US8xShgVezu2FsSlYuvwwaE
					//https://www.googleapis.com/youtube/v3/search?part=snippet&q=buckethead&type=video&videoEmbeddable=true&maxResults=1&key=AIzaSyASwdpu78n7US8xShgVezu2FsSlYuvwwaE
					var key = "18cac945fc20d40d533e1bcff923f8d3";
					var queryURL = "https://api.musixmatch.com/ws/1.1/track.search?apikey=" + key + '&q_artist=' + artistName + '&q_track=' + songName;
					
					// var youtubeAPIData = youtubeApiCall(songName);		
					var youtubeAPIData = $.ajax({
												 contentType: 'application/json',
												 method: "GET",
												 url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + songName + '&type=video&videoEmbeddable=true&maxResults=1&key='	 
												});			

					//seatgeek api call
					var seatGeekQueryUrl = "https://api.seatgeek.com/2/performers?q=" + artistName + "&client_id=OTEwNzcxOXwxNTA2Nzg1MDAzLjUx&client_secret=2304a5bca33fc869486d659f721fcb26c17d3c5f79b3d1333b81abb57cd58b3a";
				 	var seatGeekAPIData = $.ajax({
				 									contentType: 'application/json',
											 		url: seatGeekQueryUrl,
											 		method: "GET"
											 	});
				 	// var lyricsSongIDAPIData = $.ajax({
						// 							 contentType: 'application/json',
						// 					         url: queryURL,
						// 					         method: "GET"
						// 					         });
					
					var youtudeNeededData;
					
					//lyrics api call
					var userVar = getUserInfo();
					$.when(youtubeAPIData, seatGeekAPIData).done(function(data1, data3){
						//you must use index 0 on the data variables to get the response data
						//youtube data:
						var youtudeNeededData = data1[0];
						console.log("youtube data");
						console.log(youtubeAPIData);
						//lyrics data:

						//seatGeek data:
						
						if(data3[0]["performers"].length === 0){
							var performerTicketLink = "Could not find ticket information on the performer."
							var apis_valid = true;
							if(apis_valid == true){
								// youtudeNeededData = JSON.stringify(data1);
								// youtudeNeededData = JSON.parse(youtudeNeededData);
								console.log(youtudeNeededData["items"][0]["id"]["videoId"]);
								// Code for handling the push
							      database.ref().push({
							        userUID: userVar["uid"],
							        youtubeID: youtudeNeededData["items"][0]["id"]["videoId"],
							        likeCount:0,
							        artistInputName: artistName,
							        songInputName: songName,
							        grooveRoomName: grooveRoomName,
							        userDisplayName: userVar["displayName"],
							        chatRoom: {
							        			testChat: ""
							        			},
							        lyricsData: "I've paid my dues\nTime after time\nI've done my sentence\nBut committed no crime\nAnd bad mistakes\nI've made a few\nI've had my share of sand\nKicked in my face\nBut I've come through\nAnd we mean to go on and on and on and on\nWe are the champions, my friends\nAnd we'll keep on fighting till the end\nWe are the champions\n...",
							        ticketData: "#",
							        performerTicketLink: "#",
							        ticketImage: "assets/images/Music-Background-20.jpg",
							        imageLink: youtudeNeededData["items"][0]["snippet"]["thumbnails"]["medium"]["url"],
							        dateAdded: firebase.database.ServerValue.TIMESTAMP
							      });
								console.log(data3[0]);
								window.location = "file:///Users/Documents/repos/Be-All-Ears/index.html/chatroom.html?roomBase=" + userVar["uid"] + "&roomName=" + grooveRoomName + "&youtubeID=" + youtudeNeededData["items"][0]["id"]["videoId"] + "&ticketLink=#&performerImg=assets/images/Music-Background-20.jpg";
							}
						} else {
							var performerTicketLink = data3[0].performers[0].url;
							var performerImage = data3[0].performers[0].image;
							var apis_valid = true;
							if(apis_valid == true){
								// youtudeNeededData = JSON.stringify(data1);
								// youtudeNeededData = JSON.parse(youtudeNeededData);
								console.log(youtudeNeededData["items"][0]["id"]["videoId"]);
								// Code for handling the push
							      database.ref().push({
							        userUID: userVar["uid"],
							        youtubeID: youtudeNeededData["items"][0]["id"]["videoId"],
							        artistInputName: artistName,
							        grooveRoomName: grooveRoomName,
							        songInputName: songName,
							        userDisplayName: userVar["displayName"],
							        chatRoom: {
							        			testChat: ""
							        			},
							        lyricsData: "I've paid my dues\nTime after time\nI've done my sentence\nBut committed no crime\nAnd bad mistakes\nI've made a few\nI've had my share of sand\nKicked in my face\nBut I've come through\nAnd we mean to go on and on and on and on\nWe are the champions, my friends\nAnd we'll keep on fighting till the end\nWe are the champions\n...",
							        performerTicketLink: performerTicketLink,
							        ticketImage: performerImage,
							        imageLink: youtudeNeededData["items"][0]["snippet"]["thumbnails"]["medium"]["url"],
							        dateAdded: firebase.database.ServerValue.TIMESTAMP
							      });
								// console.log(data2);
								window.location = "file:///Users//Documents/repos/Be-All-Ears/index.html/chatroom.html?roomBase=" + userVar["uid"] + "&roomName=" + grooveRoomName + "&youtubeID=" + youtudeNeededData["items"][0]["id"]["videoId"] + "&ticketLink=" + performerTicketLink + "&performerImg=" + performerImage;
							}
						}

						
						
					})

					} else {
						//DID NOT ENTER AN ARTIST NAME
						$("#errorMessageContainer").html("<p class='modal-inline-text'>You did not enter an artist name</p>");
					}
				
			} else {
				//DID NOT ENTER A GROOVE ROOM NAME
				$("#errorMessageContainer").html("<p class='modal-inline-text'>You did not enter a groove room name BRO!</p>");
			}
		} else {
			//DID NOT ENTER A SONG NAME
			$("#errorMessageContainer").html("<p class='modal-inline-text'>You did not enter a song name BRO!</p>");
		}
		
})
	






//need operation when the cloes button is pressed on the modal
$(".modal-closer").on("click", function() {
	$("#errorMessageContainer").html("");
})

