interface IAppContainerProps {
  children: React.ReactNode;
  title: string;
}
export const AppContainer: React.FC<IAppContainerProps> = ({
  title,
  children,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-end md:items-end justify-between mb-6">
        <div>
          <h1 className="text-[#0E0F11] text-[28px] leading-none font-semibold">
            {title}
          </h1>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
