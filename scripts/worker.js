self.addEventListener("message", e => {
	data = e.data;
	// TODO: do something with data
	console.log(data);
	data = data.sort(function (a, b) { return a - b });

	self.postMessage(data);
});
