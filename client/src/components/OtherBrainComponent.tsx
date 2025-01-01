import { useEffect } from "react";
import ContentCard from "./ContentCard";
import { useRecoilState } from "recoil";
import { contentListState } from "@/recoil/contentAtoms";
import { useParams } from "react-router-dom";
import { getSharedContent } from "@/services/contentService";
import { error } from "console";



const OtherBrainComponent = () => {
  const [contents,setContents] = useRecoilState(contentListState);
  const {hash} = useParams()


  const handleCardDelete = async(cardId:string)=>{
  console.log(cardId)

  }

  useEffect(() => {
    (async()=>{
     try {
       const contents = await getSharedContent(hash as string);
       if(contents instanceof Error){
      alert("please provide valid link")

        return
        
       }
       setContents(contents)
     } catch (error) {
      console.log(error)
     }

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

export default OtherBrainComponent;
