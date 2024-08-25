const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
	mariadb.query('select * from products', function (err, rows) {
		// console.log(rows);
	});

	response.writeHead(200, { 'Content-Tyep': 'text/plain' });
	response.write(main_view);
	response.end();
}

function redRacket(response) {
	fs.readFile('./img/redRacket.png', function (err, data) {
		response.writeHead(200, { 'Content-Tyep': 'text/html' });
		response.write(data);
		response.end();
	});
}
function blueRacket(response) {
	fs.readFile('./img/blueRacket.png', function (err, data) {
		response.writeHead(200, { 'Content-Tyep': 'text/html' });
		response.write(data);
		response.end();
	});
}
function blackRacket(response) {
	fs.readFile('./img/blackRacket.png', function (err, data) {
		response.writeHead(200, { 'Content-Tyep': 'text/html' });
		response.write(data);
		response.end();
	});
}

function order(response, productsId) {
	mariadb.query(
		`insert into orderlist values(${productsId}, '${new Date().toLocaleString()}' );`,
		function (err, rows) {
			console.log(rows);
		}
	);

	response.writeHead(200, { 'Content-Tyep': 'text/html' });
	response.write('Order Completed');
	response.end();
}

function orderlist(response) {
	response.writeHead(200, { 'Content-Tyep': 'text/html' });
	mariadb.query('select * from orderlist', function (err, rows) {
		if (err) return console.log(err);
		response.write(orderlist_view);

		rows.forEach((ele, idx) => {
			response.write(
				'<tr>' +
					'<td>' +
					ele.product_id +
					'</td>' +
					'<td>' +
					ele.order_date +
					'</td>' +
					'</tr>'
			);
		});
		response.write('</table>');
		response.end();
	});
}

function mainCss(response) {
	fs.readFile('./main.css', function (err, data) {
		response.writeHead(200, { 'Content-Tyep': 'text/css' });
		response.write(data);
		response.end();
	});
}

let handle = {}; // key: value
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* img directory */
handle['/main.css'] = mainCss;
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

console.log(handle);
exports.handle = handle;
