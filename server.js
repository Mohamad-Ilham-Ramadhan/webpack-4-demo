const express = require('express');
const { renderToString } = require('react-dom/server');

const SSR = require('./static');

server( process.env.PORT || 8080 );

function server( port ) {
	const app = express();

	app.use(express.static('static'));
	app.get('/', (req, res) => 
		res.status(200).send(renderMarkup(renderToString(SSR)))
	);

	app.listen(port, () => process.send && process.send("online"));

	function renderMarkup( html ) {
		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8"/>
			<title>Webpack SSR Demo</title>
		</head>
		<body>
			<div id="app">${ html }</div>

			<script src="${process.env.BROWSER_REFRESH_URL}"></script>
		</body>
		</html>`
	}
}