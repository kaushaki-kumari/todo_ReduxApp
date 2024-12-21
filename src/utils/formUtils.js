import moment from "moment";

export const validateTodoData = (data) => {
  const validationErrors = {};

  if (!data.title.trim()) {
    validationErrors.title = "Todo title is required.";
  }

  if (!data.alarmTime) {
    validationErrors.alarmTime = "Alarm time is required.";
  } else {
    const currentDateTime = moment();
    const selectedTime = moment(data.alarmTime);

    if (selectedTime.isBefore(currentDateTime)) {
      validationErrors.alarmTime = "Alarm time cannot be in the past.";
    }

    if (!data.alarmTime.includes("T") || data.alarmTime.split("T")[1] === "") {
      validationErrors.alarmTime = "Please select both date and time.";
    }

    if (selectedTime.year() > 2025) {
      validationErrors.alarmTime = "Alarm time cannot exceed the year 2025.";
    }
  }

  return validationErrors;
};
