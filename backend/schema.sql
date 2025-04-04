CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  date_of_birth DATE,
  identification_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  invoice_type ENUM('income', 'expense'),
  number VARCHAR(50),
  date DATE,
  client_name VARCHAR(100),
  client_id VARCHAR(50),
  client_address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  concept TEXT,
  quantity INT,
  price DECIMAL(10,2),
  vat DECIMAL(5,2),
  irpf DECIMAL(5,2),
  currency VARCHAR(10),
  payment_method VARCHAR(50),
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE quarterly_tax (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  year INT,
  quarter VARCHAR(50),
  total_income DECIMAL(10,2),
  deductible_expenses DECIMAL(10,2),
  net_income DECIMAL(10,2),
  previous_payments DECIMAL(10,2),
  withholding_taxes DECIMAL(10,2),
  deductions DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE annual_tax (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  year INT,
  taxpayer_name VARCHAR(255),
  taxpayer_nif VARCHAR(20),
  spouse_name VARCHAR(255),
  spouse_nif VARCHAR(20),
  marital_status VARCHAR(50),
  address TEXT,
  autonomous_community VARCHAR(100),
  income_from_work DECIMAL(10,2),
  business_income DECIMAL(10,2),
  capital_gains DECIMAL(10,2),
  deductions DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Example data


INSERT INTO users (first_name, last_name, email, password, phone, address, city, country, date_of_birth, identification_number) 
VALUES ('Aryane', 'Sanches', 'aryanesanches0@gmail.com', 'aryane', '+34111222333', 'Avinguda Mare de Deu de Montserrat, 172', 'Barcelona', 'Spain', '1989-08-07', 'Y7298287X');

INSERT INTO invoices (user_id, invoice_type, number, date, client_name, client_id, client_address, city, country, concept, quantity, price, vat, irpf, currency, payment_method, total_amount)
VALUES 
(1, 'income', '#1', '2025-01-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#2', '2025-02-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#3', '2025-03-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 900, 21, 0, 'EUR', 'cash', 2178),
(1, 'income', '#4', '2025-04-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 700, 21, 0, 'EUR', 'cash', 1694),
(1, 'income', '#5', '2025-05-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#6', '2025-06-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),  
(1, 'income', '#7', '2025-07-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#8', '2025-08-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 600, 21, 0, 'EUR', 'cash', 1452),
(1, 'income', '#9', '2025-09-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#10', '2025-10-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#11', '2025-11-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 800, 21, 0, 'EUR', 'cash', 1936),
(1, 'income', '#12', '2025-12-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420);

-- Invoices 2024

INSERT INTO invoices (user_id, invoice_type, number, date, client_name, client_id, client_address, city, country, concept, quantity, price, vat, irpf, currency, payment_method, total_amount)
VALUES 
(1, 'income', '#12024', '2024-01-10', 'Centro de Masajes', 'ID002', 'Calle Sants, 12', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#22024', '2024-02-10', 'Centro de Masajes', 'ID002', 'Calle Sants, 12', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#32024', '2024-03-10', 'Centro de Masajes', 'ID002', 'Calle Sants, 12', 'Barcelona', 'Spain', 'Massage Services', 2, 900, 21, 0, 'EUR', 'cash', 2178),
(1, 'income', '#42024', '2024-04-10', 'Centro de Masajes', 'ID002', 'Calle Sants, 12', 'Barcelona', 'Spain', 'Massage Services', 2, 700, 21, 0, 'EUR', 'cash', 1694),
(1, 'income', '#52024', '2024-05-10', 'Centro de Masajes', 'ID002', 'Calle Sants, 12', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#62024', '2024-06-10', 'Centro de Masajes', 'ID002', 'Calle Sants, 12', 'Barcelona', 'Spain', 'Massage Services', 2, 800, 21, 0, 'EUR', 'cash', 1936),  
(1, 'income', '#72024', '2024-07-10', 'Centro de Masajes', 'ID002', 'Calle Sants, 12', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#82024', '2024-08-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 800, 21, 0, 'EUR', 'cash', 1936),
(1, 'income', '#92024', '2024-09-10', 'Centro de Masajes', 'ID002', 'Calle Sants, 12', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#102024', '2024-10-10', 'Centro de Masajes', 'ID002', 'Calle Sants, 12', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#112024', '2024-11-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 800, 21, 0, 'EUR', 'cash', 1936),
(1, 'income', '#122024', '2024-12-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 800, 21, 0, 'EUR', 'cash', 1936);


INSERT INTO invoices (user_id, invoice_type, number, date, client_name, client_id, client_address, city, country, concept, quantity, price, vat, irpf, currency, payment_method, total_amount)
VALUES 
(1, 'expense', '#101', '2025-01-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 900, 21, 0, 'EUR', 'debit', 1089),
(1, 'expense', '#102', '2025-01-30', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 300, 0, 0, 'EUR', 'debit', 300),
(1, 'expense', '#103', '2025-02-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 1250, 21, 0, 'EUR', 'debit', 1452),
(1, 'expense', '#104', '2025-02-28', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 300, 0, 0, 'EUR', 'debit', 300),
(1, 'expense', '#105', '2025-03-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 1250, 21, 0, 'EUR', 'debit', 1452),
(1, 'expense', '#106', '2025-03-31', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 500, 0, 0, 'EUR', 'debit', 500),
(1, 'expense', '#107', '2025-04-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 1250, 21, 0, 'EUR', 'debit', 1452),
(1, 'expense', '#108', '2025-04-30', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 300, 0, 0, 'EUR', 'debit', 300),
(1, 'expense', '#109', '2025-05-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 1000, 21, 0, 'EUR', 'debit', 1021),
(1, 'expense', '#110', '2025-05-31', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 400, 0, 0, 'EUR', 'debit', 400),
(1, 'expense', '#111', '2025-06-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 1250, 21, 0, 'EUR', 'debit', 1452),
(1, 'expense', '#112', '2025-06-30', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 300, 0, 0, 'EUR', 'debit', 300),
(1, 'expense', '#113', '2025-07-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 1250, 21, 0, 'EUR', 'debit', 1452),
(1, 'expense', '#114', '2025-07-31', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 200, 0, 0, 'EUR', 'debit', 200),
(1, 'expense', '#115', '2025-08-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 1250, 21, 0, 'EUR', 'debit', 1452),
(1, 'expense', '#116', '2025-08-31', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 300, 0, 0, 'EUR', 'debit', 300),
(1, 'expense', '#117', '2025-09-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 1000, 21, 0, 'EUR', 'debit', 1210),
(1, 'expense', '#118', '2025-09-30', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 300, 0, 0, 'EUR', 'debit', 300),
(1, 'expense', '#119', '2025-10-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 1500, 21, 0, 'EUR', 'debit', 1815),
(1, 'expense', '#120', '2025-10-31', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 300, 0, 0, 'EUR', 'debit', 300),
(1, 'expense', '#121', '2025-11-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 1250, 21, 0, 'EUR', 'debit', 1452),
(1, 'expense', '#122', '2025-11-30', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 300, 0, 0, 'EUR', 'debit', 300),
(1, 'expense', '#123', '2025-12-01', 'Supply company', 'ID101', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent and all the supplies', 1, 900, 21, 0, 'EUR', 'debit', 1089),
(1, 'expense', '#124', '2025-12-31', 'Tax Agency', 'ID102', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Contributions and taxes', 1, 700, 0, 0, 'EUR', 'debit', 700);


INSERT INTO quarterly_tax (user_id, year, quarter, total_income, deductible_expenses, net_income, previous_payments, withholding_taxes, deductions)
VALUES 
(1, 2024, '1', 1500, 200, 1300, 0, 0, 20),
(1, 2024, '2', 1000, 200, 800, 0, 0, 0),
(1, 2024, '3', 2000, 100, 1900, 0, 0, 0);

INSERT INTO annual_tax (user_id, year, taxpayer_name, taxpayer_nif, spouse_name, spouse_nif, marital_status, address, autonomous_community, income_from_work, business_income, capital_gains, deductions)
VALUES
(1, 2024, 'Aryane Sanches', 'Y7298287X', 'Mateus Franca', 'Y7027045X', 'married', 'Avinguda Mare de Deu de Montserrat, 172', 'Barcelona', 25000, 1000, 100, 200),
(1, 2023, 'Aryane Sanches', 'Y7298287X', 'Mateus Franca', 'Y7027045X', 'married', 'Avinguda Mare de Deu de Montserrat, 172', 'Barcelona', 22500, 800, 50, 0);