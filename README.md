# ERE Client Management System

Internal business management system developed for **ER Engineers** to streamline daily operations including work order management, service tracking, employee management, and customer records.

The system has been **actively used in production for over 2 years**, managing **1000+ invoices and customer records**.

---

## Overview

The **ERE Client Management System** is a full-stack web application designed to help engineering service companies manage their operational workflow efficiently.

It allows staff to manage service work orders, track upcoming maintenance schedules, maintain AC unit service histories, generate invoices, and analyze operational data through statistics and reports.

The system is built with a modern **React + Node.js architecture**, ensuring scalability, performance, and maintainability.

---

## Key Features

- Work order management
- Upcoming service tracking
- Customer management
- Employee management
- AC unit service history records
- Invoice generation and tracking
- Operational statistics and analytics
- Image management with Google Drive integration
- Secure internal system for company staff

---

## Technology Stack

### Frontend
- React
- Vite
- Axios
- MUI

### Backend
- Node.js
- Express.js
- REST API Architecture

### Database
- MongoDB

### External Integrations
- Google Drive API (image upload & management)

---

## System Architecture

```text
User (Admin / Staff)
        ↓
React Frontend (Vite Client)
        ↓
REST API (Express Backend)
        ↓
MongoDB Database
```

## Image Management

The system integrates with Google Drive API to handle image storage.

Features include:

- Upload service-related images
- Store images securely in Google Drive
- Delete images from Drive when records are removed
- Efficient external storage instead of local server storage

## Production Usage

This system is currently used internally by ER Engineers.

**Operational statistics:**

- 2+ years in active production
- 1000+ invoices generated
- 1000+ customer service records
- Daily operational usage by staff

The platform has proven to be stable and reliable for managing engineering service operations.

## Core Modules

**Work Orders**

- Create and manage service work orders for technicians.

**Service Tracking**

- Track upcoming AC services and maintenance schedules.

**Customers**

- Maintain detailed records of customers and their AC units.

**Employees**

- Manage employee records and technician assignments.

**Invoices**

- Generate and track invoices for completed services.

**Analytics**

- View operational insights and statistics.

## Author

**Chanuka Gishen Mendis**  
Backend-Focused Full-Stack Software Engineer

- **GitHub:**  
  https://github.com/Chanuka-Gishen

- **Portfolio:**  
  https://www.chanukagishen.com
