-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name_en text NOT NULL,
  name_bn text NOT NULL,
  sort_order int
);

-- Create products table
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_bn text,
  category_id text REFERENCES categories(id) ON DELETE SET NULL,
  price numeric NOT NULL,
  is_available boolean DEFAULT true,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Seed 14 categories
INSERT INTO categories (id, name_en, name_bn, sort_order) VALUES
('rack', 'Rack', 'র‍্যাক', 1),
('balti', 'Balti (Bucket)', 'বালতি', 2),
('gamla', 'Gamla', 'গামলা', 3),
('tool', 'Tool / Phri (Stool)', 'স্টুল', 4),
('jali', 'Jali (Net Basket)', 'জালি', 5),
('dala', 'Dala / Chalon', 'দালা/চালন', 6),
('basket', 'Basket', 'বাকেট', 7),
('kula', 'Kula', 'কুলা', 8),
('setbati', 'Set Bati', 'সেট বাটি', 9),
('jug', 'Jug', 'জগ', 10),
('dhakna', 'Dhakna Jali', 'ঢাকনা জালি', 11),
('plate', 'Plate & Glass', 'প্লেট ও গ্লাস', 12),
('container', 'Container', 'কন্টেইনার', 13),
('others', 'Others', 'অন্যান্য', 14)
ON CONFLICT (id) DO NOTHING;

-- Mock products
INSERT INTO products (title, title_bn, category_id, price, is_available, image_url)
VALUES
('Simple Rack Model A','সিম্পল র‍্যাক A','rack',550.00,true,'https://via.placeholder.com/300'),
('Plastic Balti 10L','প্লাস্টিক বালতি 10L','balti',120.00,true,'https://via.placeholder.com/300'),
('Large Gamla','বড় গামলা','gamla',250.00,false,'https://via.placeholder.com/300')
ON CONFLICT DO NOTHING;
