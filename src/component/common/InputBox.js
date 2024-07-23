import className from "classnames";

function InputBox({
  formText,
  searchText,
  queryText,
  checkBox,
  radioForm,
  smallText,
  fileForm,
  ...rest
}) {
  const classes = className(rest.className, "shadow-sm border rounded-md", {
    // "shadow appearance-none border rounded md:w-1/4 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400": textBox,
    "text-sm leading-5 py-2.5 px-6 placeholder-gray-400 text-gray-700 form_input_style":
      formText,
    "text-sm leading-5 py-2 px-2 placeholder-gray-600 text-gray-800":
      searchText,
    "text-sm leading-7 border-gray-200 p-2 placeholder-gray-400 text-gray-700 focus:outline-none focus:border-blue-300 focus:ring-0":
      queryText,
    "border-gray-200 cursor-pointer focus:ring-0 checked:bg-sky-500 checked:hover:bg-sky-500 checked:focus:bg-sky-500":
      checkBox,
    "rounded-xl border-sky-500 cursor-pointer focus:ring-0 checked:bg-sky-500 checked:hover:bg-sky-500 checked:focus:bg-sky-500":
      radioForm,
    "text-sm leading-1 border-gray-200 py-1 px-2 placeholder-gray-400 text-gray-700 focus:outline-none focus:border-blue-300 focus:ring-0":
      smallText,
    "": fileForm,
  });

  return <input {...rest} className={classes} />;
}

export default InputBox;
