import Task from "./Task";
import { useSelector } from "react-redux";

const MaintainenceTaskList = ({ type, title, onEdit, onEditMobile }) => {
  const propertyId = useSelector((state) => {
    return String(state.client.data.id);
  });

  const draftId = useSelector((state) => {
    return String(state.clientForm.form.id);
  });

  const data = useSelector((state) => {
    if (!draftId) {
      if (type === "add") {
        return state.client.candidateMaintenanceTask;
      } else {
        return state.propertiesMainTasks.data[propertyId];
      }
    } else {
      if (type === "add") {
        return state.clientForm.form.candidateMaintenanceTask;
      } else {
        if (state.clientForm.form.propertiesMainTasks) {
          return state.clientForm.form.propertiesMainTasks[draftId];
        }
      }
    }
  });

  const onTaskEdit = (alert) => {
    onEdit(alert);
  };

  const onTaskEditMobile = (alert) => {
    onEditMobile(alert);
  };

  return (
    <div className="flex flex-col sm:w-1/2 sm:mr-3 sm:ml-3 mr-2 ml-2 my-3 rounded maintenance_box overflow-auto">
      <div className="flex flex-row font-bold items-center justify-center m-2 text-lg">
        {title}
      </div>
      {data &&
        data.map((items, i) => {
          if (
            !items.hasOwnProperty("status") ||
            (items.hasOwnProperty("status") && items.status === "pending")
          ) {
            return (
              <Task
                type={type}
                key={items.id}
                item={items}
                onTaskEdit={onTaskEdit}
                onTaskEditMobile={onTaskEditMobile}
              />
            );
          }
        })}
    </div>

    // <div className="col-sm-5 add_task">
    //   <h5>{title}</h5>
    //   <ul>
    //     {data &&
    //       data.map((items, i) => {
    //         if (
    //           !items.hasOwnProperty("status") ||
    //           (items.hasOwnProperty("status") && items.status == "pending")
    //         ) {
    //           return (
    //             <Task
    //               type={type}
    //               key={items.id}
    //               item={items}
    //               onTaskEdit={onTaskEdit}
    //             />
    //           );
    //         }
    //       })}
    //   </ul>
    // </div>
  );
};

export default MaintainenceTaskList;
