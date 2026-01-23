"use client";
import {
  useEducationCreate,
  useEducationDelete,
  useEducationList,
  useEducationUpdate,
} from "../../../services/job-category";
import { AppContainer } from "../../ui/app-container";
import { JobCategory } from "../component/category";
const page = () => {
  const { mutate: createState } = useEducationCreate();
  const { mutate: updateState } = useEducationUpdate();
  const { mutate: deleteState } = useEducationDelete();
  return (
    <AppContainer title={"Education"}>
      <JobCategory
        name={"Education"}
        useList={useEducationList}
        createState={createState}
        updateState={updateState}
        deleteState={deleteState}
      />
    </AppContainer>
  );
};

export default page;
