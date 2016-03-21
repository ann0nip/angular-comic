comicsApp.factory('comicsFactory',['$sessionStorage', function($sessionStorage) {
	var comics = [];

	var query = {
		getComics: function() {
			return $sessionStorage['comics'] || undefined;
		},
		setComics: function(data) {
			
			if ($sessionStorage['comics'] === undefined) {
				$sessionStorage['comics'] = data;        	
			} else {
	            comics = $sessionStorage['comics'];
	            comics.push(data);
	            $sessionStorage['comics'] = comics;
        	}
		},
		updateRank: function(nameComic, prop, newVal) {
			comics = $sessionStorage['comics'];
			prop = prop.split('.');
			if (prop.length === 2) {
				prop.one = prop[0];
				prop.two = prop[1];
			} else {
				prop.one = prop[0];
			}
			$.each(comics, function(ix, value) {
				if (value.name === nameComic) {
					if (prop.length === 2) {
						value[prop.one][prop.two].push(newVal);
						value.ranking.userRank = value[prop.one][prop.two].reduce(function(a, b) { return a + b; }, 0);;
						value.ranking.userRank = Math.floor(value.ranking.userRank/value[prop.one][prop.two].length);
					} else {
						value[prop.one].push(newVal);
					}
				}
				
			});
			$sessionStorage['comics'] = comics;
		},
		updateStatus: function(nameComic) {
			comics = $sessionStorage['comics'];
			$.each(comics, function(ix, value) {
				if (value.name === nameComic) {
					value.borrow = true;
				}
				
			});
			$sessionStorage['comics'] = comics;
			console.log(comics);
		}

	}

	return query;
}]);