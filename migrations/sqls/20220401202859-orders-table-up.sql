CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint,
    quantity integer,
    user_id bigint,
    status VARCHAR(100)
);