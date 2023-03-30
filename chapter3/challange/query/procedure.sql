CREATE OR REPLACE PROCEDURE PROCUREMENT_PROCESS(IN 
COMPONENT_NAME VARCHAR(255), IN COMPONENT_DESCRIPTION 
TEXT, IN SUPPLIER_NAME VARCHAR(255)) LANGUAGE PLPGSQL 
AS 
	$$ DECLARE component_id INT;
	supplier_id INT;
	BEGIN -- check component availabe in table or NOT
	SELECT id INTO component_id
	FROM components
	WHERE
	    LOWER(name) = LOWER(component_name);
	-- if not availabe, insert new component
	IF NOT FOUND THEN
	INSERT INTO
	    components(name, description)
	VALUES (
	        component_name,
	        component_description
	    ) RETURNING id INTO component_id;
	END IF;
	-- check supplier availabe or not
	SELECT id INTO supplier_id
	FROM suppliers
	WHERE
	    LOWER(name) = LOWER(supplier_name);
	-- return error
	IF NOT FOUND THEN RAISE EXCEPTION 'Supplier dengan nama % tidak ditemukan.',
	supplier_name;
	END IF;
	-- insert data component supplier
	INSERT INTO
	    component_supplier(id_component, id_supplier)
	VALUES (component_id, supplier_id);
	-- output message
	RAISE NOTICE 'Data berhasil disimpan!';
END; 

$$;