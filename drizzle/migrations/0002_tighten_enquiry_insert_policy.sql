DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit a valid enquiry" ON public.enquiries
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 100
  AND (company IS NULL OR char_length(company) <= 150)
  AND phone ~ '^[+]?[0-9 -]{6,20}$'
  AND (email IS NULL OR email = '' OR (char_length(email) <= 255 AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  AND char_length(btrim(product)) BETWEEN 1 AND 100
  AND char_length(btrim(location)) BETWEEN 1 AND 150
  AND (quantity IS NULL OR char_length(quantity) <= 50)
  AND char_length(btrim(message)) BETWEEN 1 AND 2000
);