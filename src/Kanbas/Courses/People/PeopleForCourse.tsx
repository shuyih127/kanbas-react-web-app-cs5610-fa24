import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import * as coursesClient from "../client";


export default function CoursePeople() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsersForCourse = async () => {
    const users = await coursesClient.findUsersForCourse(cid as string)
    setUsers(users)
    };

  useEffect(() => {
    fetchUsersForCourse();
  }, [cid]);

  return (
    <div>
      <PeopleTable users={users.filter((user) => user)} />
    </div>
  );
}