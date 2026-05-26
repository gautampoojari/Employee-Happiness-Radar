# API Quick Reference

Quick reference for Employee Happiness Radar API endpoints.

## 🔗 Base URL
```
http://localhost:5000/api
```

## 🔐 Authentication Header
```
Authorization: Bearer <jwt-token>
```

---

## Auth Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/employee/signup` | Public | Register employee |
| POST | `/auth/employee/login` | Public | Login employee |
| POST | `/auth/admin/signup` | Public | Register admin (needs token) |
| POST | `/auth/admin/login` | Public | Login admin |
| GET | `/auth/me` | Private | Get current user |
| POST | `/auth/validate-token` | Public | Validate admin token |

---

## Mood Endpoints (Employee)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/mood/checkin` | Employee | Create/update mood check-in |
| GET | `/mood/my-checkins` | Employee | Get user's check-ins |
| GET | `/mood/my-streak` | Employee | Get check-in streak |
| GET | `/mood/today` | Employee | Get today's check-in |
| GET | `/mood/stats` | Employee | Get mood statistics |

---

## Survey Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/survey/active` | Employee | Get active surveys |
| GET | `/survey/:id` | Private | Get survey by ID |
| POST | `/survey/:id/respond` | Employee | Submit survey response |
| GET | `/survey/my/responses` | Employee | Get user's responses |

---

## Feedback Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/feedback` | Employee | Submit feedback |
| GET | `/feedback/my-feedback` | Employee | Get user's feedback |

---

## Admin Endpoints

### Dashboard & Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard` | Dashboard overview stats |
| GET | `/admin/trends?days=7` | Mood trends over time |
| GET | `/admin/department-stats` | Stats by department |
| GET | `/admin/burnout-alerts` | Burnout risk alerts |

### Employee Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/employees` | Get all employees |
| GET | `/admin/employees/:id` | Get employee details |
| DELETE | `/admin/employees/:id` | Deactivate employee |

### Survey Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/surveys` | Create survey |
| GET | `/admin/surveys` | Get all surveys |
| PATCH | `/admin/surveys/:id/toggle` | Toggle survey status |
| DELETE | `/admin/surveys/:id` | Delete survey |
| GET | `/admin/surveys/:id/responses` | Get survey responses |

### Feedback Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/feedback` | Get all feedback |
| PATCH | `/admin/feedback/:id` | Update feedback status |

### Token Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/tokens/generate` | Generate admin token |
| GET | `/admin/tokens` | Get all admin tokens |

---

## Request Examples

### Employee Signup
```bash
curl -X POST http://localhost:5000/api/auth/employee/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "department": "Engineering"
  }'
```

### Mood Check-in
```bash
curl -X POST http://localhost:5000/api/mood/checkin \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "happiness": 4,
    "stress": 2,
    "motivation": 5,
    "hydration": 6,
    "note": "Great day!"
  }'
```

### Create Survey (Admin)
```bash
curl -X POST http://localhost:5000/api/admin/surveys \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Employee Satisfaction",
    "questions": [
      {"question": "How satisfied are you?", "type": "rating"},
      {"question": "Any suggestions?", "type": "text"}
    ],
    "isActive": true
  }'
```

---

## Data Formats

### Mood Check-in
```json
{
  "happiness": 1-5,
  "stress": 1-5,
  "motivation": 1-5,
  "hydration": 0-8,
  "note": "optional text"
}
```

### Survey Question
```json
{
  "question": "Question text",
  "type": "rating" | "text"
}
```

### Feedback
```json
{
  "feedback": "Feedback text (min 10 chars)",
  "isAnonymous": true | false
}
```

---

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Departments

- Engineering
- Marketing
- Sales
- HR
- Finance
- Operations
- Customer Support
- Design
- Product
- Other

---

## Default Admin Tokens

```
ADMIN-INVITE-2025-MAIN
ADMIN-INVITE-HR-001
ADMIN-INVITE-EXEC-001
```

(Valid until 2026-12-31)

---

## Test Credentials (After Seeding)

**Admin:**
- Email: `admin@company.com`
- Password: `admin123`

**Employees:**
- Email: `alice@company.com` (and others)
- Password: `password123`

---

For detailed documentation, see [README.md](./README.md)
