-- ==========================================================
-- 🇮🇳 NO POVERTY — GOVERNMENT SCHEMES FINDER DATABASE SCHEMA
-- Database: poverty_schemes_db
-- ==========================================================

CREATE DATABASE IF NOT EXISTS poverty_schemes_db
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE poverty_schemes_db;

-- 1. Users / Citizen Accounts Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    citizen_id VARCHAR(30) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100),
    aadhaar_masked VARCHAR(20),
    state VARCHAR(50) NOT NULL,
    category VARCHAR(20) DEFAULT 'General',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Saved / Bookmarked Schemes Table
CREATE TABLE IF NOT EXISTS saved_schemes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    scheme_id VARCHAR(50) NOT NULL,
    scheme_name VARCHAR(150) NOT NULL,
    benefit_amount VARCHAR(100),
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY user_scheme_unique (user_id, scheme_id)
);

-- 3. Citizen Scheme Applications Table
CREATE TABLE IF NOT EXISTS scheme_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id VARCHAR(40) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    scheme_id VARCHAR(50) NOT NULL,
    scheme_name VARCHAR(150) NOT NULL,
    applicant_name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    ration_card_type VARCHAR(20),
    annual_income VARCHAR(50),
    status ENUM('SUBMITTED', 'UNDER_VERIFICATION', 'SANCTIONED', 'DBT_DISBURSED') DEFAULT 'SUBMITTED',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================================================
-- Sample Seed Data for Testing
-- ==========================================================
INSERT IGNORE INTO users (id, citizen_id, full_name, mobile, email, aadhaar_masked, state, category)
VALUES 
(1, 'IND-849201', 'Sainath Rao', '9876543210', 'sainath@example.com', 'XXXX-XXXX-4921', 'Uttar Pradesh', 'OBC'),
(2, 'IND-712390', 'Naveen Kumar', '9812345678', 'naveen@example.com', 'XXXX-XXXX-1239', 'Telangana', 'General');

INSERT IGNORE INTO saved_schemes (user_id, scheme_id, scheme_name, benefit_amount)
VALUES 
(1, 'pm-kisan', 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', '₹6,000 / year'),
(1, 'pmjay-ayushman', 'Ayushman Bharat - PM Jan Arogya Yojana', '₹5,00,000 / family / year');

INSERT IGNORE INTO scheme_applications (application_id, user_id, scheme_id, scheme_name, applicant_name, mobile, ration_card_type, annual_income, status)
VALUES 
('APP-2026-89210', 1, 'pm-kisan', 'Pradhan Mantri Kisan Samman Nidhi', 'Sainath Rao', '9876543210', 'BPL', 'under_1_lakh', 'UNDER_VERIFICATION');
