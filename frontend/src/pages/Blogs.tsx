import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { SkeletonBlogCard } from "../components/SkeletonBlogCard";

export const Blogs = () => {
    const [loading, blogs] = useBlogs(); // Destructuring the returned array

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div className="max-w-xl">
                        {/* Render multiple skeletons while loading */}
                        <SkeletonBlogCard />
                        <SkeletonBlogCard />
                        <SkeletonBlogCard />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="">
                    {blogs.map((blog) => (
                        <BlogCard 
                            
                            id={blog.id}
                            key={blog.id}
                            authorName={blog.author.email.split('@')[0]} // Extract name from email
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"7th June 2024"} // Replace with actual date if needed
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
