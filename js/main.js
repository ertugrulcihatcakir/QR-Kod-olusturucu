function main() {
	const generateBtn = document.getElementById("generateBtn");
	const dataBox = document.getElementById("dataBox");
	const downloadBtn = document.getElementById("downloadBtn");
	const qrcode = document.getElementById("qrcode");
	const qrdiv = document.getElementById("qrdiv");
	const errorClassName = "error";
	const shakeClassName = "shake";
	const dataBoxClassName = "dataBox";
	const toHideClassName = "hide";
	const qrdivClassName = "qrdiv";
	var QR_CODE = new QRCode("qrcode", {
		width: 180,
		height: 180,
		colorDark: "#000000",
		colorLight: "#fff",
		correctLevel: QRCode.CorrectLevel.H,
	});
	generateBtn.onclick = function (e) {
		e.preventDefault();
		const data = dataBox.value;
		if (data) {
			generateQRCode(data);
			document.querySelector(".nameTag").innerHTML = data;
		} else {
			markDataBoxError();
		}
	};
	dataBox.onfocus = function (e) {
		const classList = dataBox.classList;
		if (classList.contains(errorClassName)) {
			dataBox.className = dataBoxClassName;
		}
	};
	downloadBtn.onclick = function (e) {
		const data = dataBox.value;
		const img = qrcode.getElementsByTagName("img")[0];
		const canvas = qrcode.getElementsByTagName("canvas")[0];
		const padding = 40;
		canvas.width = canvas.width + padding;
		canvas.height = canvas.height + 50 + padding;
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#ffffff";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#000"
		context.font = "600 30px 'Baloo Bhai 2', cursive";
		context.textAlign = "center"
		context.fillText(data, canvas.width / 2, 240);
		context.drawImage(img, padding / 2, padding / 2);
		const image = canvas.toDataURL("image/png", 1);
		const filename = "QR_Code_" + Date.now() + ".png";
		downloadImage(image, filename);
	};
	function markDataBoxError() {
		const prevClassName = dataBox.className;
		dataBox.className =
			prevClassName + " " + errorClassName + " " + shakeClassName;
		vibrate();
		setTimeout(() => {
			dataBox.className = prevClassName + " " + errorClassName;
		}, 500);
	}
	function generateQRCode(data) {
		QR_CODE.clear();
		QR_CODE.makeCode(data);
		qrdiv.className = qrdivClassName;
	}
	function vibrate() {
		if (Boolean(window.navigator.vibrate)) {
			window.navigator.vibrate([100, 100, 100]);
		}
	}
	function downloadImage(image, filename) {
		var element = document.createElement("a");
		element.setAttribute("href", image);
		element.setAttribute("download", filename);
		element.setAttribute("class", toHideClassName);
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
}
main();