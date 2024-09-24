import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

// Define the Blog interface to match the data structure
 export interface Blog {
    id: string;
    title: string;
    content: string;
    author: {
        email: string; // Selecting email to extract the name later
    };
}

export const useBlog=({id}:{id:string})=>{
     
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>(); // Initialize as an array of Blog
    const [error, setError] = useState<string | null>(null); // Track errors

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found, please login again");
                }

                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Bearer prefix to the token
                    },
                });
                
                setBlog(response.data);
            } catch (error: any) {
                console.error("Error fetching blogs:", error);
                setError(error.message || "Something went wrong while fetching blogs.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, []);

    return [loading, blog] as const; // Return as a tuple

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]); // Initialize as an array of Blog
    const [error, setError] = useState<string | null>(null); // Track errors

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found, please login again");
                }

                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Bearer prefix to the token
                    },
                });
                
                setBlogs(response.data);
            } catch (error: any) {
                console.error("Error fetching blogs:", error);
                setError(error.message || "Something went wrong while fetching blogs.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return [loading, blogs] as const; // Return as a tuple
};
