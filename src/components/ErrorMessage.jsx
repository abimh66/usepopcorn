/* eslint-disable react/prop-types */
function ErrorMessaage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

export default ErrorMessaage;
