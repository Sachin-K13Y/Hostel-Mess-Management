API Reference

Base URL
- Development backend default: http://localhost:5000

Auth
- POST /api/auth/register
  - Public. Body: { name, email, password, role }
  - Response: user object + token

- POST /api/auth/login
  - Public. Body: { email, password }
  - Response: user object + token

- GET /api/auth/me
  - Protected. Header: Authorization: Bearer <token>
  - Response: current user profile

Complaints
- POST /api/complaints/
  - Protected. Role: student
  - Body: { title, description, [attachments] }

- GET /api/complaints/my
  - Protected. Role: student
  - Returns student's complaints

- GET /api/complaints/all
  - Protected. Role: warden
  - Returns all complaints

- PUT /api/complaints/:id/status
  - Protected. Role: warden
  - Body: { status }

Leaves
- POST /api/leave/
  - Protected. Role: student
  - Body: { fromDate, toDate, reason }

- GET /api/leave/my
  - Protected. Role: student

- GET /api/leave/all
  - Protected. Role: warden

- PUT /api/leave/:id/status
  - Protected. Role: warden
  - Body: { status }

Notifications
- GET /api/notifications/
  - Protected. Returns notifications for the logged-in user

- PUT /api/notifications/:id/read
  - Protected. Marks a notification as read

- POST /api/notifications/broadcast
  - Protected. Warden uses to broadcast to students. Body: { title, message }

Warden utilities
- GET /api/warden/summary
  - Protected. Role: warden. Returns dashboard summary

- GET /api/warden/recent
  - Protected. Role: warden. Returns recent activity

Authentication
- All protected endpoints require header: Authorization: Bearer <JWT>

Samples
Request (login):
POST /api/auth/login
{
  "email": "student@example.com",
  "password": "password123"
}

Response (login):
{
  "user": { "id": "...", "name": "...", "role": "student" },
  "token": "<jwt>"
}
