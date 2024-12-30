import React, { useEffect } from "react";
import ContentCard from "./ContentCard";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { contentListState } from "@/recoil/contentAtoms";
import { authTokenState } from "@/recoil/authAtoms";
import { deleteCard, getAllContent } from "@/services/contentService";

const MainComponent = () => {
  const [contents,setContents] = useRecoilState(contentListState);
  const token = useRecoilValue(authTokenState);


  const handleCardDelete = async()=>{
    const res = await deleteCard(token as string)
    if(!res){
        return
    }
    const contents = await getAllContent(token as string);
    setContents(contents)

  }

  useEffect(() => {
    (async()=>{
      const contents = await getAllContent(token as string);
      setContents(contents)

    })()
  }, []);


  return (
    <div className="main flex">
{contents.length > 0 ? (
        contents.map((content, index) => (
          <ContentCard
            key={index}
            title={content.title || "Important"}
            type={content.contentType || "Twitter"}
            link={content.link || "https://x.com/default"}
            handleCardDelete={handleCardDelete}
          />
        ))
      ) : (
        <div>No content available</div>
      )}

      {/* <ContentCard key={"a"} title="alo" type="youtube" link="https://www.youtube.com/watch?v=f19bfHpCths&list=WL&index=23" handleCardDelete={handleCardDelete}/> */}
    </div>
  );
};

export default MainComponent;
