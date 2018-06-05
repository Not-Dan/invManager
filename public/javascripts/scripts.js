$.urlParam = function (name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results == null || undefined) {
		return;
	} else {
		return results[1] || 0;
	}
}