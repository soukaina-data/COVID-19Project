DROP TABLE covid CASCADE; 

CREATE TABLE covid (
	date DATE NOT NULL, 
	city VARCHAR,
	country VARCHAR,
	confirmed INT,
	deaths INT,
	recovered INT, 
	lat float8 not null,
	long float8 not null
);

ALTER TABLE covid
ADD COLUMN entry_id SERIAL PRIMARY KEY;

SELECT * FROM covid;

SELECT date, country, recovered, confirmed, recovered/NULLIF(confirmed::float,0) as recovered_percent FROM covid;

SELECT country, deaths, confirmed, deaths/NULLIF(confirmed::float,0) as death_percent FROM covid;

CREATE VIEW confirmed_by_date AS
SELECT date, SUM(confirmed) FROM covid
GROUP BY date
ORDER BY date

select * FROM confirmed_by_date;

SELECT date, SUM(deaths) FROM covid
GROUP BY date
ORDER BY date

SELECT date, SUM(recovered) FROM covid
GROUP BY date
ORDER BY date