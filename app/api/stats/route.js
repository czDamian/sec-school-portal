import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import Profile from "@/lib/Profile";
import Result from "@/lib/Result";
import { getUser } from "@civic/auth/nextjs";

export async function GET() {
  try {
    // Verify user authentication
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    await connectDb();

    // Get counts using MongoDB aggregation
    const [totalStudents, totalResults] = await Promise.all([
      Profile.countDocuments(),
      Result.countDocuments()
    ]);

    // Group results by academic year and term
    const resultsByPeriod = await Result.aggregate([
      {
        $group: {
          _id: {
            academicYear: "$academicYear",
            term: "$term"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.academicYear": -1,
          "_id.term": 1
        }
      }
    ]);

    // Get class distribution
    const studentsByClass = await Profile.aggregate([
      {
        $group: {
          _id: "$class",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    return NextResponse.json({
      data: {
        totalStudents,
        totalResults,
        resultsByPeriod,
        studentsByClass
      },
      status: 200
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: "Failed to fetch statistics", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}