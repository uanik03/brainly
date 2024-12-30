import { useState } from "react";
import { z } from "zod";
import MDEditor from '@uiw/react-md-editor';
import { addContent } from "@/services/contentService";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenState } from "@/recoil/authAtoms";
import { contentListState } from "@/recoil/contentAtoms";


type SelectedType = "youtube" | "twitter" | "link" | "document"


export const contentSchema = z.object({
  contentType: z.enum(["youtube", "twitter", "link", "document"]),
  title: z.string().min(1, "Title is required"),
  link: z.string().url("Invalid URL").optional(),
  content: z.string().optional(),
});

const AddContentModal = ({
  setIsAddContentOpen,
  isAddContentOpen,
}: {
  setIsAddContentOpen: any;
  isAddContentOpen: boolean;
}) => {

  
  const [selectedType, setSelectedType] = useState<SelectedType>("youtube");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState<string>("");

  const token = useRecoilValue(authTokenState)

  const setContents = useSetRecoilState(contentListState)
  const handleContentChange = (value?: string) => {
    // MDEditor allows undefined, but React state does not. Default to an empty string.
    setContent(value ?? "");
  };


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const dataToValidate =
      selectedType === "document"
        ? { contentType: selectedType, title: title, content: content }
        : { contentType: selectedType, title: title, link: link };

    try {
      contentSchema.parse(dataToValidate);
      const res = await addContent({contentType:selectedType, title, link, content}, token as string )
      console.log(res)
      setContents((items)=> [...items, res.content])
      alert("Content added successfully!");
      setIsAddContentOpen(false);
    } catch (error: any) {
      console.log(error)
      alert("error.errors[0]?.message" );
    }
  };

  return (
    <>
      {isAddContentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Content</h2>
              <button
                className="text-red-500 font-bold"
                onClick={() => setIsAddContentOpen(false)}
              >
                ✖
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Radio Buttons */}
              <div className="flex flex-wrap gap-4">
                {["youtube", "twitter", "link", "document"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={selectedType === type}
                      onChange={(e) => setSelectedType(e.target.value as SelectedType)}
                      className="accent-blue-500"
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>

              {/* Common Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  className="border border-gray-300 rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Conditional Inputs */}
              {selectedType === "document" ? (
                <div>
                  <label htmlFor="content" className="block text-sm font-medium">
                    Content
                  </label>
                  <div className="container">
      <MDEditor
        value={content}
        onChange={handleContentChange}
      />
      <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />
    </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="link" className="block text-sm font-medium">
                    Link
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    placeholder="Enter URL"
                    value={link}
                    onChange={(e)=>setLink(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddContentModal;
