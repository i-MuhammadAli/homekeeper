import { Tooltip } from "react-tooltip";

function ToolTip({ id }) {
  return (
    <Tooltip
      id={id}
      style={{
        backgroundColor: "black",
        color: "#fff",
        fontSize: "70%",
        // borderRadius: "10%",
        padding: "6px",
      }}
    />
  );
}

export default ToolTip;
