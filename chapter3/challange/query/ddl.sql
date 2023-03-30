CREATE DATABASE manufaktur_binar;

CREATE TABLE
    suppliers (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL
    );

CREATE TABLE
    components (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
    );

CREATE TABLE
    products (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL CHECK (quantity >= 0),
        id_component INT NOT NULL,
        FOREIGN KEY (id_component) REFERENCES components(id)
    );

CREATE TABLE
    component_supplier (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        id_component INT NOT NULL,
        id_supplier INT NOT NULL,
        FOREIGN KEY (id_component) REFERENCES components(id),
        FOREIGN KEY (id_supplier) REFERENCES suppliers(id)
    );