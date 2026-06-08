-- users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  email TEXT,
  photo_url TEXT,
  bio TEXT,
  preferred_ride_type TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  is_admin BOOLEAN DEFAULT FALSE,
  ride_stats JSONB DEFAULT '{"totalRides": 0, "totalKm": 0, "totalElevation": 0}'::jsonb
);

-- threads table
CREATE TABLE threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid UUID REFERENCES users(id),
  tag TEXT,
  title TEXT NOT NULL,
  excerpt TEXT,
  upvotes INT DEFAULT 0,
  pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- thread upvotes
CREATE TABLE thread_upvotes (
  uid UUID REFERENCES users(id),
  thread_id UUID REFERENCES threads(id),
  PRIMARY KEY (uid, thread_id)
);

-- rooms table
CREATE TABLE rooms (
  id TEXT PRIMARY KEY,  -- e.g. 'road-riders', 'mtb-crew'
  name TEXT,
  description TEXT,
  member_count INT DEFAULT 0
);

-- messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT REFERENCES rooms(id),
  uid UUID REFERENCES users(id),
  display_name TEXT,
  photo_url TEXT,
  text TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- live_riders table
CREATE TABLE live_riders (
  uid UUID PRIMARY KEY REFERENCES users(id),
  display_name TEXT,
  photo_url TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  speed DOUBLE PRECISION,
  heading DOUBLE PRECISION,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- meetup_points
CREATE TABLE meetup_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid UUID REFERENCES users(id),
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  note TEXT,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid UUID REFERENCES users(id),
  type TEXT,  -- 'wave' | 'reply' | 'ride_invite'
  from_uid UUID REFERENCES users(id),
  from_name TEXT,
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ride_logs
CREATE TABLE ride_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid UUID REFERENCES users(id),
  name TEXT,
  distance DOUBLE PRECISION,
  elevation INT,
  duration TEXT,
  avg_speed DOUBLE PRECISION,
  type TEXT,
  feeling INT,
  notes TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- saved_routes
CREATE TABLE saved_routes (
  uid UUID REFERENCES users(id),
  route_id INT,
  PRIMARY KEY (uid, route_id)
);

-- community_members
CREATE TABLE community_members (
  uid UUID REFERENCES users(id),
  room_id TEXT REFERENCES rooms(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (uid, room_id)
);

-- leaderboard_monthly
CREATE TABLE leaderboard_monthly (
  uid UUID PRIMARY KEY REFERENCES users(id),
  display_name TEXT,
  photo_url TEXT,
  total_distance DOUBLE PRECISION DEFAULT 0,
  total_rides INT DEFAULT 0,
  month TEXT  -- e.g. '2025-06'
);

-- Seed rooms
INSERT INTO rooms (id, name, description) VALUES
  ('road-riders', 'Road Riders', 'Tarmac, speed, watts. Road cycling discussions.'),
  ('mtb-crew', 'MTB Crew', 'Dirt, drops, and descents.'),
  ('gravel-gang', 'Gravel Gang', 'Mixed terrain adventures.'),
  ('training-lab', 'Training Lab', 'FTP, intervals, recovery. Get faster.'),
  ('bengaluru-local', 'Bengaluru Local Riders', 'Local rides, routes, and meetups.');

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE thread_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_riders ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetup_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_monthly ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- users: anyone can read, only owner can update
CREATE POLICY "Public read" ON users FOR SELECT USING (true);
CREATE POLICY "Owner update" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Owner insert" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- threads: anyone can read, auth users create, owner deletes
CREATE POLICY "Public read" ON threads FOR SELECT USING (true);
CREATE POLICY "Auth create" ON threads FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Owner update" ON threads FOR UPDATE USING (auth.uid() = uid);
CREATE POLICY "Owner delete" ON threads FOR DELETE USING (auth.uid() = uid);

-- thread_upvotes
CREATE POLICY "Auth read" ON thread_upvotes FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Owner write" ON thread_upvotes FOR INSERT WITH CHECK (auth.uid() = uid);
CREATE POLICY "Owner delete" ON thread_upvotes FOR DELETE USING (auth.uid() = uid);

-- messages
CREATE POLICY "Auth read" ON messages FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth create" ON messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- live_riders
CREATE POLICY "Auth read" ON live_riders FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Owner write" ON live_riders FOR ALL USING (auth.uid() = uid);

-- notifications
CREATE POLICY "Owner all" ON notifications FOR ALL USING (auth.uid() = uid);

-- ride_logs
CREATE POLICY "Public read public rides" ON ride_logs FOR SELECT USING (is_public = true OR auth.uid() = uid);
CREATE POLICY "Owner write" ON ride_logs FOR INSERT WITH CHECK (auth.uid() = uid);
CREATE POLICY "Owner delete" ON ride_logs FOR DELETE USING (auth.uid() = uid);

-- meetup_points, saved_routes, community_members, leaderboard_monthly
CREATE POLICY "Auth read" ON meetup_points FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth create" ON meetup_points FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth read" ON saved_routes FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Owner write" ON saved_routes FOR ALL USING (auth.uid() = uid);
CREATE POLICY "Public read" ON leaderboard_monthly FOR SELECT USING (true);
CREATE POLICY "Owner write" ON leaderboard_monthly FOR ALL USING (auth.uid() = uid);
CREATE POLICY "Auth read" ON community_members FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Owner write" ON community_members FOR ALL USING (auth.uid() = uid);

-- Increment Leaderboard RPC function
CREATE OR REPLACE FUNCTION increment_leaderboard(p_uid UUID, p_distance DOUBLE PRECISION, p_display_name TEXT, p_photo_url TEXT)
RETURNS void AS $$
DECLARE
  v_month TEXT := to_char(CURRENT_DATE, 'YYYY-MM');
BEGIN
  INSERT INTO leaderboard_monthly (uid, display_name, photo_url, total_distance, total_rides, month)
  VALUES (p_uid, p_display_name, p_photo_url, p_distance, 1, v_month)
  ON CONFLICT (uid)
  DO UPDATE SET 
    total_distance = leaderboard_monthly.total_distance + EXCLUDED.total_distance,
    total_rides = leaderboard_monthly.total_rides + 1,
    display_name = EXCLUDED.display_name,
    photo_url = EXCLUDED.photo_url,
    month = EXCLUDED.month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Realtime on required tables
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE live_riders;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE threads;
