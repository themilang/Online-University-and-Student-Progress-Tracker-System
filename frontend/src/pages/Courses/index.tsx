import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJWTToken } from "../../utils/helper";
import { deleteData, getData } from "../../services/axios.service";
import { successToast } from "../../services/toastify.service";
import { useDispatch, useSelector } from "react-redux";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any>([]);
  const { role } = useSelector((state: any) => state.auth);
  const dipatch = useDispatch();

  const token = getJWTToken();

  async function getCourse() {
    const response = await getData("courses", token);

    if (response.status) {
      setCourses(response.data);
    }
  }

  const handleDelete = async (e: any, id: any) => {
    const resp = await deleteData(`courses/${id}`, token);

    if (resp.status) {
      const filteredCourse = courses.filter((course: any) => {
        return course._id !== id;
      });
      setCourses(filteredCourse);
      successToast(resp.message);
    }
  };

  

  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div>
      {role === "admin"  && (
        <Button
          variant="contained"
          className="mb-2"
          onClick={(e) => navigate("/courses/add")}
        >
          Create Course
        </Button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.length > 0 &&
          courses.map((course: any) => {
            return (
              <Card key={course._id} className="flex flex-col h-full">
                <CardContent className="flex-grow">
                  <Typography variant="h5" component="h2" className="mb-2">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color={"textSecondary"}>
                    {course.description}
                  </Typography>
                  <div className="mt-auto">
                    <Typography variant="body2" color={"textSecondary"}>
                      Instructor: {course.instructorId.email}
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Price: {course.price}
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Duration: {course.duration} weeks
                    </Typography>
                    {role === "admin" && (
                      <Button variant="contained" className="me-2">
                        Edit
                      </Button>
                    )}
                    {role === "admin" && (
                      <Button
                        variant="outlined"
                        onClick={(e) => handleDelete(e, course._id)}
                      >
                        Delete
                      </Button>
                    )}
                    {role === "student" && (
                      <Button
                        variant="text"
                        // onClick={(e) => handleAddToCart(course)}
                      >
                        Add to cart
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Courses;
