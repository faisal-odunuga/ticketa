# Ticketa - Event Ticketing Platform Architecture

## Overview

This document provides a comprehensive overview of the architecture for Ticketa, an event ticketing platform that allows event creators to create events and sell tickets to users using Supabase SDK, database, and storage.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Database Schema](#database-schema)
3. [Core Features](#core-features)
4. [Technology Stack](#technology-stack)
5. [Implementation Plans](#implementation-plans)

## System Architecture

The system follows a client-server architecture with a Next.js frontend and Supabase backend:

- **Frontend**: Next.js with React and TypeScript
- **Backend**: Supabase (Auth, Database, Storage)
- **Payment Processing**: Paystack / Opay
- **Deployment**: Vercel for frontend, Supabase Platform for backend

[See detailed system architecture diagram](./system-architecture.md)

## Database Schema

### Users and Authentication

We leverage Supabase's built-in authentication system with additional profile information stored in a `profiles` table.

### Events

Events are the core entity of the platform, containing all relevant information about an event.

### Tickets

Tickets represent the purchase of access to an event and include validation information.

[See detailed database schema](../architecture.md)

## Core Features

### 1. User Authentication

- Registration and login with email/password
- OAuth integration (Google, GitHub, etc.)
- Role-based access control (user, event_creator, admin)
- Profile management

[See authentication plan](./auth-plan.md)

### 2. Event Management

- Create, edit, and delete events
- Publish/unpublish events
- Set ticket prices and capacity
- Upload event banners

[See event creation plan](./event-creation-plan.md)

### 3. Ticket Purchasing

- Browse and search events
- Purchase tickets securely
- Receive confirmation and tickets
- Manage purchased tickets

[See ticket purchase plan](./ticket-purchase-plan.md)

### 4. Dashboards

- Event creator dashboard for managing events and tickets
- User dashboard for managing purchased tickets

[See dashboard plans](./dashboard-plans.md)

### 5. Payment Integration

- Secure payment processing with Paystack / Opay
- Payment history tracking
- Refund management

[See payment integration plan](./payment-integration-plan.md)

### 6. Image Storage

- Event banner storage with optimization
- QR code generation and storage for tickets

[See image storage plan](./image-storage-plan.md)

### 7. Event Discovery

- Search and filter events
- Sort by various criteria
- Pagination for performance

[See event listing plan](./event-listing-plan.md)

### 8. Ticket Validation

- QR code generation for tickets
- Mobile validation app for event staff
- Check-in tracking and reporting

[See ticket validation plan](./ticket-validation-plan.md)

## Technology Stack

### Frontend

- **Next.js** - React framework for production-ready applications
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state management

### Backend

- **Supabase** - Open source Firebase alternative
  - Auth - Authentication and authorization
  - Database - PostgreSQL with real-time capabilities
  - Storage - File storage with access control

### Payment Processing

- **Paystack / Opay** - Payment processing platform

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vercel** - Deployment platform

## Implementation Plans

Each feature has a detailed implementation plan in the architecture directory:

1. [Authentication System](./auth-plan.md)
2. [Event Creation](./event-creation-plan.md)
3. [Ticket Purchasing](./ticket-purchase-plan.md)
4. [Dashboards](./dashboard-plans.md)
5. [Payment Integration](./payment-integration-plan.md)
6. [Image Storage](./image-storage-plan.md)
7. [Event Listing](./event-listing-plan.md)
8. [Ticket Validation](./ticket-validation-plan.md)
9. [System Architecture](./system-architecture.md)
