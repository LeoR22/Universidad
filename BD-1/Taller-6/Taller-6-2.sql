use employees;

-- a. Consulte el nombre, apellido, fecha de nacimiento y género de todos los empleados. (son aproximadamente 300.000)
SELECT first_name, last_name, birth_date, gender
FROM employees;

-- b. Para limitar el número de resultados, incluya al final de la sentencia anterior Limit 20, para limitar los resultados a 20 registros (en adelante puede limitar sus consultas con esta sentencia).
SELECT first_name, last_name, birth_date, gender
FROM employees
LIMIT 20;

-- c. Consulte todos los datos de todos los departamentos.
SELECT *
FROM departments;

-- d. Consulte los diferentes títulos que hay (investigue la forma de lograr que cada título salga una sola vez).
SELECT DISTINCT title
FROM titles;

-- e. Consulte el nombre, apellido y género de los empleados, ordenando el resultado por apellido, de forma ascendente.
SELECT first_name, last_name, gender
FROM employees
ORDER BY last_name ASC;


-- f. Consulte todos los datos de los empleados que tienen un apellido que empiece por ‘Vi’
SELECT *
FROM employees
WHERE last_name LIKE 'Vi%';

-- g. Consulte todos los datos de los empleados cuyo apellido inicia por W y en alguna parte tiene las letras ck.
SELECT *
FROM employees
WHERE last_name LIKE 'W%' AND last_name LIKE '%ck%';

-- h. Consulte cuantos empleados son mujeres (género es F).
SELECT COUNT(*)
FROM employees
WHERE gender = 'F';

-- i. Consulte el valor del salario, la fecha de inicio y la fecha de fin (del salario) del empleado número 452003.
SELECT salary, from_date, to_date
FROM salaries
WHERE emp_no = 452003;


-- j. Consulte los títulos del empleado número 43000.
SELECT title, from_date, to_date
FROM titles
WHERE emp_no = 43000;


-- k. Consulte el nombre y apellido de los managers que ha tenido el departamento d004, de forma que el título de las columnas se presente como nombre y apellido respectivamente.
SELECT e.first_name AS nombre, e.last_name AS apellido
FROM employees e
JOIN dept_manager dm ON e.emp_no = dm.emp_no
WHERE dm.dept_no = 'd004';


-- l. Consulte todos los títulos que ha tenido el empleado llamado Cristinel Bouloucos.
SELECT title, from_date, to_date
FROM titles
WHERE emp_no IN (SELECT emp_no FROM employees WHERE first_name = 'Cristinel' AND last_name = 'Bouloucos');

-- m. Consulte los salarios registrados y los mismos salarios incrementados en 7.2% del empleado de código 35000. Etiquete las columnas como SALARIO y SALARIO INCREMENTADO.
SELECT salary AS SALARIO, salary * 1.072 AS 'SALARIO INCREMENTADO'
FROM salaries
WHERE emp_no = 35000;


-- n. Consulte el número (código) de los empleados que estuvieron en el departamento d006 antes de 1987.
SELECT DISTINCT emp_no
FROM dept_emp
WHERE dept_no = 'd006' AND to_date < '1987-01-01';

-- o. Cuente el número de empleados que tienen o han tenido título de Ingeniero (Engineer) o personal directivo (Senior Staff).
SELECT COUNT(DISTINCT emp_no)
FROM titles
WHERE title IN ('Engineer', 'Senior Staff');

-- p. Consulte cuántos empleados han tenido algún título de Engineer (considerando las diferentes categorías de ingeniero).
SELECT COUNT(DISTINCT emp_no)
FROM titles
WHERE title LIKE 'Engineer%';

-- q. Consulte los códigos de los empleados que tuvieron título de Engineer durante 1987.
SELECT DISTINCT emp_no
FROM titles
WHERE title LIKE 'Engineer%' AND (from_date BETWEEN '1987-01-01' AND '1987-12-31' OR to_date BETWEEN '1987-01-01' AND '1987-12-31');

-- r. Consulte todos los datos del último empleado que ha ingresado.
SELECT *
FROM employees
ORDER BY hire_date DESC
LIMIT 1;
