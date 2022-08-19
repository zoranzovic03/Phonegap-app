app.submitToServer =  function() {
    var userPasscode = document.getElementById('userPasscode').value;
    var numOfUsers = document.getElementById('numOfUsers').value;
    numOfUsers = (numOfUsers == "") ? 1 : numOfUsers;
    
	
	if(((new Date().getTime() / 1000)- app.timeLastSubmit ) > 59){
		app.timeLastSubmit = new Date().getTime() / 1000;

		$.ajax("http://artengine.ca/nnrbeacons/submit.php", {
			   contentType:"application/json",
			   type:"GET",
			   data: {
				   "passcode": userPasscode,
				   "deviceId": app.deviceId,
				   "marker": JSON.stringify({
					   "numOfUsers":numOfUsers,
					   "lat":app.position.coords.latitude,
					   "lng":app.position.coords.longitude,
					   "accuracy":app.position.coords.accuracy,
					   "heading":app.position.coords.heading
					})
			   },
			   timeout: 10000,
			   success:function(response){
					var responseObj =  jQuery.parseJSON(response );
			 
				   if (responseObj.advanced>0) {	
						document.getElementById("numUsersContainer").style.display = "block";
					}
					var serverResponse = document.getElementById('serverResponse');
					serverResponse.innerHTML = responseObj.message+": "+ app.getReadableTime( new Date());
			   },
			   error: function(request, errorType, errorMessage) {
				var serverError = document.getElementById('serverResponse');
				serverError.innerHTML = "Error: " + errorMessage+" :"+app.getReadableTime( new Date());
			   }
		});
	}
	else{
		var serverError = document.getElementById('serverResponse');
		serverError.innerHTML = "Too soon: "+app.getReadableTime( new Date()) ;
	}
};
