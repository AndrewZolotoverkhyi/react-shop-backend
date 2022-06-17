CREATE TABLE IF NOT EXISTS products
(
    id integer NOT NULL,
    for character varying NOT NULL,
    img character varying NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    price integer NOT NULL,
    PRIMARY KEY (id)
);