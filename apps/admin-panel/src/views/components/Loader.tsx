import LoaderSpinner from "@icons/Loader";

export default function Loader() {
  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      <LoaderSpinner />
    </div>
  );
}
