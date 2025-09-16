type LoginAlertProps = {
  message: string;
};

export default function LoginAlert({ message }: LoginAlertProps) {
  return (
    <div className="alert alert-danger mt-4" role="alert">
      {message}
    </div>
  );
}
