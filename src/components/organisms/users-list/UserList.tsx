import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { UserModel } from "../../../features/user-management/userSlice";
import Accordion from "../accordion/Accordion";
import User from "../user/User";
import Scrollable from "../../shared/scrollable/Scrollable";

import styles from "./UsersList.module.scss";

function UsersList() {
  const users = useSelector((state: RootState) => state.userManagement);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const handleToggleCollapse = (id: string) => {
    setExpandedUserId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Scrollable>
      <ul className={styles.userList}
      >
        {users.map((user: UserModel) => (
          <Accordion
            key={user.id}
            title={user.username}
            isCollapsed={expandedUserId !== user.id}
            id={user.id}
            toggleElement={handleToggleCollapse}
          >
            <User {...user}></User>
          </Accordion>
        ))}
      </ul>
    </Scrollable>
  );
}

export default UsersList;
