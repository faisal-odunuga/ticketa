# Authentication System Plan

## Overview

The authentication system will leverage Supabase's built-in authentication with additional profile management for role-based access control.

## Components

### 1. Supabase Auth Integration

- Use Supabase Auth for user registration and login
- Support for email/password and OAuth providers (Google, GitHub, etc.)
- Session management with automatic token refresh

### 2. Profile Management

- Create a `profiles` table to store additional user information
- Automatically create profile records on user signup
- Role-based access control with roles: 'user', 'event_creator', 'admin'

### 3. Authentication Hooks

- `useAuth()` - Main authentication hook providing user state and auth methods
- `useProfile()` - Hook for accessing and updating user profile data
- `useRequireAuth()` - Hook for protecting routes that require authentication

### 4. Authentication Service

- `AuthService` - Service class for handling authentication operations
- Methods for signup, login, logout, password reset, etc.
- Integration with Supabase Auth APIs

## Implementation Details

### User Registration Flow

1. User signs up with email and password
2. Supabase creates auth user
3. Automatically create profile record with user ID reference
4. Set default role to 'user'
5. Redirect to onboarding flow for event creators

### User Login Flow

1. User logs in with credentials
2. Supabase validates and returns session
3. Fetch user profile data
4. Store user and profile in application state

### Role Management

- Users can request to become event creators
- Admins can approve event creator requests
- Role-based UI rendering and access control
