import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { signOutUser } from "../../firebase/auth";

const Navbar = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <nav className="h-14 bg-white border-b border-slate-200 flex items-center px-4 md:px-6 gap-4 fixed top-0 left-0 right-0 z-40 shadow-sm">
      <Link to="/" className="flex items-center gap-2 mr-auto">
        <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="0" y="0" width="6" height="14" rx="1.5" fill="white" />
            <rect x="8" y="0" width="6" height="9" rx="1.5" fill="white" />
          </svg>
        </div>
        <span className="font-display font-bold text-slate-900 text-lg tracking-tight">
          trello
        </span>
      </Link>

      {user && (
        <div className="flex items-center gap-3">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-8 h-8 rounded-full border-2 border-slate-200"
          />
          <span className="text-slate-600 font-body text-sm hidden sm:block">
            {user.displayName}
          </span>
          <button
            onClick={handleSignOut}
            className="text-slate-500 hover:text-slate-900 font-body text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100 border border-slate-200"
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
