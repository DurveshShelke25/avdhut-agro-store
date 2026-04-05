import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase with strong fallbacks so the Vercel build NEVER crashes!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { items, customer } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return NextResponse.json({ error: "Incomplete address details" }, { status: 400 });
    }

    // Calculate total amount
    const totalAmount = items.reduce((acc: number, item: any) => acc + Number(item.price), 0);

    // Save the Order to Supabase!
    const { data, error } = await supabase
      .from('orders')
      .insert([
        { 
          customer_name: customer.name,
          phone: customer.phone,
          address: customer.address,
          pincode: customer.pincode,
          total_amount: totalAmount,
          items: items 
        }
      ]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, message: "Order saved successfully" });

  } catch (error: any) {
    console.error("🔥 ORDER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}