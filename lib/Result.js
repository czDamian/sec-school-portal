import mongoose from "mongoose";

const terms = ["1st Term", "2nd Term", "3rd Term"];

const subjectSchema = new mongoose.Schema({
  assessmentScore: {
    type: Number,
    min: [0, "Assessment score cannot be less than 0"],
    max: [40, "Assessment score cannot exceed 40"],
    default: 0,
  },
  examScore: {
    type: Number,
    min: [0, "Exam score cannot be less than 0"],
    max: [60, "Exam score cannot exceed 60"],
    default: 0,
  },
  total: {
    type: Number,
    min: 0,
    max: 100,
    default: function () {
      return this.assessmentScore + this.examScore;
    },
  },
  grade: {
    type: String,
    default: function () {
      const total = this.total;
      if (total >= 70) return "A";
      if (total >= 60) return "B";
      if (total >= 50) return "C";
      if (total >= 45) return "D";
      if (total >= 40) return "E";
      return "F";
    },
  },
});

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: [true, "Student profile is required"],
    },
    academicYear: {
      type: String,
      required: [true, "Academic year is required"],
      trim: true,
    },
    term: {
      type: String,
      required: [true, "Term is required"],
      enum: terms,
    },
    class: {
      type: String,
      required: [true, "Class is required"],
      enum: ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"],
    },
    subjects: {
      english: {
        type: subjectSchema,
        required: [true, "English scores are required"],
      },
      mathematics: {
        type: subjectSchema,
        required: [true, "Mathematics scores are required"],
      },
      biology: subjectSchema,
      chemistry: subjectSchema,
      physics: subjectSchema,
      agriculture: subjectSchema,
      history: subjectSchema,
      marketing: subjectSchema,
    },
    totalScore: {
      type: Number,
      default: function () {
        let total = 0;
        let count = 0;
        for (const subject in this.subjects) {
          if (this.subjects[subject].total) {
            total += this.subjects[subject].total;
            count++;
          }
        }
        return count ? total : 0;
      },
    },
    average: {
      type: Number,
      default: function () {
        let total = 0;
        let count = 0;
        for (const subject in this.subjects) {
          if (this.subjects[subject].total) {
            total += this.subjects[subject].total;
            count++;
          }
        }
        return count ? (total / count).toFixed(2) : 0;
      },
    },
    position: {
      type: Number,
    },
    teacherComment: {
      type: String,
      trim: true,
    },
    principalComment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Add indexes for better query performance
resultSchema.index({ student: 1, academicYear: 1, term: 1 }, { unique: true });

const Result = mongoose.models.Result || mongoose.model("Result", resultSchema);

export default Result;
