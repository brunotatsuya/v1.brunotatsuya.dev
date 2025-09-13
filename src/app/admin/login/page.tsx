import LoginForm from "./components/login-form";

export default function LoginPage() {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      id="presentationCard"
    >
      <div className="bg-dark bg-opacity-25 px-4 pt-4 pb-4 border-075">
        <center>
          <img
            src="/images/favicon.ico"
            width={48}
            height={48}
            alt="Site favicon"
          />
        </center>
        <center>
          <h6 className="mx-2 pt-2 text-white">login admin</h6>
        </center>
        <LoginForm />
      </div>
    </div>
  );
}
