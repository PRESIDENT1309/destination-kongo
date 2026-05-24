import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

import { sendWhatsApp } from "./whatsapp.js";
import { sendEmail } from "./email.js";
import { generateInvoice } from "./invoice.js";
import statsRouter from "./routes/stats.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/stats", statsRouter);

// Supabase admin
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);


/**
 * CREATE PAYMENT
 */

app.post("/payment/create", async (req, res) => {

  const {
    hotel_id,
    hotel_name,
    amount,
    user_name,
    user_email,
    phone,
    check_in,
    check_out,
    travelers
  } = req.body;

  try {

    const transaction_id = `TX_${Date.now()}`;

    const payment = await axios.post(
      "https://api-checkout.cinetpay.com/v2/payment",
      {

        apikey: process.env.CINETPAY_API_KEY,
        site_id: process.env.CINETPAY_SITE_ID,

        transaction_id,
        amount,

        currency:"CDF",

        description:`Reservation ${hotel_name}`,

        customer_name:user_name,

        customer_phone_number:phone,

        notify_url:
          "http://localhost:3001/payment/webhook",

        return_url:
          "http://localhost:5173/success"

      }
    );


    await supabase
      .from("bookings")
      .insert({

        hotel_id,
        hotel_name,
        user_name,
        phone,
        amount,

        check_in,
        check_out,

        travelers,

        transaction_id,

        status:"pending"

      });


    return res.json({

      payment_url:
      payment.data.data.payment_url

    });


  } catch(err){

    console.error(err.message);

    return res
    .status(500)
    .json({
      error:"Payment error"
    });

  }

});


/**
 * WEBHOOK
 */

app.post(
"/payment/webhook",

async(req,res)=>{

try{

const {
transaction_id,
status
}=req.body;

console.log(
"WEBHOOK:",
req.body
);

if(
status==="ACCEPTED" ||
status==="SUCCESS"
){

await supabase
.from("bookings")
.update({

status:"paid"

})
.eq(
"transaction_id",
transaction_id
);


const {
data:booking
}
=
await supabase
.from("bookings")
.select("*")
.eq(
"transaction_id",
transaction_id
)
.single();


if(booking){

await sendWhatsApp(
booking.phone,
booking.hotel_name,
booking.check_in
);

await sendEmail(
booking.user_email,
booking.hotel_name,
booking.amount
);

generateInvoice(
booking
);

}

}

else{

await supabase
.from("bookings")
.update({
status:"failed"
})
.eq(
"transaction_id",
transaction_id
);

}

res
.status(200)
.send("OK");

}
catch(err){

console.log(
err.message
);

res
.status(500)
.send("ERROR");

}

});



/**
 * ADMIN BOOKINGS
 */

app.get(
"/admin/bookings/:hotelId",

async(req,res)=>{

const {
hotelId
}
=
req.params;


const {
data,
error
}
=
await supabase

.from(
"bookings"
)

.select("*")

.eq(
"hotel_id",
hotelId
)

.order(
"created_at",
{
ascending:false
}
);


if(error){

return res
.status(500)
.json({

error:
error.message

});

}


res.json(
data
);

});



app.listen(

3001,

()=>{

console.log(
"Server running on 3001"
)

});