CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  identification_number VARCHAR(50),
  phone VARCHAR(30),
  address VARCHAR(100),
  city VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoices (
  invoice_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  invoice_type ENUM('income','expense') NOT NULL,
  invoice_number VARCHAR(50) NOT NULL,
  invoice_date DATE NOT NULL,
  client_or_supplier_name VARCHAR(100),
  base_amount DECIMAL(10,2) NOT NULL,
  vat_amount DECIMAL(10,2) NOT NULL,
  irpf_amount DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  payment_method VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_invoices_user
    FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS documents (
  document_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  document_type VARCHAR(50) NOT NULL,
  file_name VARCHAR(100),
  file_path VARCHAR(255) NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_documents_user
    FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users (
  first_name, last_name, email, password, date_of_birth, identification_number, phone, address, city
) VALUES (
  'Mateus', 'Franca', 'francamateus@gmail.com', 'mateus123', '1993-12-30', 'Y7027045F', '34 642245212', 'Avenida de la Mare de Deu de Montserrat, 172 - Bajo 2', 'Barcelona'
);

INSERT INTO invoices (
  user_id, invoice_type, invoice_number, invoice_date,
  client_or_supplier_name, base_amount, vat_amount, irpf_amount, total_amount,
  currency, payment_method
) VALUES
(
  1, 'income', 'INC-0001', '2024-10-11', 
  'ACME Corp', 1000.00, 210.00, 0.00, 1210.00,
  'EUR', 'Bank Transfer'
),
(
  1, 'expense', 'EXP-0002', '2024-10-10', 
  'Paper Supplies Ltd.', 300.00, 63.00, 0.00, 363.00,
  'EUR', 'Credit Card'
);

INSERT INTO documents (
  user_id, document_type, file_name, file_path
) VALUES
(
  1, 'tax_declaration_3t', 'Tax_Declaration_3T.pdf', '/documents/Tax_Declaration_3T.pdf'
),
(
  1, 'tax_declaration_4t', 'Tax_Declaration_4T.pdf', '/documents/Tax_Declaration_4T.pdf'
);