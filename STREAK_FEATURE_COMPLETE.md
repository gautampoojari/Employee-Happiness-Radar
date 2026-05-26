# 🔥 Streak Feature - Complete Documentation

## Overview
The streak feature tracks consecutive days of employee mood check-ins, encouraging daily engagement with the wellbeing platform.

## How Streaks Work

### Streak Calculation Rules

1. **First Check-in**
   - Streak = 1
   - lastCheckIn = current timestamp

2. **Consecutive Days**
   - If last check-in was **yesterday**, streak increments by 1
   - If last check-in was **today** (updating), streak stays the same

3. **Broken Streak**
   - If last check-in was **before yesterday**, streak resets to 1
   - When viewing streak (without check-in), shows 0 if broken

4. **No Check-ins**
   - Streak = 0

### Key Features

✅ **Real-time Calculation**
- Streak is calculated dynamically based on `lastCheckIn` date
- GET `/api/mood/my-streak` returns actual current streak, accounting for missed days

✅ **Visual Feedback**
- Active streak: Yellow/orange gradient with 🔥 emoji
- No streak: Gray gradient with 💤 emoji
- Larger font size (text-4xl) for emphasis

✅ **Motivational Messages**
- 0 days: "Start your streak today!"
- 1 day: "Great start! Keep it up!"
- 2-6 days: "Building momentum!"
- 7-29 days: "Awesome consistency! 🌟"
- 30+ days: "Legendary streak! 🏆"

✅ **Duplicate Prevention**
- Only ONE check-in allowed per day
- Updating same-day check-in doesn't affect streak
- Streak increments only on NEW daily check-ins

---

## Implementation Details

### Backend Logic

#### Streak Update Function
```javascript
// /server/routes/mood.js - lines 192-221

async function updateUserStreak(userId) {
  const user = await User.findByPk(userId);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  if (!user.lastCheckIn) {
    // First check-in ever
    user.streak = 1;
  } else {
    const lastCheckInDate = new Date(user.lastCheckIn).toISOString().split('T')[0];
    
    if (lastCheckInDate === yesterday) {
      // Continuing streak
      user.streak = (user.streak || 0) + 1;
    } else if (lastCheckInDate === today) {
      // Already checked in today (updating check-in), don't change streak
      return;
    } else {
      // Missed days, reset streak
      user.streak = 1;
    }
  }
  
  user.lastCheckIn = new Date();
  await user.save();
}
```

#### Dynamic Streak Retrieval
```javascript
// GET /api/mood/my-streak

router.get('/my-streak', authenticate, async (req, res) => {
  const user = await User.findByPk(req.user.id);
  
  // Calculate actual streak based on lastCheckIn date
  let actualStreak = user.streak || 0;
  
  if (user.lastCheckIn) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const lastCheckInDate = new Date(user.lastCheckIn).toISOString().split('T')[0];
    
    // If last check-in was before yesterday, streak should be 0
    if (lastCheckInDate !== today && lastCheckInDate !== yesterday) {
      actualStreak = 0;
    }
  } else {
    actualStreak = 0;
  }
  
  res.json({
    streak: actualStreak,
    lastCheckIn: user.lastCheckIn
  });
});
```

### Frontend Display

#### Streak Card Component
```jsx
// /src/app/components/employee/EmployeeOverview.jsx

<Card className={`bg-gradient-to-br ${
  streak > 0 
    ? 'from-yellow-400 to-orange-500' 
    : 'from-gray-400 to-gray-500'
} text-white shadow-lg`}>
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium">Your Streak</CardTitle>
    <Award className="w-4 h-4 opacity-75" />
  </CardHeader>
  <CardContent>
    <div className="text-4xl font-bold">
      {streak} {streak > 0 ? '🔥' : '💤'}
    </div>
    <p className="text-xs opacity-75 mt-1">
      {streak === 0 ? 'Start your streak today!' : 
       streak === 1 ? 'Great start! Keep it up!' :
       streak < 7 ? 'Building momentum!' :
       streak < 30 ? 'Awesome consistency! 🌟' :
       'Legendary streak! 🏆'}
    </p>
  </CardContent>
</Card>
```

---

## API Endpoints

### POST `/api/mood/checkin`
Creates new mood check-in and updates streak.

**Request Body:**
```json
{
  "happiness": 4,
  "stress": 2,
  "motivation": 5,
  "hydration": 7,
  "notes": "Feeling great today!"
}
```

**Response:**
```json
{
  "message": "Mood check-in created successfully",
  "checkIn": {
    "id": 123,
    "userId": 5,
    "happiness": 4,
    "stress": 2,
    "motivation": 5,
    "hydration": 7,
    "notes": "Feeling great today!",
    "date": "2026-03-13",
    "createdAt": "2026-03-13T10:30:00.000Z"
  },
  "streak": 7
}
```

**Update Same Day:**
```json
{
  "message": "Mood check-in updated successfully",
  "checkIn": { ... },
  "streak": 7
}
```

### GET `/api/mood/my-streak`
Retrieves current streak with dynamic calculation.

**Response:**
```json
{
  "streak": 7,
  "lastCheckIn": "2026-03-13T10:30:00.000Z"
}
```

**Broken Streak (>1 day ago):**
```json
{
  "streak": 0,
  "lastCheckIn": "2026-03-10T10:30:00.000Z"
}
```

**No Check-ins:**
```json
{
  "streak": 0,
  "lastCheckIn": null
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role ENUM('employee', 'admin') DEFAULT 'employee',
  department ENUM(...) NULL,
  streak INTEGER DEFAULT 0,              -- Current streak count
  last_check_in DATETIME NULL,           -- Timestamp of last check-in
  last_login DATETIME NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### MoodCheckIns Table
```sql
CREATE TABLE mood_check_ins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  happiness INTEGER NOT NULL CHECK(happiness BETWEEN 1 AND 5),
  stress INTEGER NOT NULL CHECK(stress BETWEEN 1 AND 5),
  motivation INTEGER NOT NULL CHECK(motivation BETWEEN 1 AND 5),
  hydration INTEGER NOT NULL CHECK(hydration BETWEEN 1 AND 10),
  notes TEXT,
  date DATE NOT NULL,                    -- Date of check-in (YYYY-MM-DD)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(user_id, date)                  -- Prevents duplicate check-ins per day
);
```

---

## Edge Cases & Solutions

### Edge Case 1: Timezone Issues
**Problem**: User in different timezone might check in at wrong day  
**Solution**: Backend uses `new Date().toISOString().split('T')[0]` which uses UTC date  
**Consideration**: All dates stored and compared in UTC

### Edge Case 2: Multiple Check-ins Same Day
**Problem**: User tries to check in multiple times same day  
**Solution**: 
- UNIQUE constraint on (user_id, date)
- Backend checks for existing check-in and updates instead
- Streak not affected by updates

### Edge Case 3: Missed One Day
**Problem**: User checks in Monday, skips Tuesday, checks in Wednesday  
**Solution**: Streak resets to 1 on Wednesday check-in

### Edge Case 4: Viewing Broken Streak
**Problem**: User hasn't checked in for 5 days, still shows old streak  
**Solution**: GET /my-streak dynamically calculates - returns 0 if last check-in > 1 day ago

### Edge Case 5: First Ever Check-in
**Problem**: New user has null lastCheckIn  
**Solution**: Sets streak = 1, lastCheckIn = now

### Edge Case 6: Update vs Create
**Problem**: Distinguishing between new check-in and update  
**Solution**: 
- Check for existing check-in with same date
- If exists, update without changing streak
- If new, increment/set streak

---

## Testing Scenarios

### Test 1: New User First Check-in
```javascript
// Starting state: streak = 0, lastCheckIn = null
POST /api/mood/checkin
// Expected: streak = 1, lastCheckIn = today
```

### Test 2: Consecutive Days
```javascript
// Day 1: streak = 1, lastCheckIn = yesterday
POST /api/mood/checkin
// Expected: streak = 2, lastCheckIn = today
```

### Test 3: Same Day Update
```javascript
// Starting: streak = 5, lastCheckIn = today (morning)
POST /api/mood/checkin (evening)
// Expected: streak = 5 (unchanged), checkIn updated
```

### Test 4: Missed Days
```javascript
// Starting: streak = 10, lastCheckIn = 3 days ago
POST /api/mood/checkin
// Expected: streak = 1 (reset), lastCheckIn = today
```

### Test 5: View Broken Streak
```javascript
// Starting: streak = 7 (in DB), lastCheckIn = 5 days ago
GET /api/mood/my-streak
// Expected response: streak = 0
```

### Test 6: 30-Day Streak
```javascript
// Check in every day for 30 days
// Expected: streak increments each day
// Final: streak = 30, shows "Legendary streak! 🏆"
```

---

## UI/UX Features

### Visual Indicators

1. **Active Streak (>0)**
   - Gradient: Yellow to Orange
   - Icon: 🔥 Fire emoji
   - Shadow: Enhanced with shadow-lg
   - Size: Text-4xl for prominence

2. **No Streak (0)**
   - Gradient: Gray
   - Icon: 💤 Sleeping emoji
   - Message: "Start your streak today!"
   - Encourages action

### Motivational Tiers

| Streak Days | Message | Significance |
|-------------|---------|--------------|
| 0 | "Start your streak today!" | Encouragement to begin |
| 1 | "Great start! Keep it up!" | Positive reinforcement |
| 2-6 | "Building momentum!" | Early progress |
| 7-29 | "Awesome consistency! 🌟" | Weekly milestone |
| 30+ | "Legendary streak! 🏆" | Major achievement |

### Activity Summary

**Employee Overview displays:**
- Current streak with visual indicator
- Total check-ins count
- Department affiliation
- Pro tip for daily check-ins
- Recent check-in history with streak context

---

## Future Enhancements

### Potential Features

1. **Streak Badges**
   - 7-day badge: "Week Warrior"
   - 30-day badge: "Monthly Master"
   - 100-day badge: "Centurion"
   - 365-day badge: "Year Legend"

2. **Leaderboard**
   - Department-wise streak rankings
   - Company-wide top streaks
   - Anonymous or opt-in display

3. **Streak Recovery**
   - One "freeze" per month (maintain streak if you miss one day)
   - Notification/reminder system

4. **Analytics**
   - Average streak length
   - Longest streak achieved
   - Streak maintenance rate
   - Department comparison

5. **Notifications**
   - Daily reminder to check in
   - Streak milestone celebrations
   - Warning when streak is at risk

6. **Rewards System**
   - Points for streak milestones
   - Redemption for perks
   - Virtual rewards/recognition

---

## Common Issues & Troubleshooting

### Issue: Streak shows 0 even after check-in
**Cause**: Frontend hasn't reloaded data  
**Solution**: Check-in component calls `window.location.reload()` after 1.5s  
**Verify**: Check network tab for successful API response

### Issue: Streak doesn't increment
**Cause**: Checking in multiple times same day  
**Solution**: This is expected behavior - only one check-in per day  
**Verify**: Check response message for "updated" vs "created"

### Issue: Streak reset unexpectedly
**Cause**: Missed a day between check-ins  
**Solution**: This is correct - streaks require consecutive days  
**Verify**: Check lastCheckIn timestamp in database

### Issue: Different streak in DB vs displayed
**Cause**: GET /my-streak calculates dynamically  
**Solution**: This is intentional - displays actual current streak  
**Example**: DB shows 7, but last check-in was 3 days ago = displays 0

---

## Performance Considerations

### Database Queries
- Streak calculation: Single user lookup
- Check-in creation: One query to check existing + one to create/update
- Optimized with indexes on user_id and date

### Caching Strategy
- Frontend caches streak value in state
- Reloads on check-in submission
- No polling (avoids unnecessary API calls)

### Scalability
- Streak logic O(1) complexity
- No joins required for streak calculation
- Efficient date comparison using ISO strings

---

## Security

### Validation
- User must be authenticated
- Can only update own streak
- Date manipulation prevented by server-side date generation

### Data Integrity
- UNIQUE constraint prevents duplicate check-ins
- Streak stored in user record (single source of truth)
- Timestamps recorded for audit trail

---

## Summary

The streak feature is fully functional with:
- ✅ Proper calculation logic (consecutive days)
- ✅ Dynamic streak display (accounts for missed days)
- ✅ Visual feedback (colors, emojis, shadows)
- ✅ Motivational messaging (tier-based encouragement)
- ✅ Duplicate prevention (one check-in per day)
- ✅ Update handling (same-day updates don't affect streak)
- ✅ Edge case handling (timezones, first check-in, broken streaks)
- ✅ Enhanced UI (larger numbers, better colors, pro tips)

**Status**: ✅ COMPLETE AND WORKING
**Last Updated**: March 13, 2026
**Version**: 2.0 (Enhanced with dynamic calculation and improved UI)
