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
(1, 'income', '#2', '2025-01-05', 'Vanessa Rodríguez', 'ID002', 'Calle Balmes, 47', 'Barcelona', 'Spain', ' Massage Services', 1, 500, 21, 0, 'EUR', 'card', 605),
(1, 'income', '#3', '2025-02-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#4', '2025-02-06', 'Vanessa Rodríguez', 'ID002', 'Calle Balmes, 47', 'Barcelona', 'Spain', ' Massage Services', 1, 800, 21, 0, 'EUR', 'transfer', 968),
(1, 'income', '#5', '2025-03-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#6', '2025-03-07', 'Fernando Oliveira', 'ID003', 'Calle Mallorca, 189', 'Barcelona', 'Spain', ' Massage Services', 1, 100, 21, 0, 'EUR', 'transfer', 121),
(1, 'income', '#7', '2025-04-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#8', '2025-05-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#9', '2025-05-08', 'Tony Gonzalez', 'ID004', 'Calle Gran de Gracia, 247', 'Barcelona', 'Spain', ' Massage Services', 1, 550, 21, 0, 'EUR', 'card', 665),
(1, 'income', '#10', '2025-06-05', 'Vanessa Rodríguez', 'ID002', 'Calle Balmes, 47', 'Barcelona', 'Spain', ' Massage Services', 1, 800, 21, 0, 'EUR', 'transfer', 968),
(1, 'income', '#11', '2025-06-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#12', '2025-07-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#13', '2025-07-06', 'Vanessa Rodríguez', 'ID002', 'Calle Balmes, 47', 'Barcelona', 'Spain', ' Massage Services', 1, 600, 21, 0, 'EUR', 'transfer', 726),
(1, 'income', '#14', '2025-08-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 1, 1000, 21, 0, 'EUR', 'cash', 1210),
(1, 'income', '#15', '2025-08-07', 'Fernando Oliveira', 'ID003', 'Calle Mallorca, 189', 'Barcelona', 'Spain', ' Massage Services', 1, 300, 21, 0, 'EUR', 'transfer', 363),
(1, 'income', '#16', '2025-09-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 1, 1000, 21, 0, 'EUR', 'cash', 1210),
(1, 'income', '#17', '2025-09-05', 'Vanessa Rodríguez', 'ID002', 'Calle Balmes, 47', 'Barcelona', 'Spain', ' Massage Services', 1, 800, 21, 0, 'EUR', 'transfer', 968),
(1, 'income', '#18', '2025-10-08', 'Tony Gonzalez', 'ID004', 'Calle Gran de Gracia, 247', 'Barcelona', 'Spain', ' Massage Services', 1, 550, 21, 0, 'EUR', 'card', 665),
(1, 'income', '#19', '2025-10-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 1, 2000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#20', '2025-11-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 1, 1000, 21, 0, 'EUR', 'cash', 1210),
(1, 'income', '#21', '2025-11-08', 'Tony Gonzalez', 'ID004', 'Calle Gran de Gracia, 247', 'Barcelona', 'Spain', ' Massage Services', 1, 600, 21, 0, 'EUR', 'card', 726),
(1, 'income', '#22', '2025-12-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Services', 2, 1000, 21, 0, 'EUR', 'cash', 2420),
(1, 'income', '#23', '2025-12-05', 'Vanessa Rodríguez', 'ID002', 'Calle Balmes, 47', 'Barcelona', 'Spain', ' Massage Services', 1, 500, 21, 0, 'EUR', 'card', 605);


INSERT INTO invoices (user_id, invoice_type, number, date, client_name, client_id, client_address, city, country, concept, quantity, price, vat, irpf, currency, payment_method, total_amount)
VALUES 
(1, 'expense', '#18', '2025-12-10', 'Products Supplier', 'ID101', 'Calle Verdi, 88', 'Barcelona', 'Spain', 'Product supplier', 1, 100, 21, 0, 'EUR', 'debit', 121),
(1, 'expense', '#19', '2025-12-12', 'Seradin SL', 'ID102', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent', 1, 550, 21, 0, 'EUR', 'debit', 665),
(1, 'expense', '#20', '2025-12-23', 'Seguridad Social', 'ID103', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Autonomy contributions', 1, 300, 0, 0, 'EUR', 'debit', 300),
(1, 'expense', '#21', '2025-12-19', 'Movistar', 'ID104', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Internet an Wifi', 1, 100, 21, 0, 'EUR', 'debit', 121),
(1, 'expense', '#22', '2025-12-10', 'Energy LTDA', 'ID105', 'Calle Mallorca, 88', 'Barcelona', 'Spain', 'Eletricity', 1, 100, 21, 0, 'EUR', 'debit', 121),
(1, 'expense', '#23', '2025-12-10', 'Aguas de Barcelona', 'ID106', 'Avinguda Diagonal, 81', 'Barcelona', 'Spain', 'Water', 1, 200, 21, 0, 'EUR', 'debit', 242),
(1, 'expense', '#24', '2025-12-10', 'Gas de Barcelona', 'ID107', 'Avinguda Diagonal, 81', 'Barcelona', 'Spain', 'Gas', 1, 100, 21, 0, 'EUR', 'debit', 121),
(1, 'expense', '#24', '2025-12-10', 'Marketing Company', 'ID108', 'Calle Gracia, 01', 'Barcelona', 'Spain', 'Marketing Services', 1, 200, 21, 0, 'EUR', 'debit', 242);


INSERT INTO quarterly_tax (user_id, year, quarter, total_income, deductible_expenses, net_income, previous_payments, withholding_taxes, deductions)
VALUES 
(1, 2024, '1T', 1500, 200, 1300, 0, 0, 20),
(1, 2024, '2T', 1000, 200, 800, 0, 0, 0);
(1, 2024, '3T', 2000, 100, 1900, 0, 0, 0);

INSERT INTO annual_tax (user_id, year, taxpayer_name, taxpayer_nif, spouse_name, spouse_nif, marital_status, address, autonomous_community, income_from_work, business_income, capital_gains, deductions)
VALUES
(1, 2024, 'Aryane Sanches', 'Y7298287X', 'Mateus Franca', 'Y7027045X', 'married', 'Avinguda Mare de Deu de Montserrat, 172', 'Barcelona', 25000, 1000, 100, 200),
(1, 2023, 'Aryane Sanches', 'Y7298287X', 'Mateus Franca', 'Y7027045X', 'married', 'Avinguda Mare de Deu de Montserrat, 172', 'Barcelona', 22500, 800, 50, 0);