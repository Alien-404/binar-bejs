## ERD Manufaktur Binar

![erd by rico](erd/erd.png 'ERD Manufaktur Binar')

## **Data definition language Manufaktur Binar**

1. membuat database :

   ```sql
       CREATE DATABASE manufaktur_binar;
   ```

2. membuat table :

   - **suppliers** :

   ```sql
       CREATE TABLE suppliers (
           id BIGSERIAL PRIMARY KEY NOT NULL,
           name VARCHAR(255) NOT NULL,
           address TEXT NOT NULL,
           phone VARCHAR(20) NOT NULL
       );
   ```

   - **components** :

   ```sql
       CREATE TABLE components (
           id BIGSERIAL PRIMARY KEY NOT NULL,
           name VARCHAR(255) NOT NULL,
           description TEXT NOT NULL
       );
   ```

   - **products** :

   ```sql
       CREATE TABLE products (
           id BIGSERIAL PRIMARY KEY NOT NULL,
           name VARCHAR(255) NOT NULL,
           quantity INTEGER NOT NULL CHECK (quantity >= 0),
           id_component INT NOT NULL,
           FOREIGN KEY (id_component) REFERENCES components(id)
       );
   ```

   - **component_supplier** :

   ```sql
       CREATE TABLE component_supplier (
           id BIGSERIAL PRIMARY KEY NOT NULL,
           id_component INT NOT NULL,
           id_supplier INT NOT NULL,
           FOREIGN KEY (id_component) REFERENCES components(id),
           FOREIGN KEY (id_suppliers) REFERENCES suppliers(id)
       );
   ```

   ### **Penjalasan Relasi pada table yang dibuat :**

   - Tabel **products** memiliki relasi _many-to-one_ dengan tabel **components**, karena setiap produk terdiri dari satu komponen, namun satu komponen dapat digunakan oleh banyak produk. Oleh karena itu, tabel **products** memiliki kolom **id_component** yang merupakan _foreign key_ dari kolom **id** pada tabel **components**.

   - Tabel **component_supplier** adalah tabel _junction_ yang menghubungkan tabel **components** dengan tabel **suppliers**. Tabel ini memiliki relasi _many-to-many_ antara tabel **components** dan **suppliers**, karena satu komponen dapat dipasok oleh banyak pemasok, dan satu pemasok dapat memasok banyak komponen. Oleh karena itu, tabel **component_supplier** memiliki dua kolom yang merupakan _foreign key_, yaitu **id_component** yang mengacu pada kolom **id** pada tabel **components**, dan **id_supplier** yang mengacu pada kolom **id** pada tabel **suppliers**.

3. membuat procedure

   ```sql
   CREATE OR REPLACE PROCEDURE PROCUREMENT_PROCESS(
    IN COMPONENT_NAME VARCHAR(255),
    IN COMPONENT_DESCRIPTION TEXT,
    IN SUPPLIER_NAME VARCHAR(255))
   LANGUAGE PLPGSQL
   AS $$
       DECLARE
        component_id INT;
        supplier_id INT;

       BEGIN
        -- check component availabe in table or NOT
       SELECT id INTO component_id FROM components WHERE LOWER(name) =
        LOWER(component_name);
       -- if not availabe, insert new component
       IF NOT FOUND THEN
        INSERT INTO components(name, description) VALUES (component_name,
         component_description) RETURNING id INTO component_id;
       END IF;

       -- check supplier availabe or not
       SELECT id INTO supplier_id FROM suppliers WHERE LOWER(name) =
        LOWER(supplier_name);
        -- return error
       IF NOT FOUND THEN
        RAISE EXCEPTION 'Supplier dengan nama % tidak ditemukan.',
         supplier_name;
       END IF;

        -- insert data component supplier
       INSERT INTO component_supplier(id_component, id_supplier) VALUES
        (component_id, supplier_id);
       -- output message
       RAISE NOTICE 'Data berhasil disimpan!';
       END;
   $$;
   ```

## **Data Manipulation Language Manufaktur Binar (CRUD)**

1. INSERT DATA

   - **table components :**

     ```sql
     INSERT INTO components(name, description) VALUES
     ('RAM DDR4', 'jenis RAM dengan kecepatan transfer data yang lebih cepat dan efisien daripada DDR3.'),
     ('SSD NVMe', 'SSD dengan kecepatan transfer data yang lebih tinggi dibandingkan dengan SSD SATA.'),
     ('CPU Intel Core i6', 'prosesor dengan kecepatan dan performa yang tinggi untuk menjalankan tugas yang lebih berat.'),
     ('RTX 3080', 'kartu grafis dengan kinerja yang sangat cepat dan mampu menghasilkan tampilan visual berkualitas tinggi.'),
     ('Wi-Fi 6', 'jaringan nirkabel dengan kecepatan transfer data yang lebih cepat dan stabil dibandingkan dengan Wi-Fi sebelumnya (802.11ac).');
     ```

   - **table suppliers :**

     ```sql
     INSERT INTO suppliers (name, address, phone) VALUES
     ('nvidia', 'jakarta', '0812345678'),
     ('intel', 'kalimantan', '0812345367'),
     ('sumsang', 'surabaya', '0812345256');
     ```

   - **table products :**

     ```sql
     INSERT INTO products (name, quantity, id_component) VALUES
     ('rog strix', 100, 4),
     ('msi gf67', 120, 1),
     ('asus tuf', 200, 2),
     ('acer predator', 180, 3),
     ('hp omen', 140, 5),
     ('nokia', 0, 1),
     ('alienware', 175, 4);
     ```

   - **table component_supplier using call procedure (case product availabe) :**

     ```sql
     CALL PROCUREMENT_PROCESS('RTX 3080', 'kartu grafis dengan kinerja yang sangat cepat untuk game AAA', 'nvidia');
     ```

   - **table component_supplier using call procedure (case product not availabe) :**

     ```sql
     CALL PROCUREMENT_PROCESS('LCD', 'merupakan periferal yang memegang peranan penting dalam beroperasinya sebuah Laptop.', 'intel');
     ```

   - **table component_supplier using call procedure (case supplier not availabe - error) :**

     ```sql
     CALL PROCUREMENT_PROCESS('LCD', 'merupakan periferal yang memegang peranan penting dalam beroperasinya sebuah Laptop.', 'apple');
     ```

2. UPDATE DATA

   - **table components :**

     ```sql
     UPDATE components SET name = 'CPU Intel Core i7' WHERE name = 'CPU Intel Core i6';
     ```

   - **table suppliers :**

     ```sql
     UPDATE suppliers SET name = 'samsung' WHERE name = 'sumsang';
     ```

   - **table products :**

     ```sql
     UPDATE products SET name = 'msi gf63' WHERE name = 'msi gf67';
     ```

3. DELETE DATA

   - **table products :**

     ```sql
     DELETE FROM products WHERE name = 'nokia';
     ```

4. SELECT DATA

   - **table products :**

     - all column

       ```sql
       SELECT * FROM products;
       ```

     - join (components)

       ```sql
       SELECT p.*, c.name AS component_name FROM products p INNER JOIN components c ON p.id_component = c.id;
       ```

   - **table suppliers :**

     ```sql
     SELECT * FROM suppliers;
     ```

   - **table components :**

     ```sql
     SELECT * FROM components;
     ```

   - **table component_supplier join (components & suppliers) :**

     ```sql
     SELECT cs.*, c.name AS component_name, s.name AS supplier_name FROM component_supplier cs INNER JOIN components c ON cs.id_component = c.id INNER JOIN suppliers s ON cs.id_supplier = s.id;
     ```

### Semua dokumentasi dapat ditemukan di folder 'documentations'. Folder ini berisi dokumentasi untuk setiap fitur yang terdapat pada program ini.
