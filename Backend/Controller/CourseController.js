let CourseController = {
    async  getAllCourses  (req, res){
            let Data = [
                {id:1, name:"course1"},
                {id:2, name:"course2"},
                {id:3, name:"course3"},
            ]
            res.status(200).json(Data)
        }
    }

  
  export default CourseController;
  