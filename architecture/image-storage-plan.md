# Image Storage Plan

## Overview

This plan outlines the implementation of image storage for event banners using Supabase Storage.

## Storage Structure

### Buckets

1. `event-banners` - For storing event banner images
2. `ticket-qr-codes` - For storing generated ticket QR codes

### Folder Structure

```
event-banners/
  ├── {event-id}/
  │   ├── banner.jpg
  │   └── thumbnail.jpg
  └── temp/
      └── {uuid}.jpg (temporary uploads)

ticket-qr-codes/
  └── {ticket-id}.png
```

## Implementation Components

### 1. Storage Service

- `uploadEventBanner()` - Function to upload event banner images
- `generateTicketQRCode()` - Function to generate and store QR codes
- `deleteEventImages()` - Function to delete images when event is deleted
- `getPublicUrl()` - Function to get public URLs for stored images

### 2. Image Processing

- Automatic resizing for different display needs
- Format optimization (WebP when supported)
- Thumbnail generation for listing pages

### 3. Security Considerations

- Private storage buckets with authenticated access
- Signed URLs for temporary access
- File type validation
- Size limits for uploads

### 4. Upload Flow

1. User selects image file
2. Client-side validation (file type, size)
3. Upload to temporary location
4. Server-side processing (resize, optimize)
5. Move to permanent location
6. Update database with image URL
7. Clean up temporary files

### 5. Error Handling

- Network failure during upload
- Invalid file types
- File size limits exceeded
- Storage quota exceeded

## Implementation Steps

1. Create storage buckets in Supabase
2. Set up proper access policies
3. Implement upload service functions
4. Add image processing capabilities
5. Integrate with event creation flow
6. Handle image deletion when events are removed
7. Implement caching strategies for better performance
