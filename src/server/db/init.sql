DROP USER bytesgo;
CREATE USER bytesgo;

DROP DATABASE IF EXISTS bytesgodb;
CREATE DATABASE bytesgodb;
GRANT ALL PRIVILEGES ON DATABASE bytesgodb TO bytesgo;

DROP DATABASE IF EXISTS bytesgodb_dev;
CREATE DATABASE bytesgodb_dev;
GRANT ALL PRIVILEGES ON DATABASE bytesgodb_dev TO bytesgo;

DROP DATABASE IF EXISTS bytesgodb_test;
CREATE DATABASE bytesgodb_test;
GRANT ALL PRIVILEGES ON DATABASE bytesgodb_test TO bytesgo;