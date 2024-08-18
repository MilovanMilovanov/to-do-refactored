import Main from "../../components/templates/main/Main";
import TaskList from "../../components/organisms/task-list/TaskList";
import PageNav from "../../components/organisms/page-nav/PageNav";

import styles from "./TasksPage.module.scss";

function TasksPage() {
  return (
    <>
      <PageNav />
      <Main className={styles.tasksPageLayout}>
        <TaskList />
      </Main>
    </>
  );
}

export default TasksPage;
