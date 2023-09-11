1) Create a folder openssl in C:\
2) Copy the folder 'openssl-1.0.2q-x64_86-win64' into the openssl folder
3) Set the copied folder's path as environment variable (eg. C:\openssl\openssl-1.0.2q-x64_86-win64)
4) Copy the file 'openssl.cfg' in the C:\openssl folder

5) Open cmd with admin rights and run the following command :
	set OPENSSL_CONF=C:\openssl\openssl.cfg

6) Now cd into the openssl folder to create a key and a certificate :
	cd C:\openssl

7) Create a key using the following command and set a pass for the key eg. hello123
	openssl genrsa -out CA.key -des3 2048

8) Now create a certificate using the following command (confirm the key password to make a certificate)
	openssl req -x509 -sha256 -new -nodes -days 3650 -key CA.key -out CA.pem

9) Now manually create file 'localhost.ext' in openssl folder

10) Now generate a key for our domain (ie localhost) by using the following command and set a password eg. hello123
	openssl genrsa -out localhost.key -des3 2048

11) Now generate a certificate request for localhost certificate (enter the password of localhost key)
	openssl req -new -key localhost.key -out localhost.csr

12) Now create a certificate for localhost
	openssl x509 -req -in localhost.csr -CA CA.pem -CAkey CA.key -CAcreateserial -days 3650 -sha256 -extfile 	localhost.ext -out localhost.crt

13) Store a decrypted key
	openssl rsa -in localhost.key -out localhost.decrypted.key

14) Once the ssl certificate is created, still chrome may not allow https requests made to server with a certificate that has invalid authority. To disable this security for localhost servers, paste the following in chrome address bar and disable the option :
	chrome://flags/#allow-insecure-localhost


