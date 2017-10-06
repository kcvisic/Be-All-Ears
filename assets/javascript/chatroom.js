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

$(document).ready(function(){

	//check if user is logged in.
	userVar = getUserInfo();
	displayCorrectUserControls(userVar);


	urlString = window.location.href;
	urlArray = urlString.split('?');
	urlParams = urlArray[1];
	urlParamsArray = urlParams.split("&");
	console.log(urlParamsArray);
	finalParamsArray = [];
	for(i=0; i<urlParamsArray.length; i++){
		tempParamsArray = urlParamsArray[i].split("=");
		finalParamsArray.push(tempParamsArray[1]);
	}
	console.log(finalParamsArray);
	$("#performerImg").html('<img valign="middle" src="' + finalParamsArray[4] + '" style="width:80%;height:100%;">');

	//hit database for lyrics and add for loops for lyrics formatting

	//write url parameters passed in from creation page

	//param 0

	//param 1

	//param 2 youtbe video id
	$(".youtube-holder").html('<iframe width="100%" height="315" src="https://www.youtube.com/embed/' + finalParamsArray[2] + '" frameborder="0" allowfullscreen></iframe>');
	$("#findTicketsButton").attr("href", finalParamsArray[3]);
	var lyrics = "I've paid my dues\nTime after time\nI've done my sentence\nBut committed no crime\nAnd bad mistakes\nI've made a few\nI've had my share of sand\nKicked in my face\nBut I've come through\nAnd we mean to go on and on and on and on\nWe are the champions, my friends\nAnd we'll keep on fighting till the end\nWe are the champions\n...";
	var tempLyrics = lyrics.split("\n");
	p = "";
	for(i=0; i<tempLyrics.length; i ++){
     	if(tempLyrics[i]){
     		p = p + "<p style='margin:0px;'>" + tempLyrics[i] + "</p>";
     	} else {
     		p = p + "<br>";
     	}
     	
     }
	$(".lyrics").html(p);

});