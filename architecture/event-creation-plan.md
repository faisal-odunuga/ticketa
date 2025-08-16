# Event Creation Functionality Plan

## Overview

This plan outlines the implementation of event creation functionality for event creators.

## Components

### 1. Event Creation Form

- Form with fields for all event properties
- Validation for required fields
- Date/time pickers for event scheduling
- Image upload for event banner
- Preview functionality

### 2. Event Service

- `createEvent()` - Function to create a new event
- `updateEvent()` - Function to update an existing event
- `deleteEvent()` - Function to delete an event
- `publishEvent()` - Function to publish/unpublish an event

### 3. Event Data Model

```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  venue: string;
  startDate: Date;
  endDate: Date;
  creatorId: string;
  bannerUrl: string;
  isPublished: boolean;
  maxCapacity: number;
  price: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4. Event Creation Flow

1. Event creator navigates to "Create Event" page
2. Fill out event details form
3. Upload event banner image
4. Set ticket price and capacity
5. Preview event details
6. Save as draft or publish immediately

### 5. Validation Rules

- Title is required (max 100 characters)
- Description is required (max 2000 characters)
- Location is required
- Start date must be in the future
- End date must be after start date
- Price must be >= 0
- Max capacity must be > 0 if specified

### 6. Storage Integration

- Upload banner images to Supabase Storage
- Generate public URLs for images
- Handle image deletion when event is deleted
