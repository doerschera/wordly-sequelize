CREATE DATABASE wordly;

USE wordly;

CREATE TABLE words
(
  id INT NOT NULL AUTO_INCREMENT,
  word TEXT NOT NULL,
  definition TEXT,
  type TEXT,
  likes INT NOT NULL,
  PRIMARY KEY(id)
);
