import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteData, getData } from "../../services/axios.service";
import { getJWTToken } from "../../utils/helper";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { errorToast, successToast } from "../../services/toastify.service";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const token = getJWTToken();

  const getLectureData = async () => {
    const response = await getData("lectures", token);

    if (response.status) {
      setLectures(response.data);
    }
  };

  useEffect(() => {
    getLectureData();
  }, []);

  const editLecture = (id: any) => {
    navigate(`/lecture/${id}`);
  };

  const deleteLecture = async (id: any) => {
    const response = await deleteData(`lectures/${id}`, token);

    if (response.status) {
      const data = lectures.filter((lec: any) => {
        return lec._id !== id;
      });
      setLectures(data);
      successToast(response.message);
    } else {
      errorToast(response.data.message);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" gutterBottom>
        Lectures
        <Button
          variant="contained"
          className="mb-4"
          onClick={(e) => navigate("/lecture/add")}
        >
          Add lecture
        </Button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lectures.map((lecture: any) => {
            return (
              <Card key={lecture._id} className="bg-white shadow-lg">
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="h6">{lecture.title}</Typography>
                    <div>
                      <IconButton color="primary" className="mr-2">
                        <EditIcon onClick={() => editLecture(lecture._id)} />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => deleteLecture(lecture._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                  <Typography variant="subtitle1">
                    Duration: {lecture.duration} weeks
                  </Typography>
                  <Typography variant="body1" className="mb-4">
                    {lecture.content.length > 15
                      ? lecture.content.slice(0, 15) + "..."
                      : lecture.content}
                  </Typography>
                  <div className="aspect-w-16">
                    <video controls className="object-cover w-full h-full">
                      <source src={lecture.lectureUrl}></source>
                    </video>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Typography>
    </div>
  );
};

export default Lectures;
