-- INSERT

INSERT INTO
    components(name, description)
VALUES (
        'RAM DDR4',
        'jenis RAM dengan kecepatan transfer data yang lebih cepat dan efisien daripada DDR3.'
    ), (
        'SSD NVMe',
        'SSD dengan kecepatan transfer data yang lebih tinggi dibandingkan dengan SSD SATA.'
    ), (
        'CPU Intel Core i6',
        'prosesor dengan kecepatan dan performa yang tinggi untuk menjalankan tugas yang lebih berat.'
    ), (
        'RTX 3080',
        'kartu grafis dengan kinerja yang sangat cepat dan mampu menghasilkan tampilan visual berkualitas tinggi.'
    ), (
        'Wi-Fi 6',
        'jaringan nirkabel dengan kecepatan transfer data yang lebih cepat dan stabil dibandingkan dengan Wi-Fi sebelumnya (802.11ac).'
    );

INSERT INTO
    suppliers (name, address, phone)
VALUES (
        'nvidia',
        'jakarta',
        '0812345678'
    ), (
        'intel',
        'kalimantan',
        '0812345367'
    ), (
        'sumsang',
        'surabaya',
        '0812345256'
    );

INSERT INTO
    products (name, quantity, id_component)
VALUES ('rog strix', 100, 4), ('msi gf67', 120, 1), ('asus tuf', 200, 2), ('acer predator', 180, 3), ('hp omen', 140, 5), ('nokia', 0, 1), ('alienware', 175, 4);

CALL
    PROCUREMENT_PROCESS(
        'RTX 3080',
        'kartu grafis dengan kinerja yang sangat cepat untuk game AAA',
        'nvidia'
    );

CALL
    PROCUREMENT_PROCESS(
        'LCD',
        'merupakan periferal yang memegang peranan penting dalam beroperasinya sebuah Laptop.',
        'intel'
    );

CALL
    PROCUREMENT_PROCESS(
        'LCD',
        'merupakan periferal yang memegang peranan penting dalam beroperasinya sebuah Laptop.',
        'apple'
    );

-- UPDATE

UPDATE components
SET name = 'CPU Intel Core i7'
WHERE
    name = 'CPU Intel Core i6';

UPDATE suppliers SET name = 'samsung' WHERE name = 'sumsang';

UPDATE products SET name = 'msi gf63' WHERE name = 'msi gf67';

-- DELETE

DELETE FROM products WHERE name = 'nokia';

-- SELECT

SELECT * FROM products;

SELECT
    p.*,
    c.name AS component_name
FROM products p
    INNER JOIN components c ON p.id_component = c.id;

SELECT * FROM suppliers;

SELECT * FROM components;

SELECT
    cs.*,
    c.name AS component_name,
    s.name AS supplier_name
FROM component_supplier cs
    INNER JOIN components c ON cs.id_component = c.id
    INNER JOIN suppliers s ON cs.id_supplier = s.id;