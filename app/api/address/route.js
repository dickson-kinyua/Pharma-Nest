import { connectDB } from "@/utils/mongodb";
import Address from "@/models/address";
import { getUser } from "@/utils/authorizeUser";

export async function POST(req) {
  await connectDB();

  const userID = await getUser();

  try {
    const { fullName, phoneNumber, streetAddress, city, postalCode, country } =
      await req.json();
    const newAddress = new Address({
      userId: userID,
      fullName,
      phoneNumber,
      streetAddress,
      city,
      postalCode,
      country,
    });
    await newAddress.save();
    console.log(newAddress);
    return Response.json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectDB();

  const userID = await getUser();
  console.log("address userID", userID);

  try {
    const addresses = await Address.findById({ userID });

    return Response.json({ success: true, addresses }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
