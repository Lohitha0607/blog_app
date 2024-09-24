import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useState, ChangeEvent } from "react"; // Import ChangeEvent
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate();

    const handlePublish = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found, please try again"); // Set error state
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/add`, {
                title,
                content: description,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add Bearer prefix to the token
                },
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error publishing post:", error);
            setError("Failed to publish post. Please try again."); // Set error message
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input 
                        type="text" 
                        onChange={(e) => setTitle(e.target.value)}  
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="Title" 
                    />
                    <TextEditor onChange={(e) => setDescription(e.target.value)} />
                    {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
                    <button 
                        type="button" // Changed to "button"
                        onClick={handlePublish}
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 rounded-lg focus:ring-4 focus:ring-blue-200"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea 
                            onChange={onChange} 
                            id="editor" 
                            rows={8} 
                            className="block focus:outline-none pl-2 w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0" 
                            placeholder="Write an article..." 
                            required 
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}
