let http = require('http'); // 소괄호에 있는 모듈을 불러줌
let url = require('url');

function start(route, handle) {
	function onRequest(request, response) {
		let pathname = url.parse(request.url).pathname;
		let queryData = url.parse(request.url, true).query;

		route(pathname, handle, response, queryData.productId);
	}

	http.createServer(onRequest).listen(8888); // 포트번호
	// http://localhost:8888/
}

exports.start = start;
