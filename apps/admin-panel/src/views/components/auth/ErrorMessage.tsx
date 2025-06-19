const ErrorMessage = ({ error }: { error: string | undefined }) => (
  <span class="error-message">{error || ""}</span>
);

export default ErrorMessage;
