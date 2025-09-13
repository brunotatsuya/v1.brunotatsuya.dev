type SubmitButtonProps = {
  isLoading: boolean;
};

export default function SubmitButton({ isLoading }: SubmitButtonProps) {
  if (isLoading) {
    return (
      <button className="btn btn-primary mt-4" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    );
  }

  return (
    <button type="submit" className="btn btn-primary mt-4">
      sign in
    </button>
  );
}
