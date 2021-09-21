export default bertAlert = ({
  message,
  state = "success",
  icon = "fa fa-check",
}) => {
  const alertState = state === "success" ? "success" : "danger";
  return Bert.alert(message, alertState, "fixed-top", icon);
};
