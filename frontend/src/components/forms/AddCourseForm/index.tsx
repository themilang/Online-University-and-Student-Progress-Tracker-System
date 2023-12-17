import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { postDataWithJWT } from "../../../services/axios.service";
import { getJWTToken } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../../services/toastify.service";

const steps = ["Course Details", "Sections and Lectures"];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  duration: Yup.string().required("Duration is required"),
  sections: Yup.array().of(
    Yup.object({
      title: Yup.string().required("Section title is required"),
      lectures: Yup.array().of(
        Yup.object({
          title: Yup.string().required("Lecture title is required"),
          content: Yup.string().required("Lecture content is required"),
          duration: Yup.string().required("Lecture duration is required"),
          file: Yup.mixed().required("Lecture file is required"),
        })
      ),
    })
  ),
});

const initialValues: any = {
  title: "",
  description: "",
  price: "",
  duration: "",
  sections: [
    {
      title: "",
      lectures: [
        {
          title: "",
          content: "",
          duration: "",
          file: null,
        },
      ],
    },
  ],
};

const AddCourseForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const navigate = useNavigate();

  const token = getJWTToken();
  const handleFormSubmit = async (values: any) => {
    try {
      // Perform API call to submit the form data
      const formdata = new FormData();
      formdata.append("title", values.title);
      formdata.append("description", values.description);
      formdata.append("price", values.price);
      formdata.append("duration", values.duration);

      values.sections.forEach((section: any, sectionIndex: number) => {
        formdata.append(`sections[${sectionIndex}][title]`, section.title);
        section.lectures.forEach((lecture: any, lectureIndex: number) => {
          formdata.append(
            `sections[${sectionIndex}][lectures][${lectureIndex}][title]`,
            lecture.title
          );
          formdata.append(
            `sections[${sectionIndex}][lectures][${lectureIndex}][content]`,
            lecture.content
          );
          formdata.append(
            `sections[${sectionIndex}][lectures][${lectureIndex}][duration]`,
            lecture.duration
          );
          formdata.append(`photo`, lecture.file);
        });
      });

      const response = await postDataWithJWT("courses", formdata, token);

      if (response.status) {
        navigate("/courses");
        successToast(response.message);
      }
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, setFieldValue }: any) => (
          <Form className="w-full max-w-lg mx-auto">
            {/* Step 1: Course Details */}

            {activeStep === 0 && (
              <div>
                <div className="mb-4">
                  <label className="block mb-2" htmlFor="title">
                    Title
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className={`w-full border ${
                      errors.title && touched.title ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2" htmlFor="description">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className={`w-full border ${
                      errors.description && touched.description
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2" htmlFor="price">
                    Price
                  </label>
                  <Field
                    type="text"
                    id="price"
                    name="price"
                    className={`w-full border ${
                      errors.price && touched.price ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2" htmlFor="duration">
                    Duration
                  </label>
                  <Field
                    type="text"
                    id="duration"
                    name="duration"
                    className={`w-full border ${
                      errors.duration && touched.duration
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="duration"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Sections and Lectures */}
            {activeStep === 1 &&
              values.sections.map((section: any, sectionIndex: any) => (
                <div key={sectionIndex} className="mb-6">
                  <div className="mb-4">
                    <label
                      className="block mb-2"
                      htmlFor={`sections[${sectionIndex}].title`}
                    >
                      Section Title
                    </label>
                    <Field
                      type="text"
                      id={`sections[${sectionIndex}].title`}
                      name={`sections[${sectionIndex}].title`}
                      className={`w-full border ${
                        errors.sections?.[sectionIndex]?.title &&
                        touched.sections?.[sectionIndex]?.title
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name={`sections[${sectionIndex}].title`}
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <FieldArray name={`sections[${sectionIndex}].lectures`}>
                    {({ push: addLecture, remove: removeLecture }) => (
                      <div>
                        {section.lectures.map(
                          (lecture: any, lectureIndex: any) => (
                            <div key={lectureIndex} className="mb-4">
                              <div className="mb-2">
                                <label
                                  className="block mb-2"
                                  htmlFor={`sections[${sectionIndex}].lectures[${lectureIndex}].title`}
                                >
                                  Lecture Title
                                </label>
                                <Field
                                  type="text"
                                  id={`sections[${sectionIndex}].lectures[${lectureIndex}].title`}
                                  name={`sections[${sectionIndex}].lectures[${lectureIndex}].title`}
                                  className={`w-full border ${
                                    errors.sections?.[sectionIndex]?.lectures?.[
                                      lectureIndex
                                    ]?.title &&
                                    touched.sections?.[sectionIndex]
                                      ?.lectures?.[lectureIndex]?.title
                                      ? "border-red-500"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name={`sections[${sectionIndex}].lectures[${lectureIndex}].title`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>

                              <div className="mb-2">
                                <label
                                  className="block mb-2"
                                  htmlFor={`sections[${sectionIndex}].lectures[${lectureIndex}].content`}
                                >
                                  Lecture Content
                                </label>
                                <Field
                                  as="textarea"
                                  id={`sections[${sectionIndex}].lectures[${lectureIndex}].content`}
                                  name={`sections[${sectionIndex}].lectures[${lectureIndex}].content`}
                                  className={`w-full border ${
                                    errors.sections?.[sectionIndex]?.lectures?.[
                                      lectureIndex
                                    ]?.content &&
                                    touched.sections?.[sectionIndex]
                                      ?.lectures?.[lectureIndex]?.content
                                      ? "border-red-500"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name={`sections[${sectionIndex}].lectures[${lectureIndex}].content`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>

                              <div className="mb-2">
                                <label
                                  className="block mb-2"
                                  htmlFor={`sections[${sectionIndex}].lectures[${lectureIndex}].duration`}
                                >
                                  Lecture Duration
                                </label>
                                <Field
                                  type="text"
                                  id={`sections[${sectionIndex}].lectures[${lectureIndex}].duration`}
                                  name={`sections[${sectionIndex}].lectures[${lectureIndex}].duration`}
                                  className={`w-full border ${
                                    errors.sections?.[sectionIndex]?.lectures?.[
                                      lectureIndex
                                    ]?.duration &&
                                    touched.sections?.[sectionIndex]
                                      ?.lectures?.[lectureIndex]?.duration
                                      ? "border-red-500"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name={`sections[${sectionIndex}].lectures[${lectureIndex}].duration`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>

                              <div className="mb-2">
                                <label
                                  className="block mb-2"
                                  htmlFor={`sections[${sectionIndex}].lectures[${lectureIndex}].file`}
                                >
                                  Lecture File
                                </label>
                                <input
                                  type="file"
                                  id={`sections[${sectionIndex}].lectures[${lectureIndex}].file`}
                                  name={`sections[${sectionIndex}].lectures[${lectureIndex}].file`}
                                  className={`w-full border ${
                                    errors.sections?.[sectionIndex]?.lectures?.[
                                      lectureIndex
                                    ]?.file &&
                                    touched.sections?.[sectionIndex]
                                      ?.lectures?.[lectureIndex]?.file
                                      ? "border-red-500"
                                      : ""
                                  }`}
                                  onChange={(event: any) => {
                                    const file = event.target.files[0];
                                    setFieldValue(
                                      `sections[${sectionIndex}].lectures[${lectureIndex}].file`,
                                      file
                                    );
                                  }}
                                />
                                <ErrorMessage
                                  name={`sections[${sectionIndex}].lectures[${lectureIndex}].file`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>

                              {lectureIndex > 0 && (
                                <button
                                  type="button"
                                  onClick={() => removeLecture(lectureIndex)}
                                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                  Remove Lecture
                                </button>
                              )}
                            </div>
                          )
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            addLecture({
                              title: "",
                              content: "",
                              duration: "",
                              file: null,
                            })
                          }
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Add Lecture
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  {sectionIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSections = [...values.sections];
                        updatedSections.splice(sectionIndex, 1);
                        setFieldValue("sections", updatedSections);
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove Section
                    </button>
                  )}
                </div>
              ))}
            {activeStep === 1 && (
              <button
                type="button"
                onClick={() =>
                  setFieldValue("sections", [
                    ...values.sections,
                    {
                      title: "",
                      lectures: [
                        { title: "", content: "", duration: "", file: null },
                      ],
                    },
                  ])
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Section
              </button>
            )}

            <div className="mt-6">
              {activeStep > 0 && (
                <Button onClick={handlePreviousStep}>Previous</Button>
              )}
              {activeStep < steps.length - 1 && (
                <Button onClick={handleNextStep}>Next</Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCourseForm;
