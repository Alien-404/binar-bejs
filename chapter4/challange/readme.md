## **RESTful API dengan Sequelize**

Ini adalah boilerplate project RESTful API yang dibangun dengan Sequelize. Sequelize adalah ORM Node.js yang berbasis promise dan mendukung banyak database seperti PostgreSQL, MySQL, SQLite, dan MSSQL.

## **Instalasi**

Sebelum menjalankan program, pastikan untuk menginstal module yang dibutuhkan dengan **\`npm i\`**.

## **Konfigurasi**

Salin file **\`.env.example\`** menjadi **\`.env\`** dan atur variabel enviroments yang diperlukan.

## **Pengaturan Database**

Jika Anda menjalankan project untuk pertama kalinya, buat database dengan menjalankan perintah berikut:

```bash
npm run create
```

Ini akan membuat database yang ditentukan dalam file **\`.env\`**. Kemudian, jalankan migrasi untuk membuat tabel-tabel di dalam database:

```bash
npm run migrate
```

## **Penggunaan**

Untuk menjalankan server, jalankan perintah:

```bash
npm run dev
```

atau

```bash
npm start
```

## **List Endpoint API**

- ## **components**

  **get semua component**

  ```bash
  GET /component
  ```

  mengambil semua component yang terdaftar.

  **get single component**

  ```bash
  GET /component/:component_uuid
  ```

  mengambil satu component dengan UUID yang terdaftar.

  **post component**

  ```bash
  POST /component
  ```

  membuat component baru.

  body:

  ```json
  {
    "name": "component name",
    "description": "component description"
  }
  ```

  **update component**

  ```bash
  PUT /component/:component_uuid
  ```

  memperbarui component dengan UUID dari component tertentu.

  body (optional):

  ```json
  {
    "name": "component name",
    "description": "component description"
  }
  ```

  **delete component**

  ```bash
  DELETE /component/:component_uuid
  ```

  menghapus component dengan UUID dari component tertentu.

- ## **suppliers**

  **get semua supplier**

  ```bash
  GET /supplier
  ```

  mengambil semua supplier yang terdaftar.

  **get single supplier**

  ```bash
  GET /supplier/:supplier_uuid
  ```

  mengambil satu supplier dengan UUID yang terdaftar.

  **post supplier**

  ```bash
  POST /supplier
  ```

  membuat supplier baru.

  body:

  ```json
  {
    "name": "supplier name",
    "address": "supplier address"
  }
  ```

  **update supplier**

  ```bash
  PUT /supplier/:supplier_uuid
  ```

  memperbarui supplier dengan UUID dari supplier tertentu.

  body (optional):

  ```json
  {
    "name": "supplier name",
    "address": "supplier address"
  }
  ```

  **delete supplier**

  ```bash
  DELETE /supplier/:supplier_uuid
  ```

  menghapus supplier dengan UUID dari supplier tertentu.

  **post pemasokan component supplier**

  ```bash
  POST /supplier/:supplier_uuid/components
  ```

  menambahkan components yang dipasok oleh supplier dengan UUID dari supplier tertentu.

  body:

  ```json
  {
    "components_uuid": ["component_uuid-1", "component_uuid-2"]
  }
  ```

  **delete pemasokan component supplier**

  ```bash
  DELETE /supplier/supplied_component/:product_components_uuid
  ```

  menghapus component yang dipasok oleh supplier dengan UUID dari product components tertentu.

- ## **products**

  **get semua product**

  ```bash
  GET /product
  ```

  mengambil semua product yang terdaftar.

  **get single product**

  ```bash
  GET /product/:product_uuid
  ```

  mengambil satu product dengan UUID yang terdaftar.

  **post product**

  ```bash
  POST /product
  ```

  membuat product baru.

  body:

  ```json
  {
    "name": "product name",
    "quantity": 1,
    "components_name": ["component_name-1", "component_name-2"]
  }
  ```

  **update product**

  ```bash
  PUT /product/:product_uuid
  ```

  memperbarui product dengan UUID dari product tertentu.

  body (optional):

  ```json
  {
    "name": "product name",
    "quantity": 1
  }
  ```

  **delete product**

  ```bash
  DELETE /product/:product_uuid
  ```

  menghapus product dengan UUID dari product tertentu.

  **post menambahkan component yang dipakai ke product**

  ```bash
  POST /product/:product_uuid/components
  ```

  menambahkan components yang dipakai oleh product dengan UUID dari product tertentu.

  body:

  ```json
  {
    "components_name": ["component_name-1", "component_name-2"]
  }
  ```

  **delete component yang dipakai product**

  ```bash
  DELETE /product/components_used/:product_component_uuid
  ```

  menghapus component yang dipakai oleh product dengan UUID dari product components tertentu.

### **Anda juga dapat mengimport api collection yang tersedia di folder api-postman-collection ke aplikasi postman atau sejenis nya yang mendukung.**
