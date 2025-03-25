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

CREATE TABLE documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  document_name VARCHAR(100),
  year INT,
  period INT NULL,
  document_data JSON,
  document_type ENUM('quarterly', 'annual'),
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
(1, 'income', '#1', '2025-04-10', 'Jordi Albanil', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Service', 2, 100, 21, 0, 'EUR', 'cash', 242),
(1, 'income', '#2', '2025-04-11', 'Vanessa Rodríguez', 'ID002', 'Calle Balmes, 47', 'Barcelona', 'Spain', ' Massage Service', 1, 100, 21, 0, 'EUR', 'transfer', 121),
(1, 'income', '#3', '2025-04-12', 'John Smith', 'ID003', 'Calle Lepant, 330', 'Barcelona', 'Spain', ' Massage Service', 1, 100, 21, 0, 'EUR', 'transfer', 121),

(1, 'expense', '#1', '2025-04-10', 'Products Supplier', 'ID101', 'Calle Verdi, 88', 'Barcelona', 'Spain', 'Product supplier', 1, 400, 21, 0, 'EUR', 'transfer', 484),
(1, 'expense', '#2', '2025-04-12', 'Seradin SL', 'ID102', 'Calle Varsóvia, 91', 'Barcelona', 'Spain', 'Rent', 1, 550, 21, 0, 'EUR', 'debit in advance', 665),
(1, 'expense', '#3', '2025-04-13', 'SoftwareXL', 'ID103', 'Calle Madrid, 101', 'Madrid', 'Spain', 'Software account', 1, 50, 21, 0, 'EUR', 'transfer', 61);

INSERT INTO quarterly_tax (user_id, year, quarter, total_income, deductible_expenses, net_income, previous_payments, withholding_taxes, deductions)
VALUES 
(1, 2024, '1T', 1500, 200, 1300, 0, 0, 20),
(1, 2024, '2T', 1000, 200, 800, 0, 0, 0);

INSERT INTO annual_tax (user_id, year, taxpayer_name, taxpayer_nif, spouse_name, spouse_nif, marital_status, address, autonomous_community, income_from_work, business_income, capital_gains, deductions)
VALUES
(1, 2024, 'Aryane Sanches', 'Y7298287X', 'Mateus Franca', 'Y7027045X', 'married', 'Avinguda Mare de Deu de Montserrat, 172', 'Barcelona', 25000, 1000, 100, 200);
(1, 2023, 'Aryane Sanches', 'Y7298287X', 'Mateus Franca', 'Y7027045X', 'married', 'Avinguda Mare de Deu de Montserrat, 172', 'Barcelona', 22500, 800, 50, 0);