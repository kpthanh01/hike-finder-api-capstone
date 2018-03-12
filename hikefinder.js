function userInput(input){
	let geoApi = "https://maps.googleapis.com/maps/api/geocode/json?";
	let geoParams = {
		key: "AIzaSyCNJzNizHdvwnuL9F51_tksAa0jeP5vhdQ",
		address: input	};
	let success = function(data){
		console.log(data);
		let longitude = data.results[0].geometry.location.lng;
		let latitude = data.results[0].geometry.location.lat;
		getTrail(longitude, latitude);
	}
	$.getJSON(geoApi, geoParams, success); 
}

function getTrail(getLon, getLat){
	let hikeproject_api = "https://www.hikingproject.com/data/get-trails?";
	let hikeParams = {
		lon: getLon,
		lat: getLat,
		sort: "distance",
		key: "200225309-c4058b64c8cf1c0a968a6d510572d109"
	}
	let success = function results(apiData){
		console.log(apiData);

		for(item in apiData.trails){
			let trailName = apiData.trails[item].name;
			let location = apiData.trails[item].location;
			let summary = apiData.trails[item].summary;
			let link = apiData.trails[item].url;
			let trails = '<div class="trail">' +
				//'<img src="https://www.michigan.org/sites/default/files/styles/5_3_medium/public/grid-items/Trails%20-%20Option%201.jpg?itok=tyyiJR4U" alt="dummy_thumbnail" class="thumbnail">' +
				'<div class="trail-info">' +
					`<h4>${trailName}</h4>` +
					'<ul>' +
						`<li>Location: ${location}</li>` +
						`<li>Summary: ${summary}</li>` +
						`<li>Link: <a href="${link}" target="blank_">${link}</a> </li>` +
					'</ul>' +
				'</div>' +
			'</div>';
		$(".list").append(trails);
		}
	}
	$.getJSON(hikeproject_api, hikeParams, success);
}

$(function(){
	$("#locationInput").submit(function(event){
		event.preventDefault();
		$(".list").html("");
		let location = $('input[name="search"]').val()
		userInput(location);
	})
})