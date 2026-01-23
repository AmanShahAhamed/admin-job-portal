"use client";
import {
  useStateCreate,
  useStateDelete,
  useStateList,
  useStateUpdate,
} from "../../../services/job-category";
import { AppContainer } from "../../ui/app-container";
import { JobCategory } from "../component/category";

const page = () => {
  const { mutate: createState } = useStateCreate();
  const { mutate: updateState } = useStateUpdate();
  const { mutate: deleteState } = useStateDelete();
  return (
    <AppContainer title={"States"}>
      <JobCategory
        name={"State"}
        useList={useStateList}
        createState={createState}
        updateState={updateState}
        deleteState={deleteState}
      />
    </AppContainer>
  );
};

export default page;
