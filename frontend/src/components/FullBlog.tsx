import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 w-full px-10 pt-200 max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">{blog.title}</div>
                        <div className="text-slate-500 pt-2">Posted on 7th June 2024</div>
                        <div className="pt-4">{blog.content}</div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">Author</div>
                        <div className="flex">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar name={blog.author.email.split('@')[0] || "Anonymous"} size={"big"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.email.split('@')[0] || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Curious soul with a passion for the unknown
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
