const express = require('express');
const app1 = express(), app2 = express(), app3 = express(); // prettier-ignore

/*

	* What is host in networking?

	Host are devices (eg. computer or other device) that send or receive data by
	communicating with other hosts on a network. Hosts on a network may include :
	. clients, servers, services, applications

	Hosts typically do not include intermediary network devices like switches and
	routers, which are instead often categorized as nodes.
	  . A node is also a broader term that includes anything connected to a network.
	  . Instead, a host requires an IP address
	In other words, all hosts are nodes, but network nodes are not hosts unless they
	require an IP address to function.

	Hosts use various protocols to communicate, including ->
		. Transmission control protocol (TCP/IP)
	  . Open Systems Interconnection (OSI)
	On a TCP/IP network, each host has a host number that, together with a network identity,
	forms its own unique IP address. In the OSI model, protocols in the transport layer,
	also known as Layer 4, are responsible for communication between hosts.

	+ Take home ->
	. To convert a node into a host, provide the machine an IP (IPv4 or IPv6).
	. The data ('pseudo' hosted) by a node is accessible across all the devices it gets
	. connected to. Whereas data hosted by a host is more secure and inaccessible to others.


	* What is backlogging in TCP connections?

	In simple words, the backlog parameter specifies the number of pending connections the
	queue will hold. When multiple clients connect to the server, the server then holds
	the incoming requests in a queue. The clients are arranged in the queue, and the server
	processes their requests one by one as and when queue-member proceeds. The nature of
	this kind of connection is called queued connection.
	When the backlog limit is reached, TCP/IP rejects additional requests.


	* app.listen() receives 4 args -> app.listen([port[, host[, backlog]]][, callback])
	. Host name : eg. 127.0.0.1(IPv4) or ::1(IPv6) for TCP/IP connections
	. Backlog : for TCP/IP connections
	. Callback function : for logging errors and connection

	~ Note : You can specify the host if and only if you have already specified the port.
	~ Note : You can specify backlog if and only if you have already specified the host.

	If the port number is omitted or is 0, the operating system will assign an arbitrary
	unused port, which is useful for cases like automated tasks (tests, etc.)

*/

app1.listen(3000, () =>
  console.log(
    `Listening on port 3000 with no IP. Connect using http://localhost:3000 but this will not connect if an IPv4 server is listening on same port`
  )
);
app1.get('/', (req, res) => res.send('No IP server'));

app2.listen(3000, '127.0.0.1', () =>
  console.log(
    `Listening on port 3000 with IPv4 address 127.0.0.1. Connect using http://127.0.0.1:3000`
  )
);
app2.get('/', (req, res) => res.send('IPv4 server'));

app3.listen(3000, '::1', () =>
  console.log(
    `Listening on port 3000 with IPv6 address ::1. Connect using http://[::1]:3000`
  )
);
app3.get('/', (req, res) => res.send('IPv6 server'));
