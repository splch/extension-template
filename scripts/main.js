import { _export } from "./export.js";

function display(obj) {
	obj = JSON.stringify(obj);
	document.getElementById("text").value = obj + "\n\n" + _export.message;
}

function processData(data) {
	const dataWorker = new Worker("scripts/worker.js");
	dataWorker.addEventListener("message", rsp => {
		display(rsp.data);
	});
	dataWorker.postMessage(data);
}

function getRequest(url, arg) {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url + "?url=" + arg);
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			const rsp = JSON.parse(this.responseText);
			processData(rsp);
		}
	};
	xhr.send();
}

function getActiveUrl() {
	const url = "https://httpbin.org/get";
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		const activeUrl = tabs[0].url;
		getRequest(url, activeUrl);
	});
}

document.getElementById("request").addEventListener("click", function () {
	getActiveUrl();
});

chrome.runtime.onInstalled.addListener(details => {
	const currentVersion = chrome.runtime.getManifest().version
	const reason = details.reason

	console.log("Current Version: ${currentVersion }")

	switch (reason) {
		case "install":
			console.log("New User installed the extension.")
			break;
		case "update":
			console.log("User has updated their extension.")
			break;
		case "chrome_update":
		case "shared_module_update":
		default:
			console.log("Other install events within the browser")
			break;
	}
});