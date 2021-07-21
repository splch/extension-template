self.addEventListener("message", e => {
	data = e.data;
	// TODO: do something with data
	self.postMessage(data);
});
