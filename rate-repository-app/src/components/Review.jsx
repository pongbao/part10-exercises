import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

import { useSingleView } from "../contexts/SingleViewContext";
import { CREATE_REVIEW } from "../graphql/queries";

const styles = StyleSheet.create({
  formButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 10,
  },
  form: {
    paddingHorizontal: 14,
    paddingTop: 4,
  },
  text: {
    textAlign: "center",
    padding: 17,
  },
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput
        name="repositoryOwner"
        placeholder="Repository owner name"
      />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput
        name="repositoryRating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        name="repositoryReview"
        placeholder="Review"
        multiline={true}
      />
      <Pressable style={styles.formButton} onPress={onSubmit}>
        <Text color={"textWhite"} fontSize={"subheading"} style={styles.text}>
          Submit review
        </Text>
      </Pressable>
    </View>
  );
};

yup.setLocale({
  number: {
    min: "Rating should be greater than or equal to 0",
    max: "Rating should be less than or equal 100",
  },
});

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  repositoryRating: yup.number().min(0).max(100).required("Rating is required"),
});

const Review = () => {
  const initialValues = {
    repositoryOwner: "",
    repositoryName: "",
    repositoryRating: "",
    repositoryReview: "",
  };

  const navigate = useNavigate();
  const [singleView, setSingleView] = useSingleView();
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error);
      // console.log(error.graphQLErrors[0].message);
    },
  });

  const onSubmit = async (values) => {
    const {
      repositoryOwner,
      repositoryName,
      repositoryRating,
      repositoryReview,
    } = values;

    try {
      const returnedRepository = await mutate({
        variables: {
          ownerName: repositoryOwner,
          rating: Number(repositoryRating),
          repositoryName: repositoryName,
          text: repositoryReview,
        },
      });
      setSingleView(true);
      navigate(`/${returnedRepository.data.createReview.repository.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default Review;
