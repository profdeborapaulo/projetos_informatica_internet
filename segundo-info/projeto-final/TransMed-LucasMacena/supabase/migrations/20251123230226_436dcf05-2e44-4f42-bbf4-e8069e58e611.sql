-- Add quantity column to expenses table for tracking number of bus passes
ALTER TABLE expenses ADD COLUMN quantity INTEGER DEFAULT 1;

COMMENT ON COLUMN expenses.quantity IS 'Quantidade de passagens (usado principalmente para ônibus)';