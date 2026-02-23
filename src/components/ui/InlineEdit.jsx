// import { useState, useRef, useEffect } from "react";

// const InlineEdit = ({ value, onSave, className = "", inputClassName = "" }) => {
//   const [editing, setEditing] = useState(false);
//   const [text, setText] = useState(value);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (editing) inputRef.current?.focus();
//   }, [editing]);

//   const handleSave = () => {
//     const trimmed = text.trim();
//     if (trimmed && trimmed !== value) {
//       onSave(trimmed);
//     } else {
//       setText(value);
//     }
//     setEditing(false);
//   };

//   const handleKey = (e) => {
//     if (e.key === "Enter") handleSave();
//     if (e.key === "Escape") {
//       setText(value);
//       setEditing(false);
//     }
//   };

//   if (editing) {
//     return (
//       <input
//         ref={inputRef}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onBlur={handleSave}
//         onKeyDown={handleKey}
//         className={`bg-slate-900 border border-indigo-500 rounded px-2 py-1 text-white outline-none w-full font-body ${inputClassName}`}
//       />
//     );
//   }

//   return (
//     <span
//       className={`cursor-pointer hover:text-indigo-300 transition-colors ${className}`}
//       onClick={() => setEditing(true)}
//       title="Click to edit"
//     >
//       {value}
//     </span>
//   );
// };

// export default InlineEdit;

import { useState, useRef, useEffect } from "react";

const InlineEdit = ({ value, onSave, className = "", inputClassName = "" }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleSave = () => {
    const trimmed = text.trim();
    if (trimmed && trimmed !== value) {
      onSave(trimmed);
    } else {
      setText(value);
    }
    setEditing(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setText(value);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKey}
        className={`bg-white border border-indigo-400 rounded px-2 py-1 text-slate-900 outline-none w-full font-body shadow-sm ${inputClassName}`}
      />
    );
  }

  return (
    <span
      className={`cursor-pointer hover:text-indigo-600 transition-colors ${className}`}
      onClick={() => setEditing(true)}
      title="Click to edit"
    >
      {value}
    </span>
  );
};

export default InlineEdit;
