const Spinner = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div
        className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: "#e0e0e0", borderTopColor: "#111" }}
      />
    </div>
  );
};

export default Spinner;