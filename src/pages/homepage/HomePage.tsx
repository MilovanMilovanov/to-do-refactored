import Main from "../../components/templates/main/Main";
import PageNav from "../../components/organisms/page-nav/PageNav";
import UsersList from "../../components/organisms/users-list/UserList";
import styles from "./Homepage.module.scss";

function Homepage() {
  return (
    <>
      <PageNav />
      <Main className={styles.homepageLayout}>
        <UsersList />
      </Main>
    </>
  );
}

export default Homepage;
