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
				/*
				for(item in data.results[0].address_components){
					if (inputArr.include(data.results[0].address_components[item].short_name)) {
						console.log(true);
					} else {
						console.log(false);
					}
				}
				*/
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
						`<h4>${apiData.trails[item].name}</h4>` +
						'<ul>' +
							`<li>Location: ${apiData.trails[item].location}</li>` +
							`<li>Summary: ${apiData.trails[item].summary}</li>` +
							`<li>Distance: ${apiData.trails[item].length} miles</li>` +
							`<li>Link: <a href="${apiData.trails[item].url}" target="blank_">${apiData.trails[item].url}</a> </li>` +
						'</ul>' +
					'</div>' +
					`<img src="${apiData.trails[item].imgMedium}" alt="park_thumbnail" class="thumbnail">` +
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