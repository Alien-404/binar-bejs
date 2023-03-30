--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: procurement_process(character varying, text, character varying); Type: PROCEDURE; Schema: public; Owner: naru
--

CREATE PROCEDURE public.procurement_process(IN component_name character varying, IN component_description text, IN supplier_name character varying)
    LANGUAGE plpgsql
    AS $$ 
	DECLARE component_id INT;
	supplier_id INT;
	BEGIN
	    
	SELECT id INTO component_id
	FROM components
	WHERE
	    LOWER(name) = LOWER(component_name);
	
	IF NOT FOUND THEN
	INSERT INTO
	    components(name, description)
	VALUES (
	        component_name,
	        component_description
	    )
	RETURNING id INTO component_id;
	END IF;
	SELECT id INTO supplier_id
	FROM suppliers
	WHERE
	    LOWER(name) = LOWER(supplier_name);
	IF NOT FOUND THEN RAISE EXCEPTION 'Supplier dengan nama % tidak ditemukan.',
	supplier_name;
	END IF;
	INSERT INTO
	    component_supplier(id_component, id_supplier)
	VALUES (component_id, supplier_id);
	
	RAISE NOTICE 'Data berhasil disimpan';
	END;
$$;


ALTER PROCEDURE public.procurement_process(IN component_name character varying, IN component_description text, IN supplier_name character varying) OWNER TO naru;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: component_supplier; Type: TABLE; Schema: public; Owner: naru
--

CREATE TABLE public.component_supplier (
    id bigint NOT NULL,
    id_component integer NOT NULL,
    id_supplier integer NOT NULL
);


ALTER TABLE public.component_supplier OWNER TO naru;

--
-- Name: component_supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: naru
--

CREATE SEQUENCE public.component_supplier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.component_supplier_id_seq OWNER TO naru;

--
-- Name: component_supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: naru
--

ALTER SEQUENCE public.component_supplier_id_seq OWNED BY public.component_supplier.id;


--
-- Name: components; Type: TABLE; Schema: public; Owner: naru
--

CREATE TABLE public.components (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.components OWNER TO naru;

--
-- Name: components_id_seq; Type: SEQUENCE; Schema: public; Owner: naru
--

CREATE SEQUENCE public.components_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_id_seq OWNER TO naru;

--
-- Name: components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: naru
--

ALTER SEQUENCE public.components_id_seq OWNED BY public.components.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: naru
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    quantity integer NOT NULL,
    id_component integer NOT NULL,
    CONSTRAINT products_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.products OWNER TO naru;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: naru
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO naru;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: naru
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: naru
--

CREATE TABLE public.suppliers (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    address text NOT NULL,
    phone character varying(20) NOT NULL
);


ALTER TABLE public.suppliers OWNER TO naru;

--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: naru
--

CREATE SEQUENCE public.suppliers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.suppliers_id_seq OWNER TO naru;

--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: naru
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- Name: component_supplier id; Type: DEFAULT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.component_supplier ALTER COLUMN id SET DEFAULT nextval('public.component_supplier_id_seq'::regclass);


--
-- Name: components id; Type: DEFAULT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.components ALTER COLUMN id SET DEFAULT nextval('public.components_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- Data for Name: component_supplier; Type: TABLE DATA; Schema: public; Owner: naru
--

COPY public.component_supplier (id, id_component, id_supplier) FROM stdin;
2	7	2
3	9	3
\.


--
-- Data for Name: components; Type: TABLE DATA; Schema: public; Owner: naru
--

COPY public.components (id, name, description) FROM stdin;
4	RAM DDR4	jenis RAM dengan kecepatan transfer data yang lebih cepat dan efisien daripada DDR3.
5	SSD NVMe	SSD dengan kecepatan transfer data yang lebih tinggi dibandingkan dengan SSD SATA.
7	RTX 3080	kartu grafis dengan kinerja yang sangat cepat dan mampu menghasilkan tampilan visual berkualitas tinggi.
8	Wi-Fi 6	jaringan nirkabel dengan kecepatan transfer data yang lebih cepat dan stabil dibandingkan dengan Wi-Fi sebelumnya (802.11ac).
9	LCD	merupakan periferal yang memegang peranan penting dalam beroperasinya sebuah Laptop.
6	CPU Intel Core i7	prosesor dengan kecepatan dan performa yang tinggi untuk menjalankan tugas yang lebih berat.
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: naru
--

COPY public.products (id, name, quantity, id_component) FROM stdin;
9	rog strix	100	4
11	asus tuf	200	5
12	acer predator	180	6
13	hp omen	140	8
15	alienware	175	7
10	msi gf63	120	4
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: naru
--

COPY public.suppliers (id, name, address, phone) FROM stdin;
2	nvidia	jakarta	0812345678
3	intel	kalimantan	0812345367
4	samsung	surabaya	0812345256
\.


--
-- Name: component_supplier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: naru
--

SELECT pg_catalog.setval('public.component_supplier_id_seq', 3, true);


--
-- Name: components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: naru
--

SELECT pg_catalog.setval('public.components_id_seq', 9, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: naru
--

SELECT pg_catalog.setval('public.products_id_seq', 15, true);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: naru
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 4, true);


--
-- Name: component_supplier component_supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.component_supplier
    ADD CONSTRAINT component_supplier_pkey PRIMARY KEY (id);


--
-- Name: components components_pkey; Type: CONSTRAINT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.components
    ADD CONSTRAINT components_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: component_supplier component_supplier_id_component_fkey; Type: FK CONSTRAINT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.component_supplier
    ADD CONSTRAINT component_supplier_id_component_fkey FOREIGN KEY (id_component) REFERENCES public.components(id);


--
-- Name: component_supplier component_supplier_id_supplier_fkey; Type: FK CONSTRAINT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.component_supplier
    ADD CONSTRAINT component_supplier_id_supplier_fkey FOREIGN KEY (id_supplier) REFERENCES public.suppliers(id);


--
-- Name: products products_id_component_fkey; Type: FK CONSTRAINT; Schema: public; Owner: naru
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_id_component_fkey FOREIGN KEY (id_component) REFERENCES public.components(id);


--
-- PostgreSQL database dump complete
--

