export function cout(message) {
	document.body.innerHTML += message.replace(/\n/g, "<br>");
	const html = document.documentElement;
	html.scrollTop = html.scrollHeight;
}

export function cin(callback) {
	const body = document.body;
	const length = body.innerHTML.length;
	body.classList.add("caret");
	const keyup = (event) => {
		if (event.key.length == 1) {
			body.innerHTML += event.key;
		} else if (event.key == "Backspace") {
			if (body.innerHTML.length > length) {
				body.innerHTML = body.innerHTML.slice(0, -1);
			}
		} else if (event.key == "Enter") {
			const input = body.innerHTML.slice(length);
			body.innerHTML += "<br>";
			body.removeEventListener("keyup", keyup);
			body.classList.remove("caret");
			callback(input);
		}
	};
	body.addEventListener("keyup", keyup);
}
