import React, { useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { contentListState } from "@/recoil/contentAtoms";
import { authTokenState } from "@/recoil/authAtoms";
import { deleteCard, getAllContent } from "@/services/contentService";



const MainComponent = () => {
  const [contents,setContents] = useRecoilState(contentListState);
  const token = useRecoilValue(authTokenState);


  const handleCardDelete = async(cardId:string)=>{
    const res = await deleteCard(token as string, cardId)
    if(!res){
        return
    }
    console.log(res)
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
        contents.map((content) => (
          <ContentCard
            key={content._id}
            title={content.title || "Important"}
            type={content.contentType || "Twitter"}
            link={content.link || "https://x.com/default"}
            handleCardDelete={handleCardDelete}
            contentId={content._id}
            userId={content.userId}
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
