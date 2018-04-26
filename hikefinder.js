// check to see if the url exists
function checkURL(url){
	let urlOutput = url;
	if (url == "" || url == undefined || url == null) {
		urlOutput = "noImage.png";
	}
	return urlOutput;
}

// a function that makes an AJAX call to Google's geoloaction api
function userInput(input){
	const apiCall = {
	    url: "https://maps.googleapis.com/maps/api/geocode/json?",
	    data: {
	      key: "AIzaSyCNJzNizHdvwnuL9F51_tksAa0jeP5vhdQ",
	      address: input
	    },
	    dataType: 'json',
	    type: 'GET',
	    success: function(data){
	    	let inputArr = input.split(" ");
			if (data.status === "ZERO_RESULTS") {
				$(".list").html("<h2>No Results Found</h2>");
			} else {
				let longitude = data.results[0].geometry.location.lng;
				let latitude = data.results[0].geometry.location.lat;

				// calling this function to make another AJAX call
				getTrail(longitude, latitude, input.toUpperCase());
			}
		}
	};
  	$.ajax(apiCall)
  		.done(function(result) {
            console.log(result);
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
    	}
    );
	 
}

// A function that makes an AJAX call to grab a json of hiking trail.
function getTrail(getLon, getLat, userInput){
	const apiCall = {
		url: "https://www.hikingproject.com/data/get-trails?",
		data: {
			lon: getLon,
			lat: getLat,
			sort: "distance",
			key: "200225309-c4058b64c8cf1c0a968a6d510572d109"
		},
		dataType: 'json',
		type: "GET",
		success: function(apiData){
			let trailList = "";
			for(item in apiData.trails){
				let trails = '<div class="trail">' +
					'<div class="trail-info">' +
						`<h4><a href="${apiData.trails[item].url}" target="blank_">${apiData.trails[item].name}</a></h4>` +
						'<ul>' +
							`<li>Location: ${apiData.trails[item].location}</li>` +
							`<li>Summary: ${apiData.trails[item].summary}</li>` +
							`<li>Distance: ${apiData.trails[item].length} miles</li>` +
						'</ul>' +
					'</div>' +
					`<a href="${checkURL(apiData.trails[item].url)}" target="blank_"><img src="${checkURL(apiData.trails[item].imgMedium)}" alt="park_thumbnail" class="thumbnail"></a>` +
				'</div>';
				trailList += trails;
			}
			$(".list").html(`<h2>Trails Near ${userInput}</h2>`);
			$(".list").append(trailList);
		}
	}
	$.ajax(apiCall)
		.done(function(result) {
	            console.log(result);
	    })
	    .fail(function(jqXHR, error, errorThrown) {
	        console.log(jqXHR);
	        console.log(error);
	        console.log(errorThrown);
	   	}
    );
}

$(function(){
	$("#locationInput").submit(function(event){
		event.preventDefault();
		$(".list").html("");
		let location = $('input[name="search"]').val()
		userInput(location);
	})
})