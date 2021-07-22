// External JS variables
import { _export } from "./export.js";

// Storage API
function getCss() {
	setBackgroundColor(localStorage.getItem("backgroundColor"));
	setFontColor(localStorage.getItem("fontColor"));
}

function setBackgroundColor(color) {
	console.log(color);
	document.body.style.backgroundColor = color;
}

function setFontColor(color) {
	document.body.style.color = color;
}

function display(obj) {
	obj = JSON.stringify(obj);
	document.getElementById("requestText").value = obj + "\n\n" + _export.message;
}

// HTTP Request
function getRequest(url, args = "TODO=true") {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url + "?" + args);
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			const rsp = JSON.parse(this.responseText);
			display(rsp);
		}
	};
	xhr.send();
}

// Clipboard API
function copy(text) {
	const textarea = document.createElement("textarea");
	textarea.value = text;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
}

// Chrome Tabs API
function getActiveUrl() {
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		const activeUrl = new URL(tabs[0].url);
		document.getElementById("activeUrl").value = activeUrl.href;
		document.getElementById("domain").value = activeUrl.hostname;
	});
}

// Web Workers API
function worker(data) {
	const dataWorker = new Worker("scripts/worker.js");
	dataWorker.addEventListener("message", rsp => {
		document.getElementById("list").value = rsp.data;
	});
	dataWorker.postMessage(data);
}

// Get Cookies
function getCookies(domain) {
	chrome.cookies.getAll({ domain }, cookies => {
		console.log(cookies);
		document.getElementById("cookieText").value = cookies;
	});
}

// Event Listeners
document.getElementById("options").addEventListener("click", () => {
	chrome.runtime.openOptionsPage();
});

document.getElementById("request").addEventListener("click", () => {
	const url = "https://httpbin.org/get";
	getRequest(url);
});

document.getElementById("copy").addEventListener("click", () => {
	copy(document.getElementById("requestText").value);
});

document.getElementById("getActiveUrl").addEventListener("click", () => {
	getActiveUrl();
});

document.getElementById("sortList").addEventListener("click", () => {
	let list = document.getElementById("list").value.split(',');
	list = list.map(i => Number(i))
	worker(list);
});

document.getElementById("getCookies").addEventListener("click", () => {
	let domain = document.getElementById("domain").value;
	getCookies(domain);
});

// On Load
function start() {
	getCss();
}

document.body.onload = start;
