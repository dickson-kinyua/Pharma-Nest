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
    <form className="mx-auto flex flex-col gap-1 w-2/3 bg-blue-500 p-2 z-30">
      <label htmlFor="old" className="text-white">
        Old password:
      </label>
      <input
        type="password"
        id="old"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="p-2"
      />
      <label htmlFor="new" className="text-white">
        New password
      </label>
      <input
        type="password"
        id="new"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="p-2"
      />
      <label htmlFor="confirm" className="text-white">
        Confirm New password
      </label>
      <input
        type="password"
        id="confirm"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="p-2"
      />
      <button
        type="submit"
        className="text-white p-2 bg-gray-900"
        onClick={onChangePassword}
      >
        Change password
      </button>
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
};

export default ResetPasswordForm;
