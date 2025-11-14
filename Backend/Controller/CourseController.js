import Course from "../Models/CoursesModel.js";

let CourseController = {
async getAdminCourses (req, res)  {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {   
    console.error("Error fetching admin courses:", error.message);
    res.status(500).json({ message: "Server error" });
  }
},

  async getAllCourses(req, res) {
    try {
      let Data = await Course.find();
      res.status(200).json(Data);
    } catch (err) {
      res.status(500).json({ message: "internal server error", err });
      return;
    }
  },

  async getCoursesById(req, res) {
    try {
      let Data = await Course.findById(req.params.cid);
      if (!Data) {
        return res.status(404).json({ message: "Course Not Found." });
      }

      res.status(200).json(Data);
    } catch (err) {
      res.status(500).json({ message: "internal server error", err });
    }
  },
  async CreateCourses(req, res) {
    try {
      let Data = new Course({
        name: req.body.name,
        poster: req.body.poster,
        duration: req.body.duration,
        price: req.body.price,
        description: req.body.description,
      });
      let CourseCreate = await Data.save();
      res.status(201).json(CourseCreate);
    } catch (err) {
      res.status(500).json({ message: "internal server error", err });
    }
  },
  async UpdateCourses(req, res) {
    try {
      let Data = await Course.findByIdAndUpdate(req.params.id, { new: true });
      if (!Data) {
        return res.status(404).json({ Message: "Course not found" });
      }
      Data.name = req.body.name || Data.name;
      Data.poster = req.body.poster || Data.poster;
      Data.duration = req.body.duration || Data.duration;
      Data.price = req.body.price || Data.price;
      Data.description = req.body.description || Data.description;

      let updateCourse = await Data.save();
      res.status(200).json(updateCourse);
    } catch (err) {
      res.status(500).json({ message: "internal server error", err });
    }
  },
  async deleteCourses(req, res) {
    try {
      let Data = await Course.findByIdAndDelete(req.params.id);

      if (!Data) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.status(200).json({ message: "Course Deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "internal server error", err });
    }
  },
};
export default CourseController;
