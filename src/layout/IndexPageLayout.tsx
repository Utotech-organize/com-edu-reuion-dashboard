interface IndexPageLayoutProps {
  children?: any;
}

export const IndexPageLayout: React.FC<IndexPageLayoutProps> = (
  props: IndexPageLayoutProps
) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {props.children}
    </div>
  );
};
