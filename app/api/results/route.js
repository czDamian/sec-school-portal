import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import Result from "@/lib/Result";
import { getUser } from "@civic/auth/nextjs";
import Profile from "@/lib/Profile";

export async function POST(req) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDb();

    // Check if user has admin role
    const userProfile = await Profile.findOne({ email: user.email });
    if (!userProfile || userProfile.role !== "admin") {
      return NextResponse.json(
        { message: "Error! Only teachers can upload results." },
        { status: 403 }
      );
    }

    const data = await req.json();
    const result = await Result.create(data);

    // Filter out empty fields
    const filteredResult = JSON.parse(JSON.stringify(result));
    Object.keys(filteredResult.subjects).forEach((subject) => {
      if (!filteredResult.subjects[subject].total) {
        delete filteredResult.subjects[subject];
      }
    });

    return NextResponse.json(
      { message: "Result created successfully", data: filteredResult },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create result", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDb();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    const term = searchParams.get("term");
    const academicYear = searchParams.get("academicYear");

    let query = {};
    if (studentId) query.student = studentId;
    if (term) query.term = term;
    if (academicYear) query.academicYear = academicYear;

    const results = await Result.find(query)
      .populate("student", "firstName lastName class")
      .lean();

    // Filter out empty subjects for each result
    const filteredResults = results.map((result) => {
      const filteredSubjects = {};
      Object.entries(result.subjects).forEach(([subject, scores]) => {
        if (scores.total > 0) {
          filteredSubjects[subject] = scores;
        }
      });
      return {
        ...result,
        subjects: filteredSubjects,
      };
    });

    return NextResponse.json({ data: filteredResults }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch results", details: error.message },
      { status: 500 }
    );
  }
}
