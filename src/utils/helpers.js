export const formatPhoneNumber = (input) => {
  const numericInput = input.replace(/[^\d]/g, "");

  if (numericInput.length === 0) return "";
  if (numericInput.length > 10) {
    return input;
  }

  let formattedNumber = "";
  for (let i = 0; i < numericInput.length; i++) {
    if (i === 3 || i === 6) {
      formattedNumber += "-";
    }
    formattedNumber += numericInput[i];
  }

  return formattedNumber;
};

export const formatDate = (date) => {
  // Get the day and month from the date object
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // Get month name

  // Pad the day with leading zero if it's a single digit
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${formattedDay} ${month}`;
};

export const formatPrice = (input) => {
  const formattedInput = String(input).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$" + formattedInput;
};

export const getext = (fileName) => {
  var ext = fileName.substr(fileName.lastIndexOf(".") + 1);
  return ext;
};

export const localeDateString = (date) => {
  // console.log(typeof date);
  // console.log(date);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Add leading zero if needed
  // console.log(date.getUTCDate());
  const day = date.getUTCDate().toString().padStart(2, "0"); // Add leading zero if needed
  const year = date.getUTCFullYear();

  const formattedDate = `${month}/${day}/${year}`;

  // console.log(formattedDate); // Output will be in MM/DD/YYYY format
  return formattedDate;
};

export const formatDateToYYYYMMDD = (date) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const changeDateFormat = (date) => {
  // change format from dd-mm-yyyy to mm-dd-yyyy
  var newDate = date.split("/");
  return [newDate[1], newDate[0], newDate[2]].join("/");
};

export const sortByDate = (dateStringField) => (a, b) => {
  let dateA = new Date(a[dateStringField]);
  dateA = isNaN(dateA.valueOf())
    ? new Date(changeDateFormat(a[dateStringField]))
    : dateA;
  let dateB = new Date(b[dateStringField]);
  dateB = isNaN(dateB.valueOf())
    ? new Date(changeDateFormat(b[dateStringField]))
    : dateB;
  console.log(a[dateStringField], b[dateStringField]);
  console.log(dateA, dateB);
  console.log(dateA < dateB);
  if (dateA < dateB) {
    return -1; // dateA comes before dateB
  } else if (dateA > dateB) {
    return 1; // dateA comes after dateB
  } else {
    return 0; // dateA and dateB are the same
  }
};

export const ifStrongPassword = (password) => {
  var passwordpattern = /^\w[a-zA-Z0-9.]*$/;

  if (passwordpattern.test(password)) {
    return false;
  } else {
    if (/[A-Z]/g.test(password) == false) {
      return false;
    } else {
      if (/\d/g.test(password) == false) {
        return false;
      } else {
        return true;
      }
    }
  }
};

export const updateNullValues = (obj) => {
  for (let key in obj) {
    if (obj[key] === null) {
      obj[key] = "";
    } else if (typeof obj[key] === "object") {
      updateNullValues(obj[key]); // Recursively call the function for nested objects
      return obj;
    }
  }
  return obj;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
};
