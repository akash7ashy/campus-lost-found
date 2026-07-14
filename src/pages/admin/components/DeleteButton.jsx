/**
 * DeleteButton
 * Simple reusable button. No backend logic — calls the onDelete callback
 * passed down by the parent, which currently just updates local state.
 */
function DeleteButton({ onDelete }) {
  return (
    <button
      type="button"
      onClick={onDelete}
      className="rounded-lg bg-[#DF9C8B]/15 px-3 py-1.5 text-sm font-medium text-[#b5544a] transition-colors hover:bg-[#DF9C8B]/25"
    >
      Delete
    </button>
  );
}

export default DeleteButton;