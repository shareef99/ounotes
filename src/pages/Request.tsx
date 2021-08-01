import { FC, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";
import { getSubjects, sendEmail } from "../helpers";
import BackToHome from "../components/BackToHome";
import { Login } from "../components/login";

interface Props {}

interface FormType {
    sem: string;
    group: string;
    type: string;
    subject: string;
}

const requestSchema = Yup.object({
    sem: Yup.string()
        .not(["sem"], "Select Sem")
        .required("Sem is not selected"),
    group: Yup.string()
        .not(["group"], "Select Group")
        .required("Group is not selected"),
    type: Yup.string()
        .not(["type"], "Select type of notes")
        .required("Select type of notes"),
    subject: Yup.string()
        .not(
            ["subjects, Subjects, subject, Subject"],
            "Subject is not selected"
        )
        .required("Select Subject"),
});

export const Request: FC<Props> = () => {
    const initialValues: FormType = {
        sem: "",
        group: "",
        type: "",
        subject: "",
    };

    const [message, setMessage] = useState<string>("");
    const { user } = useAuth();

    if (!user) {
        return (
            <>
                <Navbar />
                <section className="w-full h-screen colCenter bg-whiteShade text-lightBlack -mt-16">
                    <div>
                        <Login requestNotes={true} />
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <section
                id="popup"
                className="w-full h-screen colCenter bg-whiteShade text-lightBlack -mt-16"
            >
                <div className="border-2 rounded-lg shadow-2xl px-10 py-8 mx-auto w-72 colCenter space-y-4">
                    <h3 className="font-semibold text-lg">Select Details</h3>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={requestSchema}
                        onSubmit={(
                            data: FormType,
                            {
                                resetForm,
                                setSubmitting,
                            }: FormikHelpers<FormType>
                        ) => {
                            const { sem, group, type, subject } = data;
                            const emailParams = {
                                name: user.name,
                                email: user.email,
                                group,
                                sem,
                                type,
                                subject,
                            };
                            setSubmitting(true);
                            sendEmail(emailParams).then((data) => {
                                setSubmitting(false);
                                setMessage(data);
                                resetForm();
                            });
                        }}
                    >
                        {({ values, isSubmitting, errors, touched }) => (
                            <Form className="colCenter flex-wrap w-full space-y-2">
                                <Field
                                    name="sem"
                                    as="select"
                                    className="select"
                                >
                                    <option value="sem">Sem</option>
                                    <option value="first">Ist</option>
                                    <option value="second">IInd</option>
                                    <option value="third">IIIrd</option>
                                    <option value="forth">IVth</option>
                                </Field>
                                <Field
                                    name="group"
                                    as="select"
                                    className="select"
                                >
                                    <option value="group">Group</option>
                                    <option value="CSE">CSE</option>
                                    <option value="IT">IT</option>
                                    <option value="ECE">ECE</option>
                                    <option value="ME">ME</option>
                                    <option value="CE">CE</option>
                                    <option value="EEE">EEE</option>{" "}
                                </Field>
                                <Field
                                    name="type"
                                    as="select"
                                    className="select"
                                >
                                    <option value="type">Type</option>
                                    <option value="notes">Notes</option>
                                    <option value="important questions">
                                        Important Questions
                                    </option>
                                    <option value="syllabus">Syllabus</option>
                                    <option value="question paper">
                                        Question Paper
                                    </option>
                                </Field>
                                <Field
                                    name="subject"
                                    as="select"
                                    className="select"
                                >
                                    <option className="box-content max-w-full w-full">
                                        Subjects
                                    </option>
                                    {getSubjects(values.group, values.sem)?.map(
                                        (subject) => (
                                            <option
                                                value={subject}
                                                key={subject}
                                                className="w-full max-w-full box-content"
                                            >
                                                {subject}
                                            </option>
                                        )
                                    )}
                                </Field>
                                <div className="text-center">
                                    {message && (
                                        <p className="box-content max-w-full w-full text-green-500">
                                            {message}
                                            <br />
                                        </p>
                                    )}
                                    {touched.sem && errors.sem && (
                                        <p className="box-content max-w-full w-full text-red-500">
                                            {errors.sem}
                                        </p>
                                    )}
                                    {touched.group && errors.group && (
                                        <p className="box-content max-w-full w-full text-red-500">
                                            {errors.group}
                                        </p>
                                    )}
                                    {touched.type && errors.type && (
                                        <p className="box-content max-w-full w-full text-red-500">
                                            {errors.type}
                                        </p>
                                    )}
                                    {touched.subject && errors.subject && (
                                        <p className="box-content max-w-full w-full text-red-500">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>
                                <label
                                    htmlFor="request-notes"
                                    className="pt-4 w-full"
                                >
                                    <span className="uploadPageBtn">
                                        Request Note
                                    </span>
                                    <input
                                        id="request-notes"
                                        name="request-notes"
                                        type="submit"
                                        className="opacity-0 w-0 h-0 absolute "
                                        disabled={isSubmitting}
                                    />
                                </label>
                            </Form>
                        )}
                    </Formik>
                    <BackToHome />
                </div>
            </section>
        </>
    );
};
