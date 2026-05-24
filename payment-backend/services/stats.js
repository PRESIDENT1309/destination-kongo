import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

router.get("/revenue/:hotel_id", async (req, res) => {
  const { hotel_id } = req.params;

  const { data, error } = await supabase
    .from("bookings")
    .select("amount, status, created_at")
    .eq("hotel_id", hotel_id)
    .eq("status", "paid");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const safeData = data || [];

  const totalRevenue = safeData.reduce(
    (sum, b) => sum + Number(b.amount || 0),
    0
  );

  const totalBookings = safeData.length;

  const today = new Date().toISOString().split("T")[0];

  const todayRevenue = safeData
    .filter((b) => b.created_at?.startsWith(today))
    .reduce((sum, b) => sum + Number(b.amount || 0), 0);

  res.json({
    total_revenue: totalRevenue,
    total_bookings: totalBookings,
    today_revenue: todayRevenue
  });
});

export default router;