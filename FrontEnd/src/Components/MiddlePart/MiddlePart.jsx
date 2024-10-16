// src/App.jsx
import React, { useState } from "react";
import LeftDiv from "../LeftPart/LeftDiv.jsx";
import RightDiv from "../RightPart/RightDiv.jsx";
import InputForm from "../InputForm/InputForm.jsx";
import ViewSnippet from "../ViewSnippet/ViewSnippet.jsx"; // Import the ViewSnippet component

function App({ onInputFormClick, isInputFormPage }) {
  // State for snippets
  const [snippets, setSnippets] = useState([
    {
      name: "LogIn Snippet",
      author: "Alice",
      date: "2024-10-10",
      language: "HTML",
      likes: 0,
      code: "<!-- HTML Code for Login Form -->",
    },
    {
      name: "SignUp Snippet",
      author: "Bob",
      date: "2024-09-15",
      language: "JavaScript",
      likes: 0,
      code: "// JavaScript Code for SignUp",
    },
    {
      name: "Authenticatin Snippet",
      author: "Charlie",
      date: "2024-08-20",
      language: "CSS",
      likes: 0,
      code: "/* CSS Code for Authentication */",
    },
    {
      name: "for Loop Snippet",
      author: "Alice",
      date: "2024-07-18",
      language: "Vue",
      likes: 0,
      code: "// Vue.js Code for for Loop",
    },
    {
      name: "Linked List Snippet",
      author: "David",
      date: "2024-06-22",
      language: "Go",
      likes: 0,
      code: "// Go Code for Linked List",
    },
    {
      name: "print butterfly Snippet",
      author: "Eve",
      date: "2024-05-13",
      language: "Ruby",
      likes: 0,
      code: "# Ruby Code for Printing Butterfly",
    },
    {
      name: "tower of hanoi Snippet",
      author: "Frank",
      date: "2024-04-25",
      language: "C++",
      likes: 0,
      code: "// C++ Code for Tower of Hanoi",
    },
    {
      name: "Caching Snippet",
      author: "Grace",
      date: "2024-03-18",
      language: "Rust",
      likes: 0,
      code: "// Rust Code for Caching",
    },
    {
      name: "Db connect Snippet",
      author: "Henry",
      date: "2024-02-14",
      language: "Java",
      likes: 0,
      code: "// Java Code for Database Connection",
    },
    {
      name: "Cloudinary Connection Snippet",
      author: "Ivy",
      date: "2024-01-10",
      language: "Swift",
      likes: 0,
      code: "// Swift Code for Cloudinary Connection",
    },
  ]);
  const [currentUser, setCurrentUser] = useState("Alice"); // Set this dynamically based on your authentication

  const [selectedSnippetIndex, setSelectedSnippetIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");

  // Handle sorting
  const sortSnippets = (order) => {
    const sortedSnippets = [...snippets].sort((a, b) => {
      return order === "latest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    });
    setSnippets(sortedSnippets);
    setSortOrder(order);
  };

  // Handle checkbox toggle for languages
  const [languages, setLanguages] = useState([
    { name: "JavaScript", checked: false },
    { name: "Python", checked: false },
    { name: "C++", checked: false },
    { name: "Rust", checked: false },
    { name: "Go", checked: false },
  ]);

  const handleCheckboxToggle = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].checked = !updatedLanguages[index].checked;
    setLanguages(updatedLanguages);
  };

  // Handle editing a snippet
  const handleEditSnippet = (index) => {
    const snippetToEdit = snippets[index];
    const newSnippetName = prompt("Edit Snippet Name:", snippetToEdit.name);
    const newSnippetCode = prompt("Edit Snippet Code:", snippetToEdit.code);

    if (newSnippetName && newSnippetCode) {
      const updatedSnippets = [...snippets];
      updatedSnippets[index] = {
        ...snippetToEdit,
        name: newSnippetName,
        code: newSnippetCode,
      };
      setSnippets(updatedSnippets);
    }
  };

  // Handle liking a snippet
  const handleLikeSnippet = (index) => {
    setSnippets((prevSnippets) => {
      const updatedSnippets = prevSnippets.map((snippet, idx) => {
        if (idx === index) {
          return {
            ...snippet,
            likes: snippet.likes > 0 ? snippet.likes - 1 : snippet.likes + 1,
          };
        }
        return snippet;
      });
      return updatedSnippets;
    });
  };

  // Handle viewing a snippet
  const handleViewSnippet = (index) => {
    setSelectedSnippetIndex(index);
  };

  // Reset selected snippet index
  const resetSelectedSnippet = () => {
    setSelectedSnippetIndex(null);
  };

  return (
    <>
      <div className="mx-12 my-8 rounded-2xl gap-10 flex h-screen overflow-hidden">
        {/* Left Div with personal information */}
        <LeftDiv
          snippets={snippets}
          sortOrder={sortOrder}
          sortSnippets={sortSnippets}
          languages={languages}
          handleCheckboxToggle={handleCheckboxToggle}
        />

        {/* Right Div with saved snippets or input form */}
        {selectedSnippetIndex !== null ? (
          <ViewSnippet
            snippet={snippets[selectedSnippetIndex]}
            onEdit={() => {
              handleEditSnippet(selectedSnippetIndex);
              resetSelectedSnippet(); // Reset after editing
            }}
            onBack={resetSelectedSnippet}
            currentUser={currentUser} // Pass the current user
          />
        ) : isInputFormPage ? (
          <InputForm />
        ) : (
          <RightDiv
            snippets={snippets}
            handleViewSnippet={handleViewSnippet}
            handleEditSnippet={handleEditSnippet}
            handleLikeSnippet={handleLikeSnippet}
          />
        )}
      </div>
    </>
  );
}

export default App;
