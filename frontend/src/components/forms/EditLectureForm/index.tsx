import { mixed, number, object, string } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  getData,
  postDataWithJWT,
  updateData,
} from "../../../services/axios.service";

import { successToast } from "../../../services/toastify.service";
import { useNavigate } from "react-router-dom";
import { getJWTToken } from "../../../utils/helper";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LectureEditForm = () => {
  const [lecture, setLecture] = useState<any>({});
  const [removeVideo, setRemoveVideo] = useState<boolean>(true);
  const navigate = useNavigate();
  const token = getJWTToken();
  let { id } = useParams();

  const lectureValidationSchema = object().shape({
    title: string().required("Title is required"),
    content: string().required("Content is required"),
    duration: number().required("Duration is required"),
    file: mixed().notRequired(),
  });

  const getLecture = async () => {
    const resp = await getData(`lectures/${id}`, token);
    if (resp.status) {
      setLecture(resp);
    }
  };

  useEffect(() => {
    getLecture();
  }, []);

  const initialValues = {
    title: lecture.title,
    content: lecture.content,
    duration: lecture.duration,
    file: null,
  };

  // console.log(initialValues);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const { file } = values;
      const isVideoEdited: boolean = file !== null;
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("duration", values.duration);
      formData.append("isVideoEdited", isVideoEdited);
      if (isVideoEdited) {
        formData.append("video", file);
      }

      const response = await updateData(`lectures/${id}`, formData, token);
      if (response.status) {
        successToast(response.message);
        navigate("/lecture");
      }
      // //write all logics above here
      // setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveVideo = (setFieldValue: any) => {
    setRemoveVideo(false);
    setFieldValue("file", null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Lecture</h2>
      {lecture.status && (
        <Formik
          initialValues={{
            title: lecture.data.title,
            content: lecture.data.content,
            duration: lecture.data.duration,
            file: null,
            isVideoEdited: false,
          }}
          validationSchema={lectureValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }: any) => {
            return (
              <Form>
                <div className="mb-4">
                  <label htmlFor="title" className="block mb-2">
                    Title
                  </label>
                  <Field
                    type="text"
                    id="title"
                    value={values.title}
                    name="title"
                    className="w-full border px-4 py-2"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block mb-2">
                    Content
                  </label>
                  <Field
                    type="textarea"
                    id="content"
                    value={values.content}
                    name="content"
                    className="w-full border px-4 py-2"
                  />
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="duration" className="block mb-2">
                    Duration
                  </label>
                  <Field
                    type="number"
                    id="duration"
                    value={values.duration}
                    name="duration"
                    className="w-full border px-4 py-2"
                  />
                  <ErrorMessage
                    name="duration"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>

                {removeVideo ? (
                  <>
                    <div className="mb-4">
                      <label htmlFor="file" className="block mb-2">
                        Current Video
                      </label>
                      <video
                        src={lecture.lectureUrl}
                        width="100"
                        height="100"
                        controls
                      ></video>
                      <button
                        type="button"
                        className="bg-red-500 text-white mt-2 rounded-md py-1 px-1"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveVideo(setFieldValue);
                        }}
                      >
                        Remove Video
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label htmlFor="file" className="block mb-2">
                        Choose new file
                      </label>
                      <input
                        type="file"
                        id="file"
                        name="file"
                        className="w-full"
                        onChange={(e: any) => {
                          setFieldValue("file", e.currentTarget.files[0]);
                        }}
                      />
                      <ErrorMessage
                        name="file"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4"
                >
                  {isSubmitting ? "Editing..." : "Edit Lecture"}
                </button>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

export default LectureEditForm;
