SELECT 'CREATE DATABASE content' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'content')\gexec

SELECT 'CREATE DATABASE users' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'users')\gexec

SELECT 'CREATE DATABASE interactions' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'interactions')\gexec
