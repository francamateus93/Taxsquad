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

INSERT INTO users (first_name, last_name, email, password, phone, address, city, country, date_of_birth, identification_number) 
VALUES ('Aryane', 'Sanches', 'aryanesanches0@gmail.com', 'aryane', '+34111222333', 'Avinguda Mare de Deu de Montserrat, 172', 'Barcelona', 'Spain', '1989-08-07', 'Y7298287X');

INSERT INTO invoices (user_id, invoice_type, number, date, client_name, client_id, client_address, city, country, concept, quantity, price, vat, irpf, currency, payment_method, total_amount)
VALUES 
(1, 'income', 'INV001', '2025-04-10', 'Client A', 'ID001', 'Avinguda Diagonal, 63', 'Barcelona', 'Spain', 'Massage Service', 2, 100, 21, 0, 'EUR', 'transfer', 242),
(1, 'expense', 'INV002', '2025-03-10', 'Client B', 'ID002', 'Calle Verdi, 88', 'Barcelona', 'Spain', 'Product supplier', 1, 400, 21, 0, 'EUR', 'transfer', 484);

INSERT INTO documents (user_id, document_name, document_type, year, period, document_data)
VALUES 
(1, 'First quarter', 'quarterly', 2025, 1, '{"field":"value"}'),
(1, 'Annual tax', 'annual', 2024, 1, '{"field":"value"}');
