function route(pathname, handle, response, productId) {
	console.log('parthname: ' + pathname);

	if ((typeof handle[pathname]).includes('function')) {
		handle[pathname](response, productId);
	} else {
		response.writeHead(404, { 'Content-Tyep': 'text/html' });
		response.write('Not Found');
		response.end();
	}
}

exports.route = route;
