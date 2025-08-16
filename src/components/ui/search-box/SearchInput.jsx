import { Field, Form, Formik } from "formik";

import { Search } from "lucide-react";
import FormInput from "../form-input/FormInput";

const SearchInput = () => {
  // const { setSearchQuery } = useContext(AllContext);
  const initialValues = { query: "" };

  return (
    <div className="max-w-4xl md:w-4/5 rounded-lg bg-white py-2 px-5 shadow-lg ">
      <Formik initialValues={initialValues}>
        {({ handleChange }) => (
          <Form className="flex items-center justify-center">
            <Search className="h-5 w-5 text-gray-400" />
            <Field name="query">
              {({ field }) => (
                <FormInput
                  type="text"
                  placeholder="Search events, venues, or locations..."
                  inputStyle="border-0 focus:ring-0 focus:border-none text-sm text-gray-900 shadow-none"
                  {...field}
                  onChange={(e) => {
                    handleChange(e);
                    // setSearchQuery(e.target.value);
                  }}
                />
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchInput;
