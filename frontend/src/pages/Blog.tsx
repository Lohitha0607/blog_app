import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { SkeletonBlogCard } from "../components/SkeletonBlogCard";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();

    const [loading, blog] = useBlog({
        id: id || ""
    }); // Destructuring the returned array

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div className="max-w-xl">
                        {/* Render multiple skeletons while loading */}
                        <SkeletonBlogCard />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    );
};
