export const cout = message => {
	document.body.innerHTML += message.replace(/\n/g, "<br>");
	const body = document.body;
	body.scrollTop = body.scrollHeight;
};

export const cin = () => new Promise(resolve => {
	const body = document.body;
	const length = body.innerHTML.length;
	body.classList.add("caret");
	const keyup = event => {
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
			resolve(input);
		}
	};
	body.addEventListener("keyup", keyup);
});

export const cerr = message => {
	cout(`<span style="color: red">${message}</span>`);
	throw message;
};
