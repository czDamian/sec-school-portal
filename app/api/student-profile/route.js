import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import Profile from "@/lib/Profile";
import { getUser } from "@civic/auth/nextjs";

export async function POST(req) {
  try {
    await connectDb();
    const data = await req.json();

    const studentProfile = await Profile.create(data);
    return NextResponse.json(
      { message: "Student profile created successfully", data: studentProfile },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create student profile", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access", isUser: false },
        { status: 401 }
      );
    }

    await connectDb();
    const { searchParams } = new URL(req.url);
    const regNumber = searchParams.get("regNumber");
    const email = searchParams.get("email");
    const className = searchParams.get("class");

    let query = {};
    if (email) query.email = email;
    if (regNumber) query.regNumber = regNumber;
    if (className) query.class = className;

    // Always use find() to return an array
    // Use findOne() only for email and regNumber queries
    const profiles =
      email || regNumber
        ? await Profile.findOne(query)
        : await Profile.find(query);

    // If searching by email/regNumber and no profile found
    if ((email || regNumber) && !profiles) {
      return NextResponse.json(
        { message: "Student profile not found", isUser: false },
        { status: 404 }
      );
    }

    // If searching by email/regNumber, wrap the single profile in an array
    const responseData = email || regNumber ? [profiles] : profiles;

    return NextResponse.json(
      {
        data: responseData,
        isUser: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch student profiles", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    await connectDb();
    const data = await req.json();

    // Find and update profile only if it belongs to the logged-in user
    const updatedProfile = await Profile.findOneAndUpdate(
      { email: user.email },
      data,
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile updated successfully", data: updatedProfile },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile", details: error.message },
      { status: 500 }
    );
  }
}
