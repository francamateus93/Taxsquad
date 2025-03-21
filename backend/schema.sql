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

CREATE TABLE tax_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  document_type ENUM('quarterly', 'annual'),
  year INT,
  quarter INT NULL,
  document_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);