import className from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateInput({ form, search, ...rest }) {
  const classes = className(rest.className, "shadow appearance-none rounded ", {
    // className="shadow appearance-none border w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
    "text-sm leading-7 w-full py-2.5 px-4 border-gray-200 placeholder-gray-400 text-gray-700 focus:outline-none focus:border-blue-300 focus:ring-0":
      form,
    "w-48 p-2 text-xs leading-5 border-gray-200 placeholder-gray-400 text-gray-700 focus:outline-none focus:border-blue-300 focus:ring-0":
      search,
  });

  return <DatePicker {...rest} className={classes} />;
}

export default DateInput;
