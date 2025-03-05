const ResetPasswordForm = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onChangePassword,
  error,
  setError,
}) => {
  return (
    <form className="flex flex-col gap-1 w-fit bg-blue-500 p-2">
      <label htmlFor="old" className="text-white">
        Old password:
      </label>
      <input
        type="password"
        id="old"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <label htmlFor="new" className="text-white">
        New password
      </label>
      <input
        type="password"
        id="new"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <label htmlFor="confirm" className="text-white">
        Confirm New password
      </label>
      <input
        type="password"
        id="confirm"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        type="submit"
        className="text-white p-2 bg-gray-600"
        onClick={onChangePassword}
      >
        Change password
      </button>
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
};

export default ResetPasswordForm;
