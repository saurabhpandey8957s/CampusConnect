import React, { useState } from "react";

const IssueForm = () => {
  const [issue, setIssue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Issue submitted successfully!");
    setIssue("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Raise an Issue</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border p-3 rounded"
          rows="5"
          placeholder="Describe your issue..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default IssueForm;