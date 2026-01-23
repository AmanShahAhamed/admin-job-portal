import { ICreateCategory, IUpdateCategory } from "@/services/job-category";
import { CustomModal } from "../../ui/model";
import { CustomForm } from "../../ui/fom";
import z from "zod";

interface IProps {
  mutation: (payload: ICreateCategory | IUpdateCategory) => void;
  btnLabel: string;
  show: boolean;
  setShow: (val: boolean) => void;
  clearState: () => void;
  init?: IUpdateCategory;
  name: string;
}

export const MutationModal: React.FC<IProps> = ({
  mutation,
  btnLabel,
  show,
  setShow,
  clearState,
  init,
  name,
}) => {
  return (
    <CustomModal
      open={show}
      onClose={() => {
        setShow(false);
        clearState();
      }}
      header={"Add " + name}
      footer={undefined}
    >
      <CustomForm
        formFields={[
          {
            label: "Name",
            name: "name",
            defaultValue: init?.name ?? "",
            placeholder: `Enter ${name} Name`,
            validation: z.string().min(1, "Name is required"),
          },
        ]}
        submitButtonLabel={btnLabel}
        onSubmit={(val) => {
          mutation({
            ...val,
            ...((init?.id && { id: init.id }) as
              | ICreateCategory
              | IUpdateCategory),
          });
          setShow(false);
        }}
      />
    </CustomModal>
  );
};
