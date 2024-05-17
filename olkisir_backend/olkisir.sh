psql -U postgres
CREATE DATABASE olkisirdb;
\c olkisirdb
CREATE USER olkisir WITH PASSWORD 'leaves';
GRANT ALL PRIVILEGES ON DATABASE olkisirdb TO olkisir;
